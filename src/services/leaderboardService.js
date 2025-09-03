// services/leaderboardService.js
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../lib/db.js";
import { USERS_COLLECTION } from "../models/userModel.js";

export async function addUser(name) {
  const { db } = await connectToDatabase();
  const collection = db.collection(USERS_COLLECTION);

  const existing = await collection.findOne({ name: new RegExp(`^${name}$`, "i") });
  if (existing) throw new Error("User already exists");

  const user = { name, points: 10, createdAt: new Date(), updatedAt: new Date() };
  const result = await collection.insertOne(user);
  return await collection.findOne({ _id: result.insertedId });
}

export async function addPoints(userId, points) {
  const { db } = await connectToDatabase();
  const collection = db.collection(USERS_COLLECTION);

  const user = await collection.findOne({ _id: new ObjectId(userId) });
  if (!user) throw new Error("User not found");

  const newPoints = user.points + points;
  if (newPoints < 0) throw new Error("Insufficient points");

  await collection.updateOne({ _id: new ObjectId(userId) }, { $set: { points: newPoints, updatedAt: new Date() } });
  return await collection.findOne({ _id: new ObjectId(userId) });
}

export async function getUsers() {
  const { db } = await connectToDatabase();
  return db.collection(USERS_COLLECTION).find({}).sort({ points: -1, name: 1 }).toArray();
}
