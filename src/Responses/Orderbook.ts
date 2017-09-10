/**
 * Created by stijnbuurman on 02-09-17.
 */
interface Orderbook {
    buy?: [OrderbookEntry],
    sell?: [OrderbookEntry]
}

interface OrderbookEntry {
    Quantity: number,
    Rate: number,
}