import { create } from "zustand";
import { persist } from "zustand/middleware";
import { JSONContent } from "@tiptap/react";


type TranscriptionState = {
  result: string;
  content:JSONContent;
  loading: boolean;
  setResult: (text: string) => void;
  setLoading: (state: boolean) => void;
  setContent:(content:JSONContent) => void;
  transcribe:(file:File) => void;
  clear: () => void;
};

export const useTranscriptionStore = create<TranscriptionState>()(
  persist(
    (set) => ({
      result: "",
      content: {
        type: "doc",
        content: []
      },
      loading: false,
      setResult: (text) => set({ result: text }),
      setLoading: (state) => set({ loading: state }),
      setContent:(content) => set({ content: content}),
      clear: () => set({ result: "", loading: false }),
      transcribe: async (file: File | null) => {
        if (!file) return;
      
        set({ loading: true });
      
        const form = new FormData();
        form.append("file", file);
      
        try {
          const res = await fetch("/api/transcript", {
            method: "POST",
            body: form,
          });
      
          const data = await res.json();
      
          set({ 
            result: data.text,
            loading: false,
            content: {
              type: "doc",
              content: [
                { type: "paragraph", content: [{
                  type: "text",
                  text: data.text
                }] }
              ]
            }
          });
      
        } catch (e) {
          console.error("Error: ", e);
          set({ loading: false });
        }
      },
    }),
    {
      name: "guest-transcription",
      partialize: (state) => ({ result: state.result, content:state.content }), 
    }
  )
);