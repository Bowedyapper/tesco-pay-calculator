import moment, { Moment } from "moment";
import type { Shifts, GrossPay } from "../types/global";
import calculateHoursWorked from "./calculateHoursWorked"
import calculateGrossPay from "./calculateShiftGrossPay"
import fetchBankHolidays from "./fetchBankHolidaysForPayPeriod";

/**
 * Calculates the gross monthly pay for a given pay date from 26 days before the pay date 
 * up the sunday following the pay date
 *
 * @param {Moment} payDate
 * @param {Shifts} contractedShifts
 * @return {Promise<GrossPay>}
 */
const calculateGrossMonthlyPay = async (payDate: Moment, contractedShifts: Shifts, hourlyRate: number): Promise<GrossPay> => {
    const referenceDate = moment('2010-01-22');
    const daysDifferent = payDate.diff(referenceDate, 'days');
    const nightShiftPremium = 2.30;
    const bankHolidayMultipler = 1.25;

    if (daysDifferent % 28 !== 0) {
        throw new Error('Pay date is not a valid pay date')
    }
    const payStart = moment(payDate).subtract(26, 'days');
    const payEnd = moment(payStart).add(28, 'days');

    const bankHolidays = await fetchBankHolidays('scotland', moment(payDate))

    let grossPay = 0;
    let bankHolidaysInPayPeriod = [];

    for (var day = moment(payStart); day.isSameOrBefore(payEnd); day.add(1, 'days')) {
        const getShift = contractedShifts.find(shift => shift.day === day.format('dddd'))
        if (getShift) {
            if (getShift.shiftStartHour && getShift.shiftEndHour) {
                const hoursWorked = calculateHoursWorked(moment(day.set('hour', getShift.shiftStartHour), 'YYYY-MM-DD HH:mm:ss'), moment(day.set('hour', getShift.shiftEndHour), 'YYYY-MM-DD HH:mm:ss'))
                const bankHolidayFilter = bankHolidays.filter(bankHoliday => bankHoliday.date == day.format('YYYY-MM-DD'))
                if (bankHolidayFilter.length > 0) {
                    hourlyRate = hourlyRate * bankHolidayMultipler;
                    bankHolidaysInPayPeriod.push(bankHolidayFilter[0])
                }
                const dayGrossPay = calculateGrossPay(hoursWorked.total, hourlyRate, hoursWorked.nightShiftHours, nightShiftPremium)
                grossPay += dayGrossPay;
            }
        }
    }

    return {
        grossPay: grossPay.toFixed(2),
        payStart: payStart,
        payEnd: payEnd,
        payDay: payDate,
        bankHolidays: bankHolidaysInPayPeriod
    }
}

export default calculateGrossMonthlyPay;