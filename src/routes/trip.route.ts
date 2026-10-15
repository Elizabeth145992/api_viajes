import express from "express";
import { tripController } from "../controllers/trip.controller.js";
import TripRepository from "../repositories/trip.repository.js";
import { TripService } from "../services/trip.service.js";
import pool from "../database/connection.js";

const tripRepository = new TripRepository(pool);
const tripSerive = new TripService(tripRepository);

const router = express.Router();
const createTripController = tripController(tripSerive);

router.get("/", createTripController.findAll);
router.get("/:id", createTripController.findById);
router.post("/", createTripController.createTrip);

export default router;