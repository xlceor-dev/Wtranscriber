import { create } from "zustand";
import { persist } from "zustand/middleware";

type TranscriptionState = {
  result: string;
  loading: boolean;
  setResult: (text: string) => void;
  setLoading: (state: boolean) => void;
  clear: () => void;
};

export const useTranscriptionStore = create<TranscriptionState>()(
  persist(
    (set) => ({
      result: "",
      loading: false,
      setResult: (text) => set({ result: text }),
      setLoading: (state) => set({ loading: state }),
      clear: () => set({ result: "", loading: false }),
    }),
    {
      name: "guest-transcription", // <— la clave en localStorage
      partialize: (state) => ({ result: state.result }), 
      // opcional: solo guardar "result" si no quiere guardar loading
    }
  )
);