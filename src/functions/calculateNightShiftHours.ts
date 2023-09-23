import moment, { Moment } from 'moment'
const format = 'YYYY-MM-DD HH:mm:ss'

/**
 * Calculates the number of hours worked during night shift hours (12am - 6am)
 * 
 * @param {Moment} clockInTime
 * @param {Moment} clockOutTime
 * @return {number}
 * @example
 * calculateNightShiftHours(moment('2023-08-18 22:00:00'), moment('2023-08-19 06:00:00'))
 * // Returns 6
 */
const calculateNightShiftHours = (clockInTime: Moment, clockOutTime: Moment) => {
    const midnight: Moment = moment(clockOutTime, format).set('hour', 0).set('minute', 0) // Set the time to midnight (00:00)
    const sixAM: Moment = moment(clockOutTime, format).set('hour', 6).set('minute', 0) // Set the time to 6 AM (06:00)

    let nightShiftHours: number = 0

    if(clockInTime.isBetween(midnight, sixAM) && clockOutTime.isBetween(midnight, sixAM)){
        nightShiftHours = moment.duration(clockOutTime.diff(clockInTime)).asHours()
    } else if(midnight.isBetween(clockInTime, clockOutTime) || sixAM.isBetween(clockInTime, clockOutTime) || clockOutTime.isBetween(midnight, sixAM)){
        nightShiftHours = moment.duration(clockOutTime.diff(midnight)).asHours() - moment.duration(clockOutTime.diff(sixAM)).asHours()
    } else if(clockInTime.isSame(midnight) && clockOutTime.isSame(sixAM)){
        nightShiftHours = 6
    }

    return Math.round(nightShiftHours * 100) / 100
}

export default calculateNightShiftHours;