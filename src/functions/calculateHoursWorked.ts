import moment, { Moment } from 'moment'
import calculateNightShiftHours from './calculateNightShiftHours';

/**
 * Calculates the number of hours worked and subtracts the number of night shift hours
 * to get the number of normal hours worked and night shift hours worked separately
 * so pay can be calculated correctly
 * 
 * @param {Moment} clockInTime
 * @param {Moment} clockOutTime
 * @return {object}
 * @example
 * calculateHoursWorked(moment('2023-08-18 22:00:00'), moment('2023-08-19 06:00:00'))
 * // Returns { total: 8, nightShiftHours: 6, normalHours: 2 }
 */
const calculateHoursWorked = (clockInTime: Moment, clockOutTime: Moment) => {
    const nightShiftHours = calculateNightShiftHours(clockInTime, clockOutTime);
    return {
        total: moment.duration(clockOutTime.diff(clockInTime)).asHours(),
        nightShiftHours: nightShiftHours,
        normalHours: moment.duration(clockOutTime.diff(clockInTime)).asHours() - nightShiftHours
    }
}

export default calculateHoursWorked;