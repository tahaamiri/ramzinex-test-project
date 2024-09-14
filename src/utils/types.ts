export type Pairs = {
    pair_id: number;
    logo: string;
    base_currency_symbol: {
        en: string;
        fa: string;
    };
    financial: {
        last24h: {
            base_volume: number;
            change_percent: number
            close: number;
            highest: number;
            lowest: number;
            open: number;
            quote_volume: number;
        }
    }
    sell: number;
    url_name: string;
}

export type SortOrderType = 'Ascending' | 'Descending';