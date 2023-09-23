import moment, { Moment } from 'moment';

/**
 * Fetches bank holidays from gov.uk API and returns an array of bank holidays for the given division and pay period
 *
 * @param {string} division
 * @param {number} year
 * @return {Array<BankHoliday>} 
 */
const fetchBankHolidays = async (division: string, payPeriod: Moment) => {
    const response = await fetch('https://www.gov.uk/bank-holidays.json');
    const data = await response.json();
    const bankHolidays = data[division].events;

    // Filter all bank holidays that fall within the pay period
    const bankHolidaysFiltered = bankHolidays.filter((bankHoliday: { title: string, date: string, notes: string }) => {
        const bankHolidayDate = moment(bankHoliday.date);
        return bankHolidayDate.isBetween(moment(payPeriod).subtract(26, 'days'), moment(payPeriod).add(28, 'days'), undefined, '[]');
    }).map((bankHoliday: { title: string, date: string, notes: string }) => {
        return {
            title: bankHoliday.title,
            date: bankHoliday.date,
            notes: bankHoliday.notes
        }
    });
    
    return bankHolidaysFiltered;
}

export default fetchBankHolidays;