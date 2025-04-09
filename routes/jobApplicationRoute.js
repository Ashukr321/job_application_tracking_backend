import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("job application route");
})

export default router;