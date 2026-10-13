import type { IPlace } from "../types/place.type.js";

export interface IPlaceRepository {
  findById(id: number): Promise<IPlace | null>,
}
