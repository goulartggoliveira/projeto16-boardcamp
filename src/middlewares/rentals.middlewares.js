
export async function rentalValidation(req, res, next) {
    const { id } = req.params

    const rental = await db.query(`SELECT * FROM rentals WHERE id=$1`, [id])
    if (rental.rowCount === 0) return res.status(404).send({ message: "Aluguel inexistente!" })
    if (rental.rows[0].returnDate === null) return res.status(400).send({ message: "Aluguel não pode ser deletado pois não foi finalizado." })
    next()
}