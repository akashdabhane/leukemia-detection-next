import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import connectToDatabase from "@/lib/mongodb";
import Conversation from "@/models/Conversation";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const conversations = await Conversation.find({
      userId: (session.user as any).id,
    })
      .sort({ updatedAt: -1 })
      .select("title provider createdAt updatedAt")
      .lean();

    return NextResponse.json({ conversations });
  } catch (error) {
    console.error("GET /api/conversations error:", error);
    return NextResponse.json(
      { error: "Failed to load conversations" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { conversationId, provider, userMessage, botMessage, title } =
      await req.json();

    if (!provider || !userMessage || !botMessage) {
      return NextResponse.json(
        { error: "provider, userMessage and botMessage are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const titleToUse =
      title ||
      (typeof userMessage === "string"
        ? userMessage.length > 60
          ? userMessage.slice(0, 57) + "..."
          : userMessage
        : "New chat");

    const messagesToAdd = [
      { role: "user", content: userMessage },
      { role: "bot", content: botMessage },
    ];

    let conversation;

    if (conversationId) {
      conversation = await Conversation.findOneAndUpdate(
        { _id: conversationId, userId },
        {
          $push: { messages: { $each: messagesToAdd } },
        },
        { new: true }
      );
    }

    if (!conversation) {
      conversation = await Conversation.create({
        userId,
        title: titleToUse,
        provider,
        messages: messagesToAdd,
      });
    }

    return NextResponse.json({
      conversation: {
        _id: conversation._id,
        title: conversation.title,
        provider: conversation.provider,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      },
    });
  } catch (error) {
    console.error("POST /api/conversations error:", error);
    return NextResponse.json(
      { error: "Failed to save conversation" },
      { status: 500 }
    );
  }
}
