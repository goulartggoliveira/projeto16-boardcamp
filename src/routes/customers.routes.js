import { Router } from "express";



const customersRoutes = Router()

customersRoutes.get("/customers")
customersRoutes.get("/customers/:id")
customersRoutes.post("/customers")
customersRoutes.put("customers/:id")

export default customersRoutes