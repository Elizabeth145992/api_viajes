import type { ITripService } from "../interfaces/trip.service.interface.js";
import type { ITripRepository } from "../interfaces/trip.repository.interface.js";
import type { ITrip } from "../types/trip.types.js";

export class TripService implements ITripService {
    private repository: ITripRepository;
    
    constructor(repository: ITripRepository) {
        this.repository = repository;
    }

    async findAll(): Promise<ITrip[]> {
        return this.repository.findAll();
    }

    async findById(id: number): Promise<ITrip> {
        const trip = await this.repository.findById(id);

        if (trip ===  null) {
            throw new Error("No se obtuvo un viaje con el id " + id);
        }

        return trip;
    }

    async createTrip(originId: number, destinatioId: number, depertureDate: string, capacity: number): Promise<ITrip> {
        const tripId = await this.repository.createTrip(originId, destinatioId, depertureDate, capacity);

        if (tripId === null) {
            throw new Error("El viaje no pudo ser creado");
        }

        const newTrip = await this.repository.findById(tripId);

        if (newTrip === null) {
            throw new Error("El viaje fue creado, pero no se pudo obtener su información");
        }

        return newTrip;
    }
}