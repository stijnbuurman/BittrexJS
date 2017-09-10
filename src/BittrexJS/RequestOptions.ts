/**
 * Created by stijnbuurman on 02-09-17.
 */
interface RequestOptions {
    method: string,
    agent: boolean,
    headers: {
        'User-Agent': string,
        'Content-type': string,
        'apisign'?: string,
    },
    uri: string,
}