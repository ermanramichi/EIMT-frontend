// ─── Domain types ─────────────────────────────────────────────────────────

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
export const CATEGORIES: Category[] = ['ROOM', 'HOUSE', 'FLAT', 'APARTMENT', 'HOTEL', 'MOTEL'];

export type Condition = 'GOOD' | 'BAD';
export const CONDITIONS: Condition[] = ['GOOD', 'BAD'];

export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
    first: boolean;
    last: boolean;
}

// ─── Payload (CREATE / UPDATE) types ──────────────────────────────────────

export interface AccommodationPayload {
    name: string;
    category: Category;
    hostId: number;
    condition: Condition;
    numRooms: number;
}

export interface HostPayload {
    name: string;
    surname: string;
    countryId: number;
}

export interface CountryPayload {
    name: string;
    continent: string;
}

// ─── Auth ──────────────────────────────────────────────────────────────────

export type AppRole = 'USER' | 'ADMINISTRATOR';

export interface AuthUser {
    username: string;
    name: string;
    role: AppRole;
}

export interface AuthResponse {
    token: string;
    username: string;
    name: string;
    role: AppRole;
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface RegisterPayload {
    username: string;
    password: string;
    name: string;
    role?: AppRole;
}
