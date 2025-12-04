"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { File, CloudUpload } from "lucide-react";
import { useTranscriptionStore } from "../store/transcriptionStore";


export default function Upload(){
    const [file, setFile] = useState<File | null>(null);
    const {result, transcribe, loading} = useTranscriptionStore()

    const router = useRouter();
        useEffect(() => {
            if(result && result.length > 0){
                router.push("/editor");
            }
        }, [result, router]);

    return(
        <div className="w-6/7 h-full flex">
              <div className="w-full h-full flex flex-col items-center">
                <div className="h-full w-4/5 p-10 bg-white dark:bg-gray-800  shadow-2xl/40 rounded-xl flex flex-col justify-center items-center">
                    <div className=" p-4">
                        <input
                            type="file"
                            id="input-file-upload"
                            style={{ display: 'none' }}
                            accept="audio/*"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                            <label
                            htmlFor="input-file-upload"
                            className="flex flex-col justify-center items-center gap-2"
                            onDrop={(e) => {
                            e.preventDefault();
                            if(e.dataTransfer.files && e.dataTransfer.files[0]) {
                                setFile(e.dataTransfer.files[0]);
                            }
                            
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        >
                            <button
                            type="button"
                            className='mt-4 flex flex-col justify-center items-center gap-4 bg-linear-to-br from-indigo-500 to-blue-500 text-white p-6 rounded-lg'
                            onClick={() => document.getElementById("input-file-upload")?.click()}
                            >
                            <CloudUpload className="h-14 w-14"/>
                            </button>
                            <div className="font-bold"> Select file or drop</div>
                            
                        </label>
                    </div>
                    <div className={`w-full h-1/3 border border-gray-200 rounded min-h-16 shadow-2xl/30 ${!file && "hidden"}`}>
                        <div className="flex justify-start items-center gap-4 p-2">
                            <div className="p-2 border-5 border-blue-500 rounded-full"><File /></div>
                            <div className="w-full h-full flex flex-col">
                                <p className="font-bold text-md pt-4">{file?.name}</p>
                                <p className="w-full flex justify-end text-xs text-gray-400">{file?.size}</p>
                            </div>
                        </div>
                    </div>
                </div>
        
                <div className="w-full h-full flex justify-center p-10">
                    <button className="w-2/3 bg-blue-600 p-5 rounded text-white" onClick={()=> {transcribe(file as File)}}>Upload file</button>
                </div>
                {loading && <div className="text-5xl" > Loading...</div>}
            </div>

        </div>
    )
}