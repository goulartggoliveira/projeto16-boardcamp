import { db } from "../database/database.connection";

export async function getCustomers(req, res) {
  try {
    const result = await db.query(`SELECT * FROM customers;`);

    const customers = result.rows.map( c => {
        return{
            ...c,
            birthday: dayjs(c.birthday).format('YYYY-MM-DD')
        }
    })

    res.send(customers);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getCustomersId(req,res){
    const { id } = req.params
    try {
        const customerId = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id]) 

        if (customerId.rowCount === 0 ) {
            res.status(404).send('Customer Id not found!')
        } else {
            const resultId =  {
                ...customerId.rows[0],
                birthday: dayjs(customerId.rows[0].birthday).format('YYYY-MM-DD')
            }
            res.send(resultId)
        }
        
    } catch (error) {
        res.status(500).send(error.message);
        
    }
}