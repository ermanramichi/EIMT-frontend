export interface Country {
    id: number;
    name: string;
    continent: string;
}

export interface Host {
    id: number;
    name: string;
    surname: string;
    countryId: number;
    countryName: string;
    createdAt: string;
    updatedAt: string;
}

export interface Accommodation {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    category: Category;
    hostId: number;
    hostFullName: string;
    condition: Condition;
    numRooms: number;
    rented: boolean;
}

export type Category = 'ROOM' | 'HOUSE' | 'FLAT' | 'APARTMENT' | 'HOTEL' | 'MOTEL';

export type Condition = 'GOOD' | 'BAD';

export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
}
