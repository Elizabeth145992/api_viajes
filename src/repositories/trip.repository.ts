import type { Pool, ResultSetHeader } from "mysql2/promise";
import type { ITripRepository } from "../interfaces/trip.repository.interface.js";
import type { ITrip, TripRow } from "../types/trip.types.js";

export default class TripRepository implements ITripRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<ITrip[] | []> {
    const [results] = await this.pool.execute<TripRow[]>(
      "SELECT id, origin_id, destination_id, deperture_date, capacity, active WHERE active = 1",
    );

    if ( results.length > 0) {
        return results;
    }

    return [];
  }

  async createTrip(
    originId: number,
    destinatioId: number,
    depertureDate: string,
    capacity: number,
  ): Promise<number | null> {
    const [result] = await this.pool.execute<ResultSetHeader>(
      "INSERT INTO trips origin_id, destination_id, deperture_date, capacity VALUES (?, ?, ?, ?)",
      [originId, destinatioId, depertureDate, capacity],
    );

    if (result.affectedRows > 0) {
      return result.insertId;
    }
    return null;
  }
}
