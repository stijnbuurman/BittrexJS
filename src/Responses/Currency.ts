/**
 * Created by stijnbuurman on 02-09-17.
 */
interface Currency {
    Currency: string,
    CurrencyLong: string,
    MinConfirmation: number,
    TxFee: number,
    IsActive: boolean,
    CoinType: string,
    BaseAddress: string | null,
    Notice: string | null,
}
