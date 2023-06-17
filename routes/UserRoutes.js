import express from "express";
import { register } from "../controllers/UsersControllers.js";



var router = express.Router();

router.post('/register',register)






export default router;