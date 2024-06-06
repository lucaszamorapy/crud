import express from "express";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  searchUsers,
} from "../controllers/user.js";
import { getPositions } from "../controllers/positions.js";

const router = express.Router();

// Rotas para usuários
router.get("/", getUsers); // Rota para obter todos os usuários
router.post("/", addUser); // Rota para adicionar um novo usuário
router.put("/:id", updateUser); // Rota para atualizar um usuário pelo ID
router.delete("/:id", deleteUser); // Rota para excluir um usuário pelo ID
router.get("/search", searchUsers);

// Rota para obter todas as posições
router.get("/positions", getPositions);

export default router;
