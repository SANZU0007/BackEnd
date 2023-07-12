import express from "express";
import {
  deleteStudent,
  editStudent,
  getAllStudent,
  getStudentById,
  postNewStudent,
} from "../Controllers/student.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const students = await getAllStudent(req);

    if (students.length === 0) {
      return res.status(404).json({ message: "No data available" });
    }

    res.status(200).json({ data: students });
  } catch (error) {
    console.error(error);
    // Log the error for debugging purposes
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/all/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const students = await getStudentById(id);
    if (!students) {
      return res.status(400).json({ message: "no data available" });
    }
    return res.status(200).json({ data: students });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "internet server error" });
  }
});
router.post("/add", async (req, res) => {
  try {
    const newStudent = req.body;
    console.log(newStudent);
    if (!newStudent) {
      return res.status(400).json({ message: "no data provided" });
    }
    const result = await postNewStudent(newStudent);
    if (!result) {
      return res.status(400).json({ message: "no data access" });
    }
    res.status(201).json({ data: result });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "internet server error" });
  }
});

router.put("/edit/:id", async(req, res)=>{
  try {
    const {id} = req.params;
    const updatedStudents = req.body
    if(!id || !updatedStudents) {
      return res.status(400).json({message:"Wrong Request"})
    }
    const result = await editStudent(id, updatedStudents);
    if(!result.lastErrorObject.updatedExisting){
      return res.status(400).json({message:"Error editing data"})
    }
    return res.status(200).json({data:updatedStudents, status:result})
  } catch (error) {
    console.log(error);
      res
      .status(500)
      .json({ meessage: "Internal server error" });
  }
})

router.delete("/delete/:id", async(req, res)=>{
  try {
    const {id} = req.params;
    if(!id){
      return res.status(400).json({message:"Wrong Request"})
    }

    const result = await deleteStudent(id);
    if(result.deletedCount<=0){
      return res.status(400).json({message:"Error deleting data"})
    }
    return res.status(200).json({data:result})
  } catch (error) {
    console.log(error);
      res
      .status(500)
      .json({ message: "Internal server error" });
  }
})




export const studentRouter = router;
