export const priceRegexCheck = (price: number) => {
    const validPriceRegex = RegExp(/\B(?=(\d{3})+(?!\d))/);
    return price.toString().replace(validPriceRegex, ',');
}