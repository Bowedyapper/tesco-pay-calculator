// Tesco Holiday Entitlement based on length of service
// 15 Years or more                 = 7.6 weeks
// 10 Years or more < 15            = 7.2 weeks
// 5 Years or more < 10             = 6.6 weeks
// More than 12 months < 5 years    = 6 weeks
// Fewer than 12 months             = 5.6 weeks

/**
 * Calculate the holiday entitlement in weeks based on length of service
 *
 * @param {number} lengthOfService
 * @return {number}
 */
const calculateHolidayEntitlementWeeks = (lengthOfService: number): number => {
    let holidayEntitlementWeeks: number = 0;

    if (lengthOfService >= 15) {
        holidayEntitlementWeeks = 7.6;
    } else if (lengthOfService >= 10 && lengthOfService < 15) {
        holidayEntitlementWeeks = 7.2;
    } else if (lengthOfService >= 5 && lengthOfService < 10) {
        holidayEntitlementWeeks = 6.6;
    } else if (lengthOfService >= 1 && lengthOfService < 5) {
        holidayEntitlementWeeks = 6;
    } else if (lengthOfService < 1) {
        holidayEntitlementWeeks = 5.6;
    }

    return holidayEntitlementWeeks;
}

/**
 * Calculate the holiday entitlement in days based on length of service and contracted days
 *
 * @param {number} lengthOfService
 * @param {number} contractedDays
 * @return {number}
 */
const calculateYearlyHolidayEntitlementInDays = (lengthOfService: number, contractedDays: number): number => {
    const yearlyWeeklyHolidayEnt = calculateHolidayEntitlementWeeks(lengthOfService);
    return yearlyWeeklyHolidayEnt * contractedDays;
}

/**
 * Calculate the holiday entitlement in hours based on length of service and contracted hours per week
 *
 * @param {number} lengthOfService
 * @param {number} contractedHoursPerWeek
 * @return {number}
 */
const calculateYearlyHoursHolidayEntitlement = (lengthOfService: number, contractedHoursPerWeek: number): number => {
    return calculateHolidayEntitlementWeeks(lengthOfService) * contractedHoursPerWeek;
}
