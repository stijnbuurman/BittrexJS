import {BittrexAPI} from './src/BittrexJS/BittrexAPI';

let client = new BittrexAPI();

client.getMarketSummary('BTC-ETH').then((response) => {
    response.result.forEach((marketSummary) => {
        console.log(marketSummary);
    });
});