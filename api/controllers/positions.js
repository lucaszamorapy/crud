import { db } from "../db.js";

export const getPositions = (_, res) => {
  const q = "SELECT id, position FROM positions";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};
