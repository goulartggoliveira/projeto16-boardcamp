import dayjs from "dayjs";
import { db } from "../database/database.connection.js";


export async function getRentals(req,res){
    try {
        const response = await db.query(`
        SELECT rentals.*, customers.name AS "customerName", games.name AS "gameName"
            FROM rentals
            JOIN customers ON customers.id = rentals."customerId"
            JOIN games ON games.id = rentals."gameId";
        `)

        const rentals = response.rows.map(rental => {
            const obj = {
                ...rental,
                rentDate: dayjs(rental.rentDate).format("YYYY-MM-DD"),
                customer: { id: rental.customerId, name: rental.customerName },
                game: { id: rental.gameId, name: rental.gameName }
            }

            delete obj.customerName
            delete obj.gameName

            return obj
        })

        res.send(rentals)
    } catch (err) {
        res.status(500).send(err.message)
    }
}
export async function postRentals(req,res){

    const { customerId, gameId, daysRented } = req.body;

        try {

            const customer = await db.query(`SELECT * FROM customers WHERE id=$1;`, [customerId])
        if (customer.rowCount === 0) return res.status(400).send("User not found")

        const game = await db.query(`SELECT * FROM games WHERE id=$1;`, [gameId])
        if (game.rowCount === 0) return res.status(400).send("Game not found!")

        const checkGameStock = await db.query(`
            SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL;`, [gameId])

        if (checkGameStock.rowCount >= game.rows[0].stockTotal) {
            return res.status(400).send("Game not available")
        }

        await db.query(`
            INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")
            VALUES ($1, $2, $3, $4, $5, NULL, NULL);
        `, [customerId, gameId, daysRented, dayjs().format("YYYY-MM-DD"), daysRented * game.rows[0].pricePerDay])

        res.sendStatus(201)
            
        } catch (error) {
            res.status(500).send(error.message)
        }
}