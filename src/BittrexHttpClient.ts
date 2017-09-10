import * as request from 'request';
import * as assign from 'object-assign';
const hmac_sha512 = require("crypto-js/hmac-sha512");

export class BittrexHttpClient {
    private requestOptions: RequestOptions = {
        method: 'GET',
        agent: false,
        headers: {
            'User-Agent': 'Mozilla/4.0 (compatible; TS BittrexJS API)',
            'Content-type': 'application/x-www-form-urlencoded',
        },
        uri: null,
    };

    private apiCredentials: ApiCredentials;

    private readonly API_URL_V1 = 'https://bittrex.com/api/v1.1';
    private readonly API_URL_V2 = 'https://bittrex.com/Api/v2.0';


    public authenticate(apiCredentials: ApiCredentials): BittrexHttpClient {
        this.apiCredentials = apiCredentials;

        return this;
    }

    private getQueryString(data) {
        return Object.keys(data).map((key) => {
            return [key, data[key]].map(encodeURIComponent).join('=');
        }).join('&');
    };

    private sendRequestCallback(callback, op) {
        request(op, (error, result, body) => {
            if (!body || !result || result.statusCode != 200) {
                let errorObject = {
                    success: false,
                    message: 'URL request error',
                    error: error,
                    result: result,
                };
                return callback(null, errorObject);
            }

            result = JSON.parse(body);
            if (!result.success) {
                return callback(null, result);
            }
            return callback(result, null);

        });
    };

    private sendRequest(requestOptions): Promise<BittrexResponse<any>> {
        return new Promise((resolve, reject) => {
            request(requestOptions, (error, result, body) => {
                if (!body || !result || result.statusCode != 200) {
                    let errorObject: BittrexResponse<any> = {
                        success: false,
                        message: 'URL request error',
                        error: error,
                        result: result,
                    };

                    reject(errorObject);
                }

                let parsedResult: BittrexResponse<any> = JSON.parse(body);
                if (!parsedResult.success) {
                    reject(parsedResult);
                }

                resolve(parsedResult);
            });
        });
    }

    get(versionString, path, options?): Promise<BittrexResponse<any>> {
        let url = this.getBaseUrl(versionString) + path;

        let requestOptions = assign({}, this.requestOptions);

        if (options) {
            url += '?' + this.getQueryString(options);
        }

        requestOptions.uri = url;

        return this.sendRequest(requestOptions);
    };

    getAuthenticated(versionString, path, options?): Promise<BittrexResponse<any>> {
        if(!this.apiCredentials){
            throw new Error('Authentication is needed. Call BittrexApi.authenticate(apiCredentials) first.');
        }

        let url = this.getBaseUrl(versionString) + path;

        url = url + '?' + this.getQueryString({
                apikey: this.apiCredentials.apikey,
                nonce: Math.floor(new Date().getTime() / 1000),
            });

        if (options) {
            url += '&' + this.getQueryString(options);
        }

        let requestOptions = assign({}, this.requestOptions);
        requestOptions.headers.apisign = hmac_sha512.HmacSHA512(url, this.apiCredentials.apisecret);
        requestOptions.uri = url;

        return this.sendRequest(requestOptions);
    };

    /**
     * Get base url by versionString, options: V1 or V2
     *
     * @param {string} versionString
     *
     * @return {string}
     */
    getBaseUrl(versionString: string) {
        if (versionString === 'v1') {
            return this.API_URL_V1;
        } else if (versionString === 'v2') {
            return this.API_URL_V2;
        }

        throw Error(`Cannot find baseURL for version ${versionString}`);
    }
}
