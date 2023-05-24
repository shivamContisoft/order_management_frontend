// Table data
export interface Table {
    id: number,
    fullName: string;
    designation: string;
    email: string;
    contact: string;
    createdAt: string;
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
