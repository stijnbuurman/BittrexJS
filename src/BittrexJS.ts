import {BittrexHttpClient} from './BittrexHttpClient';

/**
 * Created by stijnbuurman on 02-09-17.
 */
class Client {
    private bittrex: BittrexHttpClient;

    constructor() {
        this.bittrex = new BittrexHttpClient();
    }

    /**
     * Used to authenticate for private end points
     *
     * @param {ApiCredentials} apiCredentials
     *
     * @return {Client}
     */
    public authenticate(apiCredentials: ApiCredentials): this {
        this.bittrex.authenticate(apiCredentials);
        return this;
    }

    /**
     * Gets all markets
     *
     * @return {Promise<BittrexResponse<[Market]>>}
     */
    public getMarkets(): Promise<BittrexResponse<Market[]>> {
        return this.bittrex.get('v1', '/public/getMarkets');
    }

    /**
     * Gets all currencies
     *
     * @return {Promise<BittrexResponse<Currency[]>>}
     */
    public getCurrencies(): Promise<BittrexResponse<Currency[]>> {
        return this.bittrex.get('v1', '/public/getCurrencies');
    }

    /**
     * Gets a simple tick object
     *
     * @param {string} market
     * @return {Promise<BittrexResponse<MarketTick>>}
     */
    public getMarketTicker(market: string): Promise<BittrexResponse<MarketTick>> {
        if (!market) {
            throw Error('Invalid Market');
        }

        return this.bittrex.get('v1', '/public/getTicker', {
            market: market
        });
    }

    /**
     * Gets candles for a market by tickInterval
     *
     * @param {string} market
     * @param {TickInterval} tickInterval
     *
     * @return {Promise<BittrexResponse<Candle[]>>}
     */
    public getMarketCandles(market: string, tickInterval: TickInterval = 'FiveMin'): Promise<BittrexResponse<Candle[]>> {
        if (!market) {
            throw Error('Invalid Market');
        }

        return this.bittrex.get('v2', '/pub/market/GetTicks', {
            marketName: market,
            tickInterval: tickInterval
        });
    }

    /**
     * Gets the latest candle for a market by tickInterval
     *
     * @param {string} market
     * @param {TickInterval} tickInterval
     *
     * @return {Promise<BittrexResponse<Candle[]>>}
     */
    public getLatestCandle(market: string, tickInterval: TickInterval = 'FiveMin'): Promise<BittrexResponse<Candle[]>> {
        if (!market) {
            throw Error('Invalid Market');
        }

        return this.bittrex.get('v2', '/pub/market/GetLatestTick', {
            marketName: market,
            tickInterval: tickInterval
        });
    }

    /**
     * Gets all market summaries
     *
     * @return {Promise<BittrexResponse<MarketSummary[]>>}
     */
    public getMarketSummaries(): Promise<BittrexResponse<MarketSummary[]>> {
        return this.bittrex.get('v1', '/public/getMarketSummaries');
    }

    /**
     * Gets a single market summary
     *
     * @param {string} market
     * @return {Promise<BittrexResponse<MarketSummary[]>>}
     */
    public getMarketSummary(market: string): Promise<BittrexResponse<MarketSummary[]>> {
        if (!market) {
            throw Error('Invalid Market');
        }

        return this.bittrex.get('v1', '/public/getMarketSummary', {
            market: market
        });
    }

    /**
     * Get the orderbook for a market by type (buy and sell or both)
     * NOTE: The structure is different when selecting just buy or sell
     *
     * @param {string} market
     * @param {OrderBookType} orderBookType
     *
     * @return {Promise<BittrexResponse<OrderbookEntry[] | Orderbook>>}
     */
    public getOrderbook(market: string, orderBookType: OrderBookType = 'both'): Promise<BittrexResponse<OrderbookEntry[] | Orderbook>> {
        if (!market) {
            throw Error('Invalid Market');
        }

        return this.bittrex.get('v1', '/public/getOrderbook', {
            market: market,
            type: orderBookType
        });
    }

    /**
     * Gets the market history for a market
     *
     * @param {string} market
     * @return {Promise<BittrexResponse<Trade[]>>}
     */
    public getMarketHistory(market: string): Promise<BittrexResponse<Trade[]>> {
        if (!market) {
            throw Error('Invalid Market');
        }

        return this.bittrex.get('v1', '/public/getMarketHistory', {
            market: market
        });
    }

    /**
     * Place a limit buy order
     *
     * @param {string} market
     * @param {number} quantity
     * @param {number} rate
     *
     * @return {Promise<BittrexResponse<OrderReference[]>>}
     */
    public buyLimit(market: string, quantity: number, rate: number): Promise<BittrexResponse<OrderReference[]>> {
        return this.bittrex.getAuthenticated('v1', '/market/buylimit', {
            market: market,
            quantity: quantity,
            rate: rate
        });
    }

    /**
     * Place a limit sell order
     *
     * @param {string} market
     * @param {number} quantity
     * @param {number} rate
     *
     * @return {Promise<BittrexResponse<OrderReference[]>>}
     */
    public sellLimit(market: string, quantity: number, rate: number): Promise<BittrexResponse<OrderReference[]>> {
        return this.bittrex.getAuthenticated('v1', '/market/selllimit', {
            market: market,
            quantity: quantity,
            rate: rate
        });
    }

    //TODO: check if thes response is correct
    /**
     * Cancel an order
     *
     * @param {string} orderId
     *
     * @return {Promise<BittrexResponse<OrderReference[]>>}
     */
    public cancel(orderId: string): Promise<BittrexResponse<OrderReference[]>> {
        return this.bittrex.getAuthenticated('v1', '/market/cancel', {
            uuid: orderId
        });
    }

    //TODO: Normalize functions with optional parameters
    /**
     * Get all open orders for all markets, or for a single market
     *
     * @param {string=} market
     *
     * @return {Promise<BittrexResponse<OpenOrder[]>>}
     */
    public getOpenOrders(market?: string): Promise<BittrexResponse<OpenOrder[]>> {
        return this.bittrex.getAuthenticated('v1', '/market/getopenorders', (market ? {market: market} : undefined));
    }

    /**
     * Get all balances
     *
     * @return {Promise<BittrexResponse<Balance[]>>}
     */
    public getBalances(): Promise<BittrexResponse<Balance[]>> {
        return this.bittrex.getAuthenticated('v1', '/account/getbalances');
    }

    //TODO: check if it is not an array
    /**
     * Get a single balance
     *
     * @param {string} currency
     *
     * @return {Promise<BittrexResponse<Balance>>}
     */
    public getBalance(currency: string): Promise<BittrexResponse<Balance>> {
        return this.bittrex.getAuthenticated('v1', '/account/getbalance', {
            currency: currency
        });
    }

    /**
     * Get all withdrawals or all withdrawals for a single currency
     *
     * @param {string} currency
     *
     * @return {Promise<BittrexResponse<Withdrawal[]>>}
     */
    public getWithdrawalHistory(currency?: string): Promise<BittrexResponse<Withdrawal[]>> {
        return this.bittrex.getAuthenticated('v1', '/account/getwithdrawalhistory',
            currency ? { currency: currency } : undefined
        );
    }

    /**
     * Get a deposit address for a currency
     *
     * @param {string} currency
     *
     * @return {Promise<BittrexResponse<DepositAddress>>}
     */
    public getDepositAddress(currency: string): Promise<BittrexResponse<DepositAddress>> {
        return this.bittrex.getAuthenticated('v1', '/account/getdepositaddress', {
            currency: currency,
        });
    }

    /**
     * Get your deposit history (for a currency)
     *
     * @param {string} currency
     *
     * @return {Promise<BittrexResponse<Deposit[]>>}
     */
    public getDepositHistory(currency?: string): Promise<BittrexResponse<Deposit[]>> {
        return this.bittrex.getAuthenticated('v1', '/account/getDepositHistory', (currency ? {currency: currency} : undefined));
    }

    /**
     * get your order history (for a currency)
     *
     * @param {string} market
     *
     * @return {Promise<BittrexResponse<Order[]>>}
     */
    public getOrderHistory(market?: string): Promise<BittrexResponse<Order[]>> {
        return this.bittrex.getAuthenticated('v1', '/account/getOrderHistory',
            (market ? {market: market} : undefined)
        );
    }

    //TODO: normalize orders, they differ too much between orderhistory, getOrder and openOrders.
    /**
     * Get an order by id
     *
     * @param {string} orderId
     *
     * @return {Promise<BittrexResponse<OrderSingle[]>>}
     */
    public getOrder(orderId: string): Promise<BittrexResponse<OrderSingle[]>> {
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
     * @param {string=} paymentid An optional identifier
     *
     * @return {Promise<BittrexResponse<OrderReference>>}
     */
    public withdraw(currency: string, quantity: number, address: string, paymentid?: string): Promise<BittrexResponse<OrderReference>> {
        return this.bittrex.getAuthenticated('v1', '/account/withdraw', {
            currency: currency,
            quantity: quantity,
            address: address,
            paymentid: paymentid,
        });
    }
}

export { Client };