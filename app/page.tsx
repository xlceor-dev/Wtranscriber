"use client";

import { METHODS } from "http";
import { useState } from "react";

//import Image from "next/image";

export default function Home() {
  const [output, setOutput] = useState("");
  const [audio, setAudio] = useState("/test.mp3");

  async function callChat() {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Hola desde el cliente" }],
        }),
      });

      const data = await response.json();
      console.log("Respuesta:", data.reply);
      setOutput(data.reply)

    } catch(e){
      console.error("Error llamando al backend:", e);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black ">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-gray-900">
        <div className="w-full h-full flex justify-center items-center">
          <button className="w-1/4 bg-blue-600 p-5 rounded" onClick={callChat}>Upload file</button>
        </div>
        <div className="w-full h-full min-h-[45dvh] flex bg-indigo-900 rounded p-10">Output: {output}</div>
      </main>
    </div>
  );
}
