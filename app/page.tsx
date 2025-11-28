"use client";
import { useState } from "react";
import HeroSection from "./components/heroSection";
import Header from "./components/header";
import Upload from "./components/upload";

//import Image from "next/image";

export default function Home() {
  const [output, setOutput] = useState("");
  const [file, setFile] = useState<File | null>(null);


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
  
  async function callTranscript() {
    if (!file) {
      alert("No file selected");
      return;
    }

    const form = new FormData();
    form.append("file", file);

    const response = await fetch("/api/transcript", {
      method: "POST",
      body: form,
    });

    const data = await response.json();
    console.log("Response: ", data);

    if (data.error) {
      setOutput("Error: " + data.error);
    } else {
      setOutput(data.text);
    }
  }
  // function frst() {
  //   return(
  //     <div className="flex flex-col w-full h-full">
  // <div className="w-full h-full flex justify-center items-center">
  //   <input
  //       type="file"
  //       id="input-file-upload"
  //       style={{ display: 'none' }}
  //       accept="audio/*"
  //       onChange={(e) => setFile(e.target.files[0])}
  //     />
  //       <label
  //       htmlFor="input-file-upload"
  //       className={`file-upload flex flex-col justify-center items-center p-4 transition-colors duration-300 `}
  //       onDrop={(e) => {
  //         e.preventDefault();
  //         if(e.dataTransfer.files && e.dataTransfer.files[0]) {
  //             setFile(e.dataTransfer.files[0]);
  //         }
  //     }}
  //     >
  //       <button 
  //           type="button" 
  //           className='mt-4 bg-indigo-500 text-white py-2 px-4 rounded-lg'
  //         >
  //           Seleccionar Archivo
  //           {file && <p>Archivo seleccionado: {file.name}</p>}
  //         </button>
          
  //     </label>
  
  
  //     <button className="w-1/4 bg-blue-600 p-5 rounded" onClick={callTranscript}>Upload file</button>
  // </div>
  //       <div className="w-full h-full min-h-[45dvh] flex bg-indigo-900 rounded p-10">Output: {output}</div>

  //     </div>

  //   )
  // }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center font-sans dark:bg-black ">
      <Header />
      <div className="flex min-h-screen w-full items-center justify-between py-32 px-16">
        <HeroSection />
        <Upload file={file} setFile={setFile} callTranscript={callTranscript}/>
      </div>
    </div>
  );
}
