import joi from "joi"

const gameSchema = joi.object({
    name: joi.string().trim().required(),
    image: joi.string().uri().trim().required(),
    stockTotal: joi.number().integer().min(1).required(),
    pricePerDay: joi.number().integer().min(1).required()
})

export default gameSchema