import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// MongoDB connection string - replace with your MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'leaderboard';
const COLLECTION_NAME = 'users';

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    cachedClient = client;
    return client;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Database connection failed');
  }
}

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Fetch all users sorted by points in descending order (highest first)
    const users = await collection
      .find({})
      .sort({ points: -1, name: 1 })
      .toArray();

    return NextResponse.json({
      success: true,
      users: users
    });
  } catch (error) {
    console.error('GET /api error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch leaderboard data',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const client = await connectToDatabase();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // This endpoint is mainly for testing or basic operations
    // Most admin operations should go through /api/admin
    return NextResponse.json({
      success: false,
      error: 'Use /api/admin for user management operations'
    }, { status: 400 });
  } catch (error) {
    console.error('POST /api error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Invalid request',
        details: error.message 
      },
      { status: 400 }
    );
  }
}