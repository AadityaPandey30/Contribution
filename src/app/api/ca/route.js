// app/api/campus-ambassadors/route.js
import { NextResponse } from "next/server";
import { addAmbassador, getAmbassadors } from "../../../services/campusAmbassadorService.js";

export async function POST(req) {
  try {
    const { name, email } = await req.json();
    const ambassador = await addAmbassador(name, email);
    return NextResponse.json({ success: true, ambassador });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ success: true, ambassadors: await getAmbassadors() });
}
