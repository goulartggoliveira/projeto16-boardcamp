import dayjs from "dayjs";
import { db } from "../database/database.connection.js";

export async function getCustomers(req, res) {
  try {
    const result = await db.query(`SELECT * FROM customers;`);

    const customers = result.rows.map((c) => {
      return {
        ...c,
        birthday: dayjs(c.birthday).format("YYYY-MM-DD"),
      };
    });

    res.send(customers);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getCustomersId(req, res) {
  const { id } = req.params;
  try {
    const response = await db.query(`SELECT * FROM customers WHERE id = $1;`, [
      id,
    ]);
    if (response.rowCount === 0)
      return res.status(404).send("Customer Id not found!");

    const newResponse = response.rows[0];
    const resultId = {
      ...newResponse,
      birthday: dayjs(newResponse.birthday).format("YYYY-MM-DD"),
    };
    res.status(200).send(resultId);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function postCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const duplicateCpfCheck = await db.query(
      `
      SELECT COUNT(*) AS count
      FROM customers
      WHERE cpf = $1;
    `,
      [cpf]
    );

    const isDuplicateCpf = duplicateCpfCheck.rows[0].count > 0;

    if (isDuplicateCpf) {
      res.status(409).send("CPF already exists. Please use a different CPF.");
    } else {
      await db.query(
        `
        INSERT INTO customers(name, phone, cpf, birthday)
        VALUES( $1, $2, $3, $4);
        `,
        [name, phone, cpf, birthday]
      );

      res.sendStatus(201);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function putCustomersId(req,res){
    const { id } = req.params; 

    const {name, phone, cpf, birthday } = req.body;

    try {
        
        const customer = await db.query(`SELECT id, cpf FROM customers WHERE cpf = $1;`, [cpf]);

        if ( customer.rowCount > 0 && id !== customer.rows[0].id)
            return res.status(409).send({message:'CPF cadastrado para outro cliente!'});

        await db.query(`
            UPDATE customers 
                SET name = $1, phone = $2, cpf = $3, birthday = $4
                WHERE id = $5;
        `, [name, phone, cpf, birthday, id]);

        res.sendStatus(200);
        
    } catch (err) {
        res.status(500).send(err.message)
    }
}