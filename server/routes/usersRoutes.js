import express from "express";
import { register, login, getAllUsers } from "../controller/userController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allUsers/:id", getAllUsers);
// router.post("/setAvatar/:id", setAvatar);

export default router;

// , login, setAvatar, getAllUsers