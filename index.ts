/**
 * Created by stijnbuurman on 31-08-17.
 */
import {BittrexAPI} from './src/BittrexAPI';

let bittrexApi = new BittrexAPI();

bittrexApi.authenticate({
    apikey: '',
    apisecret: '',
});

bittrexApi.getOrder('d3686855-fa6a-45d9-8e6b-44476018fe52')
    .then((response) => {
        console.log(response.result);
    }).catch((error) => {
        console.log(error.message);
    }
);