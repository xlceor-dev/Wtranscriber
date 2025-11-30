"use client";

import { usePathname, useRouter } from "next/navigation"
import { useTranscription } from "../hooks/useTranscription";

export default function Header(){
  const path = usePathname()
  const router = useRouter()
  const { clear } = useTranscription()

  const handleBack = () => {
    clear();
    router.push("/");
  }

    return(
    <div className="h-20 w-full flex dark:bg-gray-950 dark:border-b border-zinc-600 bg-white shadow-xl/5 items-center p-5 fixed top-0 left-0">
        <p className=" font-bold bg-linear-to-br from-fuchsia-600 to-blue-500 to-50%  bg-clip-text text-transparent text-4xl m-5">WTranscriber</p>
        {path == "/editor" && <button onClick={handleBack} className="p-2 bg-indigo-500 text-white flex justify-center items-center w-20 rounded font-bold"> back</button>}
      </div>
    )
}