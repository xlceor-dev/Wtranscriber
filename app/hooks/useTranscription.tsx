// import { useTranscriptionStore } from "../store/transcriptionStore";
// import { useState} from "react";
// import { JSONContent } from "@tiptap/react";

// export function useTranscription() {
//   const { result, content, loading, setResult, setLoading, setContent, clear } = useTranscriptionStore();


//   const transcribe = async (file: File | null) => {
//     console.log("Transcribe function called")
//     if (!file) return;

//     setLoading(true);

//     const form = new FormData();
//     form.append("file", file);
//     console.log("Calling api")

//     try{
//       const res = await fetch("/api/transcript", {
//         method: "POST",
//         body: form,
//       });
  
//       const data = await res.json();
  
//       setResult(data.text);
//       setLoading(false);
//       setContent({ 
//         type: "doc", 
//         content: [ { type: "paragraph", content: [{ text: data.text }] } ] 
//       });
//     } catch(e){
//       console.error("error: ", e)
//     }
//   };

//   const onChange = (json: JSONContent) => setContent(json)

  

//   return { result, content, loading, onChange, transcribe, clear };
// }