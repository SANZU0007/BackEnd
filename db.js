 import { MongoClient } from "mongodb";
 import obj from "mongodb"

const mongoConnectString = 'mongodb://127.0.0.1:27017';

 export async function dbConnection() {
  const client = new MongoClient(mongoConnectString);
  await client.connect();
  console.log("MongoDB is connected successfully");
  return client;
}

export const client = await dbConnection();
export var ObjectId = obj.ObjectId;


