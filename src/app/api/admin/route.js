import { MongoClient, ObjectId } from 'mongodb';
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

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, name, userId, points } = body;

    const client = await connectToDatabase();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    switch (action) {
      case 'addUser':
        // Validate input
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
          return NextResponse.json(
            { success: false, error: 'Valid name is required' },
            { status: 400 }
          );
        }

        const trimmedName = name.trim();

        // Check if user already exists (case-insensitive)
        const existingUser = await collection.findOne({ 
          name: { $regex: new RegExp(`^${trimmedName}$`, 'i') } 
        });

        if (existingUser) {
          return NextResponse.json(
            { success: false, error: 'User with this name already exists' },
            { status: 400 }
          );
        }

        // Create new user with 10 initial points
        const newUser = {
          name: trimmedName,
          points: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const insertResult = await collection.insertOne(newUser);
        const createdUser = await collection.findOne({ _id: insertResult.insertedId });

        return NextResponse.json({
          success: true,
          message: 'User added successfully',
          user: createdUser
        });

      case 'addPoints':
        // Validate input
        if (!userId || typeof userId !== 'string') {
          return NextResponse.json(
            { success: false, error: 'Valid user ID is required' },
            { status: 400 }
          );
        }

        if (!points || typeof points !== 'number' || isNaN(points)) {
          return NextResponse.json(
            { success: false, error: 'Valid points value is required' },
            { status: 400 }
          );
        }

        // Validate ObjectId format
        if (!ObjectId.isValid(userId)) {
          return NextResponse.json(
            { success: false, error: 'Invalid user ID format' },
            { status: 400 }
          );
        }

        // Find user and update points
        const user = await collection.findOne({ _id: new ObjectId(userId) });
        
        if (!user) {
          return NextResponse.json(
            { success: false, error: 'User not found' },
            { status: 404 }
          );
        }

        const newPoints = user.points + points;

        // Prevent negative points
        if (newPoints < 0) {
          return NextResponse.json(
            { success: false, error: `Cannot subtract ${Math.abs(points)} points. User only has ${user.points} points.` },
            { status: 400 }
          );
        }

        const updateResult = await collection.updateOne(
          { _id: new ObjectId(userId) },
          { 
            $set: { 
              points: newPoints,
              updatedAt: new Date()
            } 
          }
        );

        if (updateResult.matchedCount === 0) {
          return NextResponse.json(
            { success: false, error: 'User not found' },
            { status: 404 }
          );
        }

        // Get updated user data
        const updatedUser = await collection.findOne({ _id: new ObjectId(userId) });

        return NextResponse.json({
          success: true,
          message: `Points ${points >= 0 ? 'added' : 'subtracted'} successfully`,
          user: updatedUser
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action. Use "addUser" or "addPoints"' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('POST /api/admin error:', error);
    
    // Handle specific MongoDB errors
    if (error.name === 'BSONTypeError') {
      return NextResponse.json(
        { success: false, error: 'Invalid user ID format' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Fetch all users for admin panel
    const users = await collection
      .find({})
      .sort({ points: -1, name: 1 })
      .toArray();

    return NextResponse.json({
      success: true,
      users: users,
      count: users.length
    });
  } catch (error) {
    console.error('GET /api/admin error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch users',
        details: error.message 
      },
      { status: 500 }
    );
  }
}