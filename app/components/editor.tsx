"use client";
import { useState } from "react";
export default function Editor({text}:{text:string}){
    const [Copied, setCopied] = useState(false);
    const [fileName, setFileName] = useState("result");
    
    const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          alert("Text copy to clipboard!")
          setTimeout(() => setCopied(false), 2000); 
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
    }

    const downloadTxtFile = () => {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
      
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a); // Append to body to ensure it's in the DOM
        a.click();
      
        document.body.removeChild(a); // Clean up
        URL.revokeObjectURL(url); // Release the object URL
      }

    return(
        <div className="flex flex-col w-full h-full text-black dark:text-white">
            <div className="flex justify-between p-10 items-center bg-gray-100 dark:bg-gray-800 h-14  border border-gray-300 dark:border-gray-700">
                <div className="">{fileName}</div>
                <div className="flex gap-5">
                    <button onClick={handleCopy} className=" p-2 bg-blue-500 text-white font-bold rounded">copy</button>
                    <button onClick={downloadTxtFile} className=" p-2 bg-blue-500 text-white font-bold rounded">download</button>
                </div>
            </div>
            <div className="w-full h-full flex justify-center items-center p-10 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                {text}
            </div>
        </div>
    )
}