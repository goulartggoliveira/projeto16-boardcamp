import { db } from "../database/database.connection"


export async function validateCreateGame(req, res, next) {
    const { name } = req.body

    try {
        const game = await db.query(`SELECT * FROM games WHERE name=$1;`, [name])
        if (game.rowCount !== 0) return res.status(409).send({ message: "Esse jogo já existe!" })
        next()
    } catch (err) {
        res.status(500).send(err.message)
    }
}