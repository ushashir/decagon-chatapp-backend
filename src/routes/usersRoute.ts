import express from "express"
import { register,login,setAvatar,getAllUsers } from "../controllers/usersController";
const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.post("/setavatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);


export default router