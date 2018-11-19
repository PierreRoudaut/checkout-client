import { environment } from 'src/environments/environment';

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

/**
 * Resolve the url of a given product image
 * @param imageFilename filename
 */
export function productImgUrl(imageFilename: string) {
    return `${environment.apiEndpoint}/api/public/images/products/${imageFilename}`;
}
