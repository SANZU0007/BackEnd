import { ObjectId } from "bson";
import { client } from "../db.js";
export function getAllStudent(req) {
  return client
    .db("demo")
    .collection("mentor")

    .find(req.query)
    .toArray();
}

export function getStudentById(id){
    return client
    .db("demo")
    .collection("mentor")
    .findOne({_id: new ObjectId(id)})
}
