import { z } from "zod";

export const createTripSchema = z.object({
    originId: z.number().positive(),
    destinationId: z.number().positive(),
    depertureDate: z.iso.datetime(),
    capacity: z.number().positive().min(1),
});

export type CreateTripDTO = z.infer<typeof createTripSchema>;