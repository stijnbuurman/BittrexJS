import {OrderCondition} from '../Enums/OrderCondition';
import {OrderType} from '../Enums/OrderType';
/**
 * Created by stijnbuurman on 02-09-17.
 */
export interface IOrder {
    OrderUuid: string,
    Exchange: string,
    TimeStamp: string,
    OrderType: OrderType,
    Limit: number,
    Quantity: number,
    QuantityRemaining: number,
    Commission: number,
    Price: number,
    PricePerUnit: number,
    IsConditional: boolean,
    Condition: OrderCondition,
    ConditionTarget: any | null,
    ImmediateOrCancel: boolean,
    Closed: string
}

export interface IOrderSingle {
    AccountId: string | null,
    OrderUuid: string,
    Exchange: string,
    Type: OrderType,
    Quantity: number,
    QuantityRemaining: number,
    Limit: number,
    Reserved: number,
    ReserveRemaining: number,
    CommissionReserved: number,
    CommissionReserveRemaining: number,
    CommissionPaid: number,
    Price: number,
    PricePerUnit: number,
    Opened: string,
    Closed: string,
    IsOpen: boolean,
    Sentinel: string,
    CancelInitiated: boolean,
    ImmediateOrCancel: boolean,
    IsConditional: boolean,
    Condition: OrderType,
    ConditionTarget: any | null,
}