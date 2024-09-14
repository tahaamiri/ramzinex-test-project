const baseUrl = "https://publicapi.ramzinex.com/exchange"

export const API = {
    marketList: `${baseUrl}/api/v1.0/exchange/pairs`,
    currencies: `${baseUrl}/api/v1.0/exchange/currencies`,
}

export const get = async (url: string) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
};