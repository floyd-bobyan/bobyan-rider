import { NextResponse } from "next/server";
import { loginRider } from "../../../lib/script-connect/login";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    const id = String(body?.id ?? "").trim();
    const password = String(body?.password ?? "");

    if (!id || !password) {
      return NextResponse.json(
        { error: "ID and password are required" },
        { status: 400 }
      );
    }
    if (id.length > 30 || password.length > 100) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const result = await loginRider(id, password);
    if (!result.success || !result.driver) {
      return NextResponse.json(
        { error: result.message || "Invalid ID or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({ driver: result.driver });
  } catch (e) {
    console.log(e);
    
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}