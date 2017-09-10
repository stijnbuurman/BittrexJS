/**
 * Created by stijnbuurman on 02-09-17.
 */
interface BittrexResponse<T> {
    result: T,
    success: boolean,
    statusCode?: number,
    message: string,
    error?: string,
}