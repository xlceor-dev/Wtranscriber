"use client";
import { useTranscriptionStore } from "../store/transcriptionStore";
import Editor from "../components/editor";


export default function Page() {
  const { content, setContent } = useTranscriptionStore();


    return(
        <div className="w-full h-full min-h-[88dvh] flex justify-center items-center text-2xl text-black">
            <div className="w-4/5 h-4/5 flex">
                
            <Editor value={content} onChange={setContent} />
            </div>
        </div>
    )
}