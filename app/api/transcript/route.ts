import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("api called")
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    const api_key = process.env.OPENAI_API_KEY;
    if (!api_key) throw new Error("OpenAI API key not configured");

    const fd = new FormData();
    fd.append("model", "gpt-4o-transcribe");
    fd.append("file", file);

    console.log("Calling OpenAI")

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${api_key}`,
      },
      body: fd,
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) throw new Error(data.error?.message || "OpenAI error");

    return NextResponse.json({ text: data.text });

  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}