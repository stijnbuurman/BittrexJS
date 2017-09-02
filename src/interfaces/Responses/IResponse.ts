/**
 * Created by stijnbuurman on 02-09-17.
 */
export interface IResponse<T> {
    result: T,
    success: boolean,
    message: string
}