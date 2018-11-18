
const currencyFormatter = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2
});


/**
 * Format a given amount into GBP currency
 * @param price Amount to format
 */
export function formatPrice(price: number) {
    return currencyFormatter.format(price);
}
