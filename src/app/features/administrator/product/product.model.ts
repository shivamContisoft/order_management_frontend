// Table data
export interface Table {
    id: number,
    productName: string;
    description: string;
    createdAt: string;
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
