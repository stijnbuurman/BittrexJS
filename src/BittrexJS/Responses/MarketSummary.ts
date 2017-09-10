/**
 * Created by stijnbuurman on 02-09-17.
 */
interface MarketSummary {
    MarketName: string,
    High: number,
    Low: number,
    Volume: number,
    Last: number,
    BaseVolume: number,
    TimeStamp: string,
    Bid: number,
    Ask: number,
    OpenBuyOrders: number,
    OpenSellOrders: number,
    PrevDay: number,
    Created: string
}