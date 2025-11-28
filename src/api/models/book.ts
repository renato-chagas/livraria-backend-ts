import type { Author } from './author';
import type { Category } from './category';
import type { Publisher } from './publisher';

export interface Book {
    id: number;
    title: string;

    authorIds: number[];
    authors?: Author[]; 

    categoryIds: number[];
    categories?: Category[]; 
    
    publisherId: number;
    publisher?: Publisher;

    isbn: string;
    synopsis: string; 
    price: number; 
    quantity: number;
}