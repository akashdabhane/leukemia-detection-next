import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import Prescription from "@/models/Prescription";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const prescriptions = await Prescription.find({
      userId: (session.user as any).id,
    })
      .sort({ createdAt: -1 })
      .select("createdAt updatedAt input.resultTitle")
      .lean();

    return NextResponse.json({ prescriptions });
  } catch (error) {
    console.error("GET /api/prescriptions error:", error);
    return NextResponse.json(
      { error: "Failed to load prescriptions" },
      { status: 500 }
    );
  }
}
