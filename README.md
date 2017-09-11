# BittrexJS
A 'strong typed' Bittrex API client written in typescript.

## Typed
All methods have typed request parameters and typed responses using interfaces. 
Even when using the library in javascript, modern IDE's should be able to provide hints and warnings using the accompanied type files.

## How to use

### Install
```bash
npm install bittrexjs
```

### Example
```javascript
let BittrexClient = require('bittrexjs').Client;

let bittrex = new BittrexClient();

// using promises
bittrex.getLatestCandle('BTC-ETH').then((response) => {
    console.log(response);
});

// using await
(async () => {
    let response = await client.getLatestCandle('BTC-ETH');
    console.log(response);
})()
```

### Result:
```javascript
{ success: true,
  message: '',
  result: 
   [ { O: 0.07079,
       H: 0.07079,
       L: 0.07079,
       C: 0.07079,
       V: 49.016782,
       T: '2017-09-11T19:20:00',
       BV: 3.46989793 } ] }


```

## Methods

### Client.authenticate(apiCredentials: ApiCredentials)
This method authenticates your client so you can reach account specific endpoints.

_Store your api keys wisely!_

#### Example
```javascript
let client = new BittrexClient();

client.authenticate({
    apikey: '',
    apisecret: ''
});
```

## Request Methods
All request methods return a promise with a BittrexResponse.

```javascript
interface BittrexResponse<T> {
    result: T,
    success: boolean,
    message: string
}
```
BittrexResponse.result contains the actual payload.

### Client.getMarkets()
Retrieve all markets.

#### Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| none | |||

#### Returns
`Promise<BittrexResponse<Market[]>>`


#### Example
```javascript
client.getMarkets().then((response) => {
    let markets = response.result;
    
    console.log(markets);
});
```
#### Result:
```javascript
[{  MarketCurrency: 'RADS',
    BaseCurrency: 'BTC',
    MarketCurrencyLong: 'Radium',
    BaseCurrencyLong: 'Bitcoin',
    MinTradeSize: 1e-8,
    MarketName: 'BTC-RADS',
    IsActive: true,
    Created: '2016-01-26T23:22:16.193',
    Notice: null,
    IsSponsored: null,
    LogoUrl: 'https://bittrexblobstorage.blob.core.windows.net/public/259f6efd-9b21-43cf-9c6b-8f67b94ca092.png' },
  ... ]

```

### Client.getCurrencies()
Retrieve all currencies.

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| none | |||

#### Returns
`Promise<BittrexResponse<Currency[]>>`

#### Example
```javascript
client.getCurrencies().then((response) => {
    let currencies = response.result;
    
    console.log(currencies);
});
```
#### Result:
```javascript
[{ Currency: 'XRP',
     CurrencyLong: 'Ripple',
     MinConfirmation: 10,
     TxFee: 0.02,
     IsActive: true,
     CoinType: 'RIPPLE',
     BaseAddress: 'rPVMhWBsfF9iMXYj3aAzJVkPDTFNSyWdKy',
     Notice: null },
  ... ]

```

### Client.getMarketTicker(market: string)
Retrieve `Highest Bid`, `Lowest Ask` and `Price of Latest Trade`

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| market | string|yes| e.g. BTC-ETH|

#### Returns
`Promise<BittrexResponse<MarketTick>>`

#### Example
```javascript
let response = await client.getMarketTicker('BTC-ETH');
let marketTick = response.result;

console.log(marketTick);
```
#### Result:
```javascript
{ 
    Bid: 0.0707, 
    Ask: 0.0709, 
    Last: 0.0707 
}
```

### Client.getMarketCandles(market: string, tickInterval: TickInterval = 'FiveMin')
Retrieve OHLCV and BV (Open, High, Low, Close, Volume, Base Volume)

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| market | string|yes| e.g. BTC-ETH|
| tickInterval | string (TickInterval) | no (defaults to `FiveMin`) | options: OneMin, FiveMin, ThirtyMin, hour, day

#### Returns
`Promise<BittrexResponse<Candle[]>`

#### Example
```javascript
let response = await client.getMarketCandles('BTC-ETH', 'OneMin');
let marketCandles = response.result;

console.log(marketCandles);
```
#### Result:
```javascript
[{ O: 0.0799,
    H: 0.08,
    L: 0.07988,
    C: 0.08,
    V: 148.09106807,
    T: '2017-09-01T20:08:00',
    BV: 11.83406577 },
  ... ]
```

### Client.getLatestCandle(market: string, tickInterval: TickInterval = 'FiveMin')
Retrieve latest OHLCV and BV (Open, High, Low, Close, Volume, Base Volume)

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| market | string|yes| e.g. BTC-ETH|
| tickInterval | string (TickInterval) | no (defaults to `FiveMin`) | options: OneMin, FiveMin, ThirtyMin, hour, day

#### Returns
`Promise<BittrexResponse<Candle[]>`

#### Example
```javascript
let response = await client.getLatestCandle('BTC-ETH', 'OneMin');
let marketCandles = response.result;

console.log(marketCandles);
```
#### Result:
```javascript
[ { O: 0.070555,
    H: 0.07094,
    L: 0.07055001,
    C: 0.07094,
    V: 12.22247964,
    T: '2017-09-11T18:30:00',
    BV: 0.86240266 } ]
```

### Client.getMarketSummaries()
Retrieve a summary for each market

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| none | || |

#### Returns
`Promise<BittrexResponse<MarketSummary[]>>`

#### Example
```javascript
let response = await client.getMarketSummaries();
let marketSummaries = response.result;

console.log(marketSummaries);
```
#### Result:
```javascript
[ { MarketName: 'BTC-MCO',
    High: 0.00223017,
    Low: 0.00205001,
    Volume: 196683.6355223,
    Last: 0.00213,
    BaseVolume: 416.9640078,
    TimeStamp: '2017-09-11T18:37:28.14',
    Bid: 0.00213001,
    Ask: 0.00214227,
    OpenBuyOrders: 1025,
    OpenSellOrders: 11446,
    PrevDay: 0.0020872,
    Created: '2017-07-02T00:37:16.957' },
  ... ]

```

### Client.getMarketSummary(market: string)
Retrieve a summary for each market

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| market | string|yes| e.g. BTC-ETH|

#### Returns
`Promise<BittrexResponse<MarketSummary[]>>`

#### Example
```javascript
let response = await client.getMarketSummary('BTC-ETH');
let marketSummaries = response.result;

console.log(marketSummaries);
```
#### Result:
```javascript
[ { MarketName: 'BTC-ETH',
    High: 0.07115187,
    Low: 0.06982622,
    Volume: 43389.09963617,
    Last: 0.070699,
    BaseVolume: 3056.27414511,
    TimeStamp: '2017-09-11T18:39:54.32',
    Bid: 0.07059785,
    Ask: 0.070699,
    OpenBuyOrders: 3569,
    OpenSellOrders: 13823,
    PrevDay: 0.07028021,
    Created: '2015-08-14T09:02:24.817' } ]
```

### Client.getOrderbook(market: string, orderBookType: OrderBookType = 'both')
Retrieve a summary for each market

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| market | string|yes| e.g. BTC-ETH|
| orderBookType | string (OrderBookType) | no (defaults to `both`) | options: buy, sell, both |

#### Returns
`Promise<BittrexResponse<OrderbookEntry[] | Orderbook>>`

_'both' returns an orderbook, 'sell' and 'buy' return only a list of quantity-rate pairs._

#### Example (complete Orderbook)
```javascript
let response = await client.getOrderbook('BTC-ETH');
let orderbook = response.result;

console.log(orderbook);
```
#### Result:
```javascript
{ buy: 
   [ { Quantity: 0.1, Rate: 0.07059785 },
       ... ],
  sell: 
     [ { Quantity: 1.9251093, Rate: 0.07068 },
       ... ]
}
```

#### Example ('buy' orders)
```javascript
let response = await client.getOrderbook('BTC-ETH', 'buy');
let orderbookentries = response.result;

console.log(orderbookentries);
```
#### Result:
```javascript
[ { Quantity: 0.21277316, Rate: 0.06993263 },
  ... ]

```

### Client.getMarketHistory(market: string)
Retrieve the latest ??? orders for a market

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| market | string|yes| e.g. BTC-ETH|

#### Returns
`Promise<BittrexResponse<Trade[]>>`

#### Example
```javascript
let response = await client.getMarketHistory('BTC-ETH');
let marketHistory = response.result;

console.log(marketHistory);
```
#### Result:
```javascript
[ { Id: 110938880,
    TimeStamp: '2017-09-11T18:43:29.427',
    Quantity: 1.45871041,
    Price: 0.07068,
    Total: 0.10310165,
    FillType: 'PARTIAL_FILL',
    OrderType: 'BUY' },
  { Id: 110938789,
    TimeStamp: '2017-09-11T18:43:10.893',
    Quantity: 0.5179118,
    Price: 0.07050705,
    Total: 0.03651643,
    FillType: 'FILL',
    OrderType: 'SELL' },
  ... ]

```

## Account methods

For the following methods the client needs to be authenticated using `client.authenticate(apiCredentials)`

### Client.buyLimit(market: string, quantity: number, rate: number)
Place limit buy order

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| market | string|yes| e.g. BTC-ETH|
| quantity | number|yes| e.g. 0.01 |
| rate | number | yes | e.g. 0.07050705 |

#### Returns
`Promise<BittrexResponse<OrderReference[]>>`

### Client.sellLimit(market: string, quantity: number, rate: number)
Place limit sell order

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| market | string|yes| e.g. BTC-ETH|
| quantity | number|yes| e.g. 0.01 |
| rate | number | yes | e.g. 0.07050705 |

#### Returns
`Promise<BittrexResponse<OrderReference[]>>`

### Client.cancel(orderId: string)
Cancel an order

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | number|yes| e.g. 110938880 |

#### Returns
`Promise<BittrexResponse<OrderReference[]>>`

### Client.getOpenOrders(market?: string)
Get all open orders for all markets, or for a single market

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| market | string |no| e.g. BTC-ETH |

#### Returns
`Promise<BittrexResponse<OpenOrder[]>>`

### Client.getBalances()
Get all your balances

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| none | ||  |

#### Returns
`Promise<BittrexResponse<Balance[]>>`

### Client.getBalance(currency: string)
Get your balance for a single currency

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| currency | string |yes| e.g. BTC |

#### Returns
`Promise<BittrexResponse<Balance>>`

### Client.getWithdrawalHistory(currency?: string)
Get all withdrawals or all withdrawals for a single currency

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| currency | string |no| e.g. BTC |

#### Returns
`Promise<BittrexResponse<Withdrawal[]>>`

### Client.getWithdrawalHistory(currency?: string)
Get all withdrawals or all withdrawals for a single currency

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| currency | string |no| e.g. BTC |

#### Returns
`Promise<BittrexResponse<Withdrawal[]>>`

### Client.getDepositAddress(currency: string)
Get a deposit address for a currency

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| currency | string |yes| e.g. BTC |

#### Returns
`Promise<BittrexResponse<DepositAddress>>`

### Client.getDepositHistory(currency?: string)
Get your deposit history for all currencies or for one currency

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| currency | string |no| e.g. BTC |

#### Returns
`Promise<BittrexResponse<Deposit[]>>`

### Client.getOrderHistory(market?: string)
Get your order history for all markets or for one market

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| market | string |no| e.g. BTC-ETH |

#### Returns
`Promise<BittrexResponse<Order[]>>`

### Client.getOrder(orderId: string)
Get an order by id

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| orderId | string |yes| e.g. 12412412 |

#### Returns
`Promise<BittrexResponse<OrderSingle[]>>`

### Client.withdraw(currency: string, quantity: number, address: string, paymentid?: string)
Withdraw

#### Parameters

| Name | Type | Required | Description |
|-----------|------|----------|-------------|
| currency | string |yes| e.g. BTC |
| quantity | number|yes| e.g. 0.5 |
| address | string|yes|  |
| paymentid | string|no| An optional description to identify your payment |

#### Returns
`Promise<BittrexResponse<OrderSingle[]>>`

## Contributing:
```bash
git clone https://github.com/stijnbuurman/BittrexJS.git
cd BittrexJS
git checkout -b myfeature master
npm install
gulp
```

## Roadmap
* Implement Bittrex WebSockets API
* Implement Bittrex API v2
* Finalize documentation - add examples for authenticated methods
* Finalize documentation - add examples for error catching
* Add 'live build' tool
* Remove inconsistencies 
* Split client in 'simple' and 'raw'
* Add tests

