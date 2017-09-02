/**
 * Created by stijnbuurman on 02-09-17.
 */
export interface IDeposit {
    Id: number,
    Amount: number,
    Currency: string,
    Confirmations: number,
    LastUpdated: string,
    TxId: string,
    CryptoAddress: string,
}