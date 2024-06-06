import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = `
  SELECT employees.id, employees.name, employees.email, employees.dtNasc, employees.salario, positions.position
  FROM employees
  INNER JOIN positions ON employees.position_id = positions.id`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const searchUsers = (req, res) => {
  const searchTerm = req.query.searchTerm;
  const q = `
    SELECT employees.id, employees.name, employees.email, employees.dtNasc, employees.salario, positions.position
    FROM employees
    INNER JOIN positions ON employees.position_id = positions.id
    WHERE employees.name LIKE ? OR employees.dtNasc LIKE ?
  `;

  const values = [`%${searchTerm}%`, `%${searchTerm}%`];

  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q =
    "INSERT INTO employees(`name`, `email`, `position_id`, `dtNasc`, `salario` ) VALUES(?, ?, ?, ?, ?)";

  const values = [
    req.body.name,
    req.body.email,
    req.body.position_id,
    req.body.dtNasc,
    req.body.salario,
  ];

  db.query(q, values, (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Funcionário cadastrado.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE employees SET `name` = ?, `email` = ?, `position_id` = ?, `dtNasc` = ?, `salario` = ? WHERE `id` = ?";

  const values = [
    req.body.name,
    req.body.email,
    req.body.position_id,
    req.body.dtNasc,
    req.body.salario,
    req.params.id,
  ];

  db.query(q, values, (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Funcionário atualizado.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM employees WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Funcionário deletado.");
  });
};
