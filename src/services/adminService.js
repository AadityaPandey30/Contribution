// services/noteService.js
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../lib/db.js";
import { NOTES_COLLECTION } from "../models/noteModel.js";

export async function addNote(content) {
  const { db } = await connectToDatabase();
  const notes = db.collection(NOTES_COLLECTION);

  const note = { content, createdAt: new Date(), updatedAt: new Date() };
  const result = await notes.insertOne(note);
  return await notes.findOne({ _id: result.insertedId });
}

export async function updateNote(noteId, content) {
  const { db } = await connectToDatabase();
  const notes = db.collection(NOTES_COLLECTION);

  await notes.updateOne({ _id: new ObjectId(noteId) }, { $set: { content, updatedAt: new Date() } });
  return await notes.findOne({ _id: new ObjectId(noteId) });
}

export async function deleteNote(noteId) {
  const { db } = await connectToDatabase();
  const notes = db.collection(NOTES_COLLECTION);
  await notes.deleteOne({ _id: new ObjectId(noteId) });
  return true;
}

export async function getNotes() {
  const { db } = await connectToDatabase();
  return db.collection(NOTES_COLLECTION).find({}).sort({ updatedAt: -1 }).toArray();
}
