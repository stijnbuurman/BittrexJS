/**
 * Created by stijnbuurman on 02-09-17.
 */
interface Trade {
    Id: number,
    TimeStamp: string,
    Quantity: number,
    Price: number,
    Total: number,
    FillType: FillType,
    OrderType: 'SELL' //TODO fix enum
}