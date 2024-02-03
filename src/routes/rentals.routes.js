import { Router } from "express";
import { getRentals, postRentals } from "../controllers/rentals.controllers.js";
import validateSchema from "../middlewares/vs.middleware.js";
import { rentalSchema } from "../schemas/rentals.schemas.js";


const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals",validateSchema(rentalSchema), postRentals)
rentalsRouter.post("/rentals/:id/return")
rentalsRouter.delete("/rentals/:id")

export default rentalsRouter