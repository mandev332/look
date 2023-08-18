import { Router } from "express";
import Order from "../controllers/order.contr.js";
const router = Router();

router
  .post("/orders", Order.POST)
  .get("/orders/:user_id", Order.GET)
  .get("/orders", Order.GET)
  .delete("/orders", Order.DELETE);

export default router;
