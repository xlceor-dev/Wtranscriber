"use client";
import { useTranscriptionStore } from "../store/transcriptionStore";

export default function Editor() {
  const result = useTranscriptionStore((s) => s.result);

    return(
        <div className="text-2xl text-black">
      {result || "No hay transcripción disponible"}
        </div>
    )
}