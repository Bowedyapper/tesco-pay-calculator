/**
 * Calculates the gross pay for a shift
 *
 * @param {number} hours
 * @param {number} rate
 * @param {number} [nightShiftHours]
 * @param {number} [nightShiftPremium]
 * @return {number}
 * @example
 * calculateGrossPay(8, 9.50, 2, 1.50)
 * // Returns 80.50
 */
const calculateGrossPay = (hours: number, rate: number, nightShiftHours?: number, nightShiftPremium?: number): number => {
    let grossPay: number = 0;

    if (nightShiftHours && nightShiftPremium) {
        grossPay += Math.trunc(nightShiftHours) * nightShiftPremium; // Calculate night shift premium for every full hour worked
    }

    grossPay += hours * rate; // Calculate gross pay

    return parseFloat(grossPay.toFixed(2));
}

export default calculateGrossPay;