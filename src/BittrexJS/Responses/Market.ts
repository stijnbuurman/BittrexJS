/**
 * Created by stijnbuurman on 02-09-17.
 */
interface Market {
    MarketCurrency: string,
    BaseCurrency: string,
    MarketCurrencyLong: string,
    BaseCurrencyLong: string,
    MinTradeSize: number,
    MarketName: string,
    IsActive: boolean,
    Created: string,
    Notice: string | null,
    IsSponsored: boolean | null,
    LogoUrl: string
}
