import { Moment } from 'moment';
export interface Shift {
    day: string,
    shiftStartHour?: number,
    shiftStartMinute?: number,
    shiftEndHour?: number,
    shiftEndMinute?: number
}

export interface BankHoliday {
    title: string,
    date: string,
    notes: string,
    bunting?: boolean
}

export interface Shifts extends Array<Shift> { }

export interface GrossPay {
    grossPay: string,
    payStart: Moment,
    payEnd: Moment,
    payDay: Moment,
    bankHolidays: Array<BankHoliday>
}
