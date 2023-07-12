import dotenv from "dotenv"
dotenv.config();

import express from "express";




import { studentRouter } from "./Routes/route.js";


const app = express();
const PORT =  process.env.PORT;

app.use(express.json());
  
app.use("/students", studentRouter);

app.listen(PORT, () => console.log(`Server started on localhost:${PORT}`));
