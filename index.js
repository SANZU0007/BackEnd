import express from "express";

import { studentRouter } from "./Routes/route.js";

const PORT = 9000;
const app = express();

app.use(express.json());
  
app.use("/students", studentRouter);

app.listen(PORT, () => console.log(`Server started on localhost:${PORT}`));
