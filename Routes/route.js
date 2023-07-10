import express, { query } from "express";
import { getAllStudent, getStudentById } from "../Controllers/student.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    if(req.query.task){
      req.query.task = parseInt(req.query.task)
    }


    const students = await getAllStudent(req);


    if (students.length === 0) {
      return res.status(404)
      .json({ message: "No data available" });
    }

    res.status(200).json({ data: students });
  } catch (error) {
    console.error(error);
     // Log the error for debugging purposes
    res.status(500)
    .json({ message: "Internal server error" });
  }
});
 
router.get("/all/:id", async (req,res)=>
{
  try {
    const {id}= req.params;
    const students = await getStudentById(id);
    if(!students){
      return res.status(400).json({message:"no data available"})
    }
    return res.status(200).json({data:students})

  } catch (error) {
    console.log(error);

    res.status(500)
    .json({message:"internet server error"});
    
  }
})




export const studentRouter = router;
