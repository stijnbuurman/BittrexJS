/**
 * Created by stijnbuurman on 02-09-17.
 */
interface OpenOrder {
    Uuid?: string | null,
    OrderUuid: string,
    Exchange: string,
    OrderType: OrderType,
    Quantity: number,
    QuantityRemaining: number,
    Limit: number,
    CommissionPaid: number,
    Price: number,
    PricePerUnit: number,
    Opened: string,
    Closed: null | string,
    CancelInitiated: boolean,
    ImmediateOrCancel: boolean,
    IsConditional: boolean,
    Condition: string,
    ConditionTarget: any | null, //not sure
}