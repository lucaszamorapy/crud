import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = `
  SELECT employees.id, employees.name, employees.email, positions.position
  FROM employees
  INNER JOIN positions ON employees.position_id = positions.id
  
`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const addUser = (req, res) => {
  const q = "INSERT INTO employees(`name`, `email`, `position_id`) VALUES(?)";

  const values = [req.body.nome, req.body.email, req.body.position_id];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Funcionário cadastrado.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE employees SET `name` = ?, `email` = ?, `position_id` = ? WHERE `id` = ?";

  const values = [req.body.nome, req.body.email, req.body.position_id];

  db.query(q, [...values, req.params.id], (err) => {
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
