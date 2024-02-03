import { db } from "../database/database.connection.js"


export async function getGames(req,res){
    try {
        const games = await db.query(`SELECT * FROM games`);
        res.status(200).send(games.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function postGames(req,res){
    const { name, image, stockTotal, pricePerDay } = req.body

    res.sendStatus(201)
    try {
        const checkGame = await db.query(`SELECT name FROM game WHERE name = $1;`, [name])
        if ( checkGame.rowCount > 0 )
            return res.status(409).send({message:'Jogo já cadastrado!'});

            await db.query(`
            INSERT INTO games (name, image, "stockTotal", "pricePerDay")
                VALUES($1, $2, $3, $4);
            `, [name, image, stockTotal, pricePerDay]);

            res.sendStatus(201)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}