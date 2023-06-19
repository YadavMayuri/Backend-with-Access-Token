import express from "express";
import { RegenerateToken, register } from "../controllers/UsersControllers.js";
import { registrationCheck } from "../middlewares/authMiddleware.js";



var router = express.Router();

router.post('/register',registrationCheck,register)
router.post('/RegenerateToken',RegenerateToken)







export default router;