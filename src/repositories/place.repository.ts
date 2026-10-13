import type { Pool } from "mysql2/promise";
import type { IPlaceRepository } from "../interfaces/place.repository.interface.js";
import type { IPlace, PlaceRow } from "../types/place.type.js";

export default class PlaceRepository implements IPlaceRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }
  async findById(id: number): Promise<IPlace |null> {
    const [result] = await this.pool.query<PlaceRow[]>(
      "SELECT id, state, municipality, postal_code, active WHERE id = ? AND active = 1",
      id,
    );

    if (result.length > 0) {
        return result[0];
    }

    return null;
  }
}
