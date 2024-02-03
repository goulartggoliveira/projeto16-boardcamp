import { Router } from "express";
import { getCustomers, getCustomersId } from "../controllers/customers.controllers.js";



const customersRoutes = Router()

customersRoutes.get("/customers", getCustomers)
customersRoutes.get("/customers/:id", getCustomersId)
customersRoutes.post("/customers")
customersRoutes.put("customers/:id")

export default customersRoutes