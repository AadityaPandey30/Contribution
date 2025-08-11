import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'leaderboard';
const USERS_COLLECTION = 'users';
const NOTES_COLLECTION = 'notes';

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { action, name, userId, points, noteId, noteContent } = body;

    const client = await connectToDatabase();
    const db = client.db(DB_NAME);

    /** =====================
     * LEADERBOARD ACTIONS
     * ===================== */
    if (action === 'addUser') {
      if (!name?.trim()) {
        return NextResponse.json({ success: false, error: 'Valid name is required' }, { status: 400 });
      }

      const collection = db.collection(USERS_COLLECTION);
      const trimmedName = name.trim();
      const existingUser = await collection.findOne({ name: { $regex: new RegExp(`^${trimmedName}$`, 'i') } });
      if (existingUser) {
        return NextResponse.json({ success: false, error: 'User already exists' }, { status: 400 });
      }

      const newUser = { name: trimmedName, points: 10, createdAt: new Date(), updatedAt: new Date() };
      const result = await collection.insertOne(newUser);
      return NextResponse.json({ success: true, user: await collection.findOne({ _id: result.insertedId }) });
    }

    if (action === 'addPoints') {
      if (!ObjectId.isValid(userId)) {
        return NextResponse.json({ success: false, error: 'Invalid user ID' }, { status: 400 });
      }
      if (typeof points !== 'number') {
        return NextResponse.json({ success: false, error: 'Points must be a number' }, { status: 400 });
      }

      const collection = db.collection(USERS_COLLECTION);
      const user = await collection.findOne({ _id: new ObjectId(userId) });
      if (!user) {
        return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
      }

      const newPoints = user.points + points;
      if (newPoints < 0) {
        return NextResponse.json({ success: false, error: 'Insufficient points' }, { status: 400 });
      }

      await collection.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { points: newPoints, updatedAt: new Date() } }
      );
      return NextResponse.json({ success: true, user: await collection.findOne({ _id: new ObjectId(userId) }) });
    }

    /** =====================
     * NOTEKEEPER ACTIONS
     * ===================== */
    const notesCollection = db.collection(NOTES_COLLECTION);

    if (action === 'addNote') {
      if (!noteContent?.trim()) {
        return NextResponse.json({ success: false, error: 'Note content required' }, { status: 400 });
      }

      const newNote = { content: noteContent.trim(), createdAt: new Date(), updatedAt: new Date() };
      const result = await notesCollection.insertOne(newNote);
      return NextResponse.json({ success: true, note: await notesCollection.findOne({ _id: result.insertedId }) });
    }

    if (action === 'updateNote') {
      if (!ObjectId.isValid(noteId)) {
        return NextResponse.json({ success: false, error: 'Invalid note ID' }, { status: 400 });
      }
      if (!noteContent?.trim()) {
        return NextResponse.json({ success: false, error: 'Note content required' }, { status: 400 });
      }

      await notesCollection.updateOne(
        { _id: new ObjectId(noteId) },
        { $set: { content: noteContent.trim(), updatedAt: new Date() } }
      );
      return NextResponse.json({ success: true, note: await notesCollection.findOne({ _id: new ObjectId(noteId) }) });
    }

    if (action === 'deleteNote') {
      if (!ObjectId.isValid(noteId)) {
        return NextResponse.json({ success: false, error: 'Invalid note ID' }, { status: 400 });
      }
      await notesCollection.deleteOne({ _id: new ObjectId(noteId) });
      return NextResponse.json({ success: true, message: 'Note deleted' });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('POST /api/admin error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error', details: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const client = await connectToDatabase();
    const db = client.db(DB_NAME);
    const url = new URL(request.url);
    const type = url.searchParams.get('type'); // e.g., ?type=notes

    if (type === 'notes') {
      const notes = await db.collection(NOTES_COLLECTION).find({}).sort({ updatedAt: -1 }).toArray();
      return NextResponse.json({ success: true, notes, count: notes.length });
    }

    // Default: return users
    const users = await db.collection(USERS_COLLECTION).find({}).sort({ points: -1, name: 1 }).toArray();
    return NextResponse.json({ success: true, users, count: users.length });
  } catch (error) {
    console.error('GET /api/admin error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch data', details: error.message }, { status: 500 });
  }
}
