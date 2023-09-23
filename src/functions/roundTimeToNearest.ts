import type { Moment } from 'moment';

/**
 * Rounds a given time to the nearest 15 minutes based on a 3 minute
 * leeway that tescos payroll system allows
 * 
 * @param {Moment} time
 * @return {Moment}
 * @example
 * roundTimeToNearest(moment('2023-08-18 08:12:00'))
 * // Returns moment('2023-08-18 08:15:00')
 */
const roundTimeToNearest = (time: Moment) => {
  const remainder: number = time.minutes() % 15;

  if (remainder >= 0 && remainder <= 3) {
    return time.subtract(remainder, 'minutes');
  }

  if (remainder > 3 && remainder < 12) {
    if (remainder < 8) {
      return time.add(15 - remainder, 'minutes');
    } else {
      return time.subtract(remainder, 'minutes');
    }
  }

  if (remainder >= 12 && remainder <= 15) {
    return time.add(15 - remainder, 'minutes');
  }
}

export default roundTimeToNearest;