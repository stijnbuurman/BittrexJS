/**
 * Created by stijnbuurman on 02-09-17.
 */
interface Deposit {
    Id: number,
    Amount: number,
    Currency: string,
    Confirmations: number,
    LastUpdated: string,
    TxId: string,
    CryptoAddress: string,
}