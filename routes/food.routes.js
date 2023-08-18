import { Router } from "express";
import Food from "../controllers/food.contr.js";
const router = Router();

router.post("/foods", Food.POST).get("/foods", Food.GET);

export default router;
