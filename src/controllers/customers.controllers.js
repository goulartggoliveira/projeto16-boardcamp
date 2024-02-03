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
    const customerId = await db.query(
      `SELECT * FROM customers WHERE id = $1;`,
      [id]
    );

    if (customerId.rowCount === 0)
      return res.status(404).send("Customer Id not found!");

    const resultId = {
      ...customerId.rows[0],
      birthday: dayjs(customerId.rows[0].birthday).format("YYYY-MM-DD"),
    };
    res.send(resultId);
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
