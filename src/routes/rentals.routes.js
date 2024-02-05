import { Router } from "express";
import { deleteRentalsId, getRentals, postRentals, rentalsIdReturn } from "../controllers/rentals.controllers.js";
import validateSchema from "../middlewares/vs.middleware.js";
import { rentalSchema } from "../schemas/rentals.schemas.js";
import { rentalValidation } from "../middlewares/rentals.middlewares.js";


const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals",validateSchema(rentalSchema), postRentals)
rentalsRouter.post("/rentals/:id/return", rentalsIdReturn)
rentalsRouter.delete("/rentals/:id", rentalValidation, deleteRentalsId)

export default rentalsRouter