import { Router } from "express";
import validateSchema from "../middlewares/vs.middleware.js";
import gameSchema from "../schemas/games.schemas.js";
import { getGames, postGames } from "../controllers/games.controllers.js";
import { validateCreateGame } from "../middlewares/games.middleware.js";


const gamesRouter = Router()

gamesRouter.get("/games", getGames)
gamesRouter.post("/games", validateSchema(gameSchema),validateCreateGame, postGames)

export default gamesRouter