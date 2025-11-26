"use client";

import { useState } from "react";

//import Image from "next/image";

export default function Home() {
  const [output, setOutput] = useState("");
  const [audio, setAudio] = useState("/test.mp3");

  async function callApi() {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "Hola" }],
      }),
    });
  
    const data = await response.json();
    setOutput(data.choices[0].message.content);
    console.log(data);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-gray-900">
        <div className="w-full h-full flex justify-center items-center">
          <button className="w-1/4 bg-blue-600 p-5 rounded" onClick={callApi}>Upload file</button>
        </div>
        <div className="w-full h-full min-h-[45dvh] flex bg-indigo-900 rounded p-10">Output: {output}</div>
      </main>
    </div>
  );
}
