import express from "express";
import type { CreateTripDTO } from "../schemas/trip.schema.js";
import type { ITripService } from "../interfaces/trip.service.interface.js";

export const tripController = (tripService: ITripService) => {
  const findAll = async (req: express.Request, res: express.Response) => {
    const trips = await tripService.findAll();

    res.json(trips);
  };

  const findById = async (req: express.Request, res: express.Response) => {
    const tripId = Number(req.params.id);
    const trip = await tripService.findById(tripId);

    res.json(trip);
  };

  const createTrip = async (req: express.Request, res: express.Response) => {
    const {
      originId,
      destinationId,
      depertureDate,
      capacity,
    }: CreateTripDTO = req.body;

    const newTrip = await tripService.createTrip(
      originId,
      destinationId,
      depertureDate,
      capacity,
    );
    res.status(201).json(newTrip);
  };

  return {
    findAll,
    findById,
    createTrip,
  };
};
