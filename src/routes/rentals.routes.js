import { Router } from "express";
import { postRentals } from "../controllers/rentals.controllers.js";


const rentalsRouter = Router()

rentalsRouter.get("/rentals")
rentalsRouter.post("/rentals", postRentals)
rentalsRouter.post("/rentals/:id/return")
rentalsRouter.delete("/rentals/:id")

export default rentalsRouter