import { db } from "../database/database.connection.js"


export async function getGames(req,res){
    try {
        const games = await db.query(`SELECT * FROM games`);
        res.status(200).send(games.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}