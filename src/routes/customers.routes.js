import { Router } from "express";
import { getCustomers, getCustomersId, postCustomers } from "../controllers/customers.controllers.js";
import validateSchema from "../middlewares/vs.middleware.js";
import { customerSchema } from "../schemas/customers.schemas.js";



const customersRoutes = Router()

customersRoutes.get("/customers", getCustomers)
customersRoutes.get("/customers/:id", getCustomersId)
customersRoutes.post("/customers",validateSchema(customerSchema), postCustomers)
customersRoutes.put("customers/:id")

export default customersRoutes