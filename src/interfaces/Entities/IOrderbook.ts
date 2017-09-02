/**
 * Created by stijnbuurman on 02-09-17.
 */
export interface IOrderbook {
    buy?: [IOrderbookEntry],
    sell?: [IOrderbookEntry]
}

export interface IOrderbookEntry {
    Quantity: number,
    Rate: number,
}