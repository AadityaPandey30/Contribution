// services/campusAmbassadorService.js
import { connectToDatabase } from "../lib/db.js";
import { AMBASSADORS_COLLECTION } from "../models/ambassadorModel.js";

export async function addAmbassador(name, email) {
  const { db } = await connectToDatabase();
  const ambassadors = db.collection(AMBASSADORS_COLLECTION);

  const existing = await ambassadors.findOne({ email });
  if (existing) throw new Error("Email already registered");

  const record = { name, email, createdAt: new Date() };
  const result = await ambassadors.insertOne(record);
  return await ambassadors.findOne({ _id: result.insertedId });
}

export async function getAmbassadors() {
  const { db } = await connectToDatabase();
  return db.collection(AMBASSADORS_COLLECTION).find({}).sort({ createdAt: -1 }).toArray();
}
