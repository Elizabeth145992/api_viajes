import type { ITrip } from "../types/trip.types.js";

export interface ITripService {
  findAll(): Promise<ITrip[]>;
  findById(id: number): Promise<ITrip>;
  createTrip(
    originId: number,
    destinatioId: number,
    depertureDate: string,
    capacity: number,
  ): Promise<ITrip>;
}
