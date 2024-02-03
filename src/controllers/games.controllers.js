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

    try {
        const duplicateNameCheck = await db.query(`
        SELECT COUNT(*) AS count
        FROM games
        WHERE name = $1;
    `, [name]);

    const isDuplicateName = duplicateNameCheck.rows[0].count > 0;

    if (isDuplicateName) {
        res.status(409).send("Duplicate name. Please choose a different name.");
    } else {      
            await db.query(`
            INSERT INTO games (name, image, "stockTotal", "pricePerDay")
                VALUES($1, $2, $3, $4);
            `, [name, image, stockTotal, pricePerDay]);

            res.sendStatus(201)
    }
    } catch (error) {
        res.status(500).send(error.message)
    }
}