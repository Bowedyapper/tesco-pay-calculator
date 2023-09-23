// 15 Years or more                 = 7.6 weeks
// 10 Years or more < 15            = 7.2 weeks
// 5 Years or more < 10             = 6.6 weeks
// More than 12 months < 5 years    = 6 weeks
// Fewer than 12 months             = 5.6 weeks

import moment from 'moment';
import calculateHolidayEntitlementWeeks from './calculateHolidayEntitlementWeeks'
import { BankHoliday } from '../types/global';

/**
 * Calculates the yearly holiday entitlement in days based on the length of service and contracted days per week
 * 
 * @param {number} lengthOfService
 * @param {number} contractedDays
 * @return {number}
 * @example
 * calculateYearlyHolidayEntitlementInDays(2, 5)
 **/
const calculateYearlyHolidayEntitlementInDays = (lengthOfService: number, contractedDays: number): number => {
    const yearlyWeeklyHolidayEnt = calculateHolidayEntitlementWeeks(lengthOfService);
    return yearlyWeeklyHolidayEnt * contractedDays;
}

/**
 * Calculates the yearly holiday entitlement in hours based on the length of service and contracted hours per week
 * 
 * @param {number} lengthOfService
 * @param {number} contractedHoursPerWeek
 * @return {number}
 * @example
 * calculateYearlyHolidayEntitlementInHours(2, 37.5)
 **/
const calculateYearlyHoursHolidayEntitlement = (lengthOfService:number, contractedHoursPerWeek: number): number => {
    return calculateHolidayEntitlementWeeks(lengthOfService) * contractedHoursPerWeek;
}


/**
 * Fetches bank holidays from gov.uk API and returns an array of bank holidays for the given division
 * 
 * @param {string} division
 * @return {Array<BankHoliday>}
 * @example
 * fetchBankHolidays('scotland')
 **/
const fetchBankHolidays = async (division: string): Promise<BankHoliday[]> => {
    const response = await fetch('https://www.gov.uk/bank-holidays.json');
    const data = await response.json();
    const bankHolidays = data[division].events;

    // Filter all bank holidays only returning title and date and is between 1st April and 31st March
    const bankHolidaysFiltered = bankHolidays.filter((bankHoliday: { title: string, date: string, notes: string }) => {
        const bankHolidayDate = moment(bankHoliday.date);
        return bankHolidayDate.isBetween(moment('2023-04-01'), moment('2024-03-31'), undefined, '[]');
    }).map((bankHoliday: { title: string, date: string, notes: string }) => {
        return {
            title: bankHoliday.title,
            date: bankHoliday.date,
            notes: bankHoliday.notes
        }
    });
    console.log
    return bankHolidaysFiltered;
}
