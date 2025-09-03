// app/api/admin/route.js
import { NextResponse } from "next/server";
import { addUser, addPoints, getUsers } from "../../../services/leaderboardService.js";
import { addNote, updateNote, deleteNote, getNotes } from "../../../services/noteService.js";

export async function POST(req) {
  try {
    const { action, ...payload } = await req.json();

    if (action === "addUser") return NextResponse.json({ success: true, user: await addUser(payload.name) });
    if (action === "addPoints") return NextResponse.json({ success: true, user: await addPoints(payload.userId, payload.points) });
    if (action === "addNote") return NextResponse.json({ success: true, note: await addNote(payload.noteContent) });
    if (action === "updateNote") return NextResponse.json({ success: true, note: await updateNote(payload.noteId, payload.noteContent) });
    if (action === "deleteNote") return NextResponse.json({ success: true, deleted: await deleteNote(payload.noteId) });

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function GET(req) {
  const type = new URL(req.url).searchParams.get("type");
  if (type === "notes") return NextResponse.json({ success: true, notes: await getNotes() });
  return NextResponse.json({ success: true, users: await getUsers() });
}
