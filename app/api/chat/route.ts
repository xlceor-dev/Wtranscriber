import { NextResponse } from "next/server";

export async function POST(req:Request) {
 try {
    const { messages } = await req.json()

    if (!messages || messages.length == 0) {
      return NextResponse.json({ error: "No promp recived" }, { status: 400 });
    }

    const api_key = process.env.NEXT_PUBLIC_OPENAI_KEY;
    if (!api_key) throw new Error("OpenAI API key not configured");


    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${api_key}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: messages,
        }),
      });
    
      const data = await response.json();
      console.log(data);
    
      if (!response.ok) throw new Error(data.error?.message || "Error on OpenAI");

    return NextResponse.json({ reply: data.choices?.[0]?.message?.content});


 } catch(e) {
    return NextResponse.json({ error: e}, {status:400});

 }


}