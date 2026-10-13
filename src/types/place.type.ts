import type { RowDataPacket } from "mysql2";

export interface IPlace {
    id: number;
    state: string;
    municipality: string;
    postal_code: string;
    active: number;
}

export interface PlaceRow extends RowDataPacket {
    id: number;
    state: string;
    municipality: string;
    postal_code: string;
    active: number;
}