console.log("hii");


import express from "express";
import morgan from "morgan";

import mongoose from "mongoose";
const app = express();
import router from "./routes/UserRoutes.js";

app.use(morgan('dev')); // use() - middleware
app.use(express.json()); // data to parse
app.use('/api/v1', router);

mongoose.connect('mongodb+srv://mayuriyadav54:HGU1ZbJCNcqlTu0z@cluster0.s9gcceb.mongodb.net/Backend-access-token')
.then(()=> console.log("DB Connected"))
.catch((err) => console.log("DB Error =>", err));




app.listen(8000, () => console.log("Working on port 8000")); // port
