import type { Book } from './book';

export interface Author {
    id: number;
    name: string;
    email: string; 
    phone: string;
    books?: Book[];
}

