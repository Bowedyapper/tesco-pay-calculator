import moment from "moment"

import calculateGrossMonthlyPay from "./functions/calculateGrossMonthlyPay"
import { contractedShifts } from "./shiftsTest"
import fetchBankHolidays from "./functions/fetchBankHolidaysForPayPeriod"

(async ()=>{
    const grossMonthlyPay = await calculateGrossMonthlyPay(moment('2023-08-18'), contractedShifts, 11.92);

    console.log(grossMonthlyPay)
})()

