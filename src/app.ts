import express from "express";
import tripRouter from "./routes/trip.route.js";

const app = express();
const port = 3000;

app.use("/trips", tripRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en el http://localhost:${port}`);
});