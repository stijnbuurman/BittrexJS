/**
 * Created by stijnbuurman on 02-09-17.
 */
export interface IWithdrawal {
    "PaymentUuid" : string,
    "Currency" : string,
    "Amount" : number,
    "Address" : string,
    "Opened" : string,
    "Authorized" : boolean,
    "PendingPayment" : boolean,
    "TxCost" : number,
    "TxId" : string | null,
    "Canceled" : boolean,
    "InvalidAddress" : boolean,
}