import { Router } from "express";
import User from "../controllers/user.contr.js";

const router = Router();

router
  .post("/users", User.POST)
  .get("/users", User.GET)
  .delete("/users", User.DELETE);

export default router;
