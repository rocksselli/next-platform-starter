import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch response from OpenAI." },
      { status: 500 }
    );
  }
}
