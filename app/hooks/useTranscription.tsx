import { useTranscriptionStore } from "../store/transcriptionStore";

export function useTranscription() {
  const { result, loading, setResult, setLoading } = useTranscriptionStore();

  const transcribe = async (file: File | null) => {
    if (!file) return;

    setLoading(true);

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/transcript", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    setResult(data.text);
    setLoading(false);
  };

  return { result, loading, transcribe };
}