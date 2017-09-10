# BittrexJS
A 'strong typed' Bittrex API client written in typescript.

## Typed
All methods have typed request parameters and typed responses using interfaces. 
Even when using the library in javascript, modern IDE's should be able to provide hints and warnings using the accompanied type files.

## How to install

```bash
npm install bittrexjs
```

## Example
```javascript
let BittrexClient = require('bittrexjs').Client;

let bittrex = new BittrexClient();

bittrex.getCurrencies().then((response) => {
    let currencies = response.result;

    console.log(currencies);
});
```




