import {
  createDiary,
  getDiaries,
  updateDiary,
  deleteDiary,
} from "../controler/diary.js";
// 注意这里更改了导入的函数和路径
import express from "express";

const router = express.Router();

// GET /api/diaries
router.get("/", getDiaries);
// POST /api/diaries
router.post("/", createDiary);
// PUT /api/diaries/:id
router.put("/:id", updateDiary);
// DELETE /api/diaries/:id
router.delete("/:id", deleteDiary);

export default router;
