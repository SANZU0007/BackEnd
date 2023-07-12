 import dotenv from 'dotenv'
 dotenv.config()
 
 import { MongoClient } from "mongodb";
 
 
 import obj from "mongodb"

 

 
 const mongoConnectString = process.env.MONGO_URL ;
 


 export async function dbConnection() {
  const client = new MongoClient(mongoConnectString);
  await client.connect();
  console.log("MongoDB is connected successfully");
  return client;
}


export var ObjectId = obj.ObjectId;
export const client = await dbConnection();


