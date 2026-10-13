import type { ITrip } from "../types/trip.types.js";

export interface ITripRepository {
  findAll(): Promise<ITrip[] | []>;
  createTrip(
    originId: number,
    destinatioId: number,
    depertureDate: string,
    capacity: number,
  ): Promise<number | null>;
}
