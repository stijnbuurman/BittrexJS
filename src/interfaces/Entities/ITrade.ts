/**
 * Created by stijnbuurman on 02-09-17.
 */
export interface ITrade {
    Id: number,
    TimeStamp: string,
    Quantity: number,
    Price: number,
    Total: number,
    FillType: FillType,
    OrderType: 'SELL'
}