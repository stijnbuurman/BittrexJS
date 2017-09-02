import {BittrexHttpClient} from './BittrexHttpClient2';
import {IApiCredentials} from './interfaces/IApiCredentials';
import {IMarket} from './interfaces/Entities/IMarket';
import {IResponse} from './interfaces/Responses/IResponse';
import {ICurrency} from './interfaces/Entities/ICurrency';
import {IMarketTick} from './interfaces/Entities/IMarketTick';
import {IMarketSummary} from './interfaces/Entities/IMarketSummary';
import {OrderBookType} from './interfaces/Enums/OrderBookType';
import {IOrderbook, IOrderbookEntry} from './interfaces/Entities/IOrderbook';
import {ITrade} from './interfaces/Entities/ITrade';
import {ICandle} from './interfaces/Entities/ICandle';
import {IOrderReference} from './interfaces/Entities/IOrderReference';
import {TickInterval} from './interfaces/Enums/TickInterval';
import {IOpenOrder} from './interfaces/Entities/IOpenOrder';
import {IBalance} from './interfaces/Entities/IBalance';
import {IDepositAddress} from './interfaces/Entities/IDepositAddress';
import {IDeposit} from './interfaces/Entities/IDeposit';
import {IOrder, IOrderSingle} from './interfaces/Entities/IOrder';


/**
 * Created by stijnbuurman on 02-09-17.
 */
export class BittrexAPI {
    private bittrex: BittrexHttpClient;

    constructor() {
        this.bittrex = new BittrexHttpClient();
    }

    /**
     * Used to authenticate for private end points
     *
     * @param {IApiCredentials} apiCredentials
     *
     * @return {BittrexAPI}
     */
    public authenticate(apiCredentials: IApiCredentials): this {
        this.bittrex.authenticate(apiCredentials);
        return this;
    }

    /**
     * Gets all markets
     *
     * @return {Promise<IResponse<[IMarket]>>}
     */
    public getMarkets(): Promise<IResponse<[IMarket]>> {
        return this.bittrex.get('v1', '/public/getMarkets');
    }

    /**
     * Gets all currencies
     *
     * @return {Promise<IResponse<[ICurrency]>>}
     */
    public getCurrencies(): Promise<IResponse<[ICurrency]>> {
        return this.bittrex.get('v1', '/public/getCurrencies');
    }

    /**
     * Gets a simple tick object
     *
     * @param {string} market
     * @return {Promise<IResponse<IMarketTick>>}
     */
    public getMarketTicker(market: string): Promise<IResponse<IMarketTick>> {
        if (!market) {
            throw Error('Invalid Market');
        }

        return this.bittrex.get('v1', '/public/getTicker', {
            market: market,
        });
    }

    /**
     * Gets candles for a market by tickInterval
     *
     * @param {string} market
     * @param {TickInterval} tickInterval
     *
     * @return {Promise<IResponse<[ICandle]>>}
     */
    public getMarketCandles(market: string, tickInterval: TickInterval = 'FiveMin'): Promise<IResponse<[ICandle]>> {
        if (!market) {
            throw Error('Invalid Market');
        }

        return this.bittrex.get('v2', '/pub/market/GetTicks', {
            marketName: market,
            tickInterval: tickInterval,
        });
    }

    /**
     * Gets the latest candle for a market by tickInterval
     *
     * @param {string} market
     * @param {TickInterval} tickInterval
     *
     * @return {Promise<IResponse<[ICandle]>>}
     */
    public getLatestCandle(market: string, tickInterval: TickInterval = 'FiveMin'): Promise<IResponse<[ICandle]>> {
        if (!market) {
            throw Error('Invalid Market');
        }

        return this.bittrex.get('v2', '/pub/market/GetLatestTick', {
            marketName: market,
            tickInterval: tickInterval,
        });
    }

    /**
     * Gets all market summaries
     *
     * @return {Promise<IResponse<[IMarketSummary]>>}
     */
    public getMarketSummaries(): Promise<IResponse<[IMarketSummary]>> {
        return this.bittrex.get('v1', '/public/getMarketSummaries');
    }

    /**
     * Gets a single market summary
     *
     * @param {string} market
     * @return {Promise<IResponse<[IMarketSummary]>>}
     */
    public getMarketSummary(market: string): Promise<IResponse<[IMarketSummary]>> {
        if (!market) {
            throw Error('Invalid Market');
        }

        return this.bittrex.get('v1', '/public/getMarketSummary', {
            market: market,
        });
    }

    /**
     * Get the orderbook for a market by type (buy, sell or both)
     * NOTE: The structure is different when selecting just buy or sell
     *
     * @param {string} market
     * @param {OrderBookType} orderBookType
     *
     * @return {Promise<T>}
     */
    public getOrderbook(market: string, orderBookType: OrderBookType = 'both'): Promise<IResponse<IOrderbook | [IOrderbookEntry]>> {
        if (!market) {
            throw Error('Invalid Market');
        }

        return this.bittrex.get('v1', '/public/getOrderbook', {
            market: market,
            type: orderBookType,
        });
    }

    /**
     * Gets the market history for a market
     *
     * @param {string} market
     * @return {Promise<IResponse<[ITrade]>>}
     */
    public getMarketHistory(market: string): Promise<IResponse<[ITrade]>> {
        if (!market) {
            throw Error('Invalid Market');
        }

        return this.bittrex.get('v1', '/public/getMarketHistory', {
            market: market,
        });
    }

    /**
     * Place a limit buy order
     *
     * @param {string} market
     * @param {number} quantity
     * @param {number} rate
     *
     * @return {Promise<IResponse<[IOrderReference]>>}
     */
    public buyLimit(market: string, quantity: number, rate: number): Promise<IResponse<[IOrderReference]>> {
        return this.bittrex.getAuthenticated('v1', '/market/buylimit', {
            market: market,
            quantity: quantity,
            rate: rate,
        });
    }

    /**
     * Place a limit sell order
     *
     * @param {string} market
     * @param {number} quantity
     * @param {number} rate
     *
     * @return {Promise<IResponse<[IOrderReference]>>}
     */
    public sellLimit(market: string, quantity: number, rate: number): Promise<IResponse<[IOrderReference]>> {
        return this.bittrex.getAuthenticated('v1', '/market/selllimit', {
            market: market,
            quantity: quantity,
            rate: rate,
        });
    }

    //TODO: check if thes response is correct
    /**
     * Cancel an order
     *
     * @param {string} orderId
     *
     * @return {Promise<IResponse<[IOrderReference]>>}
     */
    public cancel(orderId: string): Promise<IResponse<[IOrderReference]>> {
        return this.bittrex.getAuthenticated('v1', '/market/cancel', {
            uuid: orderId,
        });
    }

    //TODO: Normalize functions with optional parameters
    /**
     * Get all open orders for all markets, or for a single market
     *
     * @param {string=} market
     *
     * @return {Promise<IResponse<[IOpenOrder]>>}
     */
    public getOpenOrders(market?: string): Promise<IResponse<[IOpenOrder]>> {
        return this.bittrex.getAuthenticated('v1', '/market/getopenorders', (market ? {market: market} : undefined));
    }

    /**
     * Get all balances
     *
     * @return {Promise<IResponse<[IBalance]>>}
     */
    public getBalances(): Promise<IResponse<[IBalance]>> {
        return this.bittrex.getAuthenticated('v1', '/account/getbalances');
    }

    //TODO: check if it is not an array
    /**
     * Get a single balance
     *
     * @param {string} currency
     *
     * @return {Promise<IResponse<IBalance>>}
     */
    public getBalance(currency: string): Promise<IResponse<IBalance>> {
        return this.bittrex.getAuthenticated('v1', '/account/getbalance', {
            currency: currency,
        });
    }

    /**
     * Get all withdrawals or all withdrawals for a single currency
     *
     * @param {string} currency
     *
     * @return {Promise<IResponse<IBalance>>}
     */
    public getWithdrawalHistory(currency?: string): Promise<IResponse<IBalance>> {
        return this.bittrex.getAuthenticated('v1', '/account/getwithdrawalhistory', (currency ? {currency: currency} : undefined));
    }

    /**
     * Get a deposit address for a currency
     *
     * @param {string} currency
     *
     * @return {Promise<IResponse<IDepositAddress>>}
     */
    public getDepositAddress(currency: string): Promise<IResponse<IDepositAddress>> {
        return this.bittrex.getAuthenticated('v1', '/account/getdepositaddress', {
            currency: currency,
        });
    }

    /**
     * Get your deposit history (for a currency)
     *
     * @param {string} currency
     *
     * @return {Promise<IResponse<[IDeposit]>>}
     */
    public getDepositHistory(currency?: string): Promise<IResponse<[IDeposit]>> {
        return this.bittrex.getAuthenticated('v1', '/account/getDepositHistory', (currency ? {currency: currency} : undefined));
    }

    /**
     * get your order history (for a currency)
     *
     * @param {string} market
     *
     * @return {Promise<IResponse<[IOrder]>>}
     */
    public getOrderHistory(market?: string): Promise<IResponse<[IOrder]>> {
        return this.bittrex.getAuthenticated('v1', '/account/getOrderHistory', (market ? {market: market} : undefined));
    }

    //TODO: normalize orders, they differ too much between orderhistory, getOrder and openOrders.
    /**
     * Get an order by id
     *
     * @param {string} orderId
     *
     * @return {Promise<IResponse<[IOrderSingle]>>}
     */
    public getOrder(orderId: string): Promise<IResponse<[IOrderSingle]>> {
        return this.bittrex.getAuthenticated('v1', '/account/getOrder', {
            uuid: orderId,
        });
    }

    /**
     * Withdraw
     *
     * @param {string} currency
     * @param {number} quantity
     * @param {string} address
     * @param {string=} paymentid
     *
     * @return {Promise<IResponse<IOrderReference>>}
     */
    public withdraw(currency: string, quantity: number, address: string, paymentid?: string): Promise<IResponse<IOrderReference>> {
        return this.bittrex.getAuthenticated('v1', '/account/withdraw', {
            currency: currency,
            quantity: quantity,
            address: address,
            paymentid: paymentid,
        });
    }
}