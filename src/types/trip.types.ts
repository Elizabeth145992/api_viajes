import type { RowDataPacket } from "mysql2";

export interface ITrip {
    id: number;
    originId: number;
    destinationId: number;
    departureDate: string;
    capacity: number;
}

export interface TripRow extends RowDataPacket {
    id: number;
    originId: number;
    destinationId: number;
    departureDate: string;
    capacity: number;
}