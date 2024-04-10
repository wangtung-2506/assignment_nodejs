import { Router } from "express";
import { createSV, deleteSV, getAllSv, getSV, updateSV } from "../controllers/sinhvien";

const router = Router();

router.get("/sinhvien",getAllSv)
router.get("/sinhvien/:id",getSV)
router.post("/sinhvien",createSV)
router.delete("/sinhvien/:id",deleteSV)
router.put("/sinhvien/:id",updateSV)

export default router;