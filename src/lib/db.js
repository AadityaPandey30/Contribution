// lib/db.js
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = "leaderboard";

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) return { client: cachedClient, db: cachedDb };

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
