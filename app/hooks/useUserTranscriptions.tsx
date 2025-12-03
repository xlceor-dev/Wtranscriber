
// import { useState } from "react";

// function useUserTranscriptions(userId: string) {
//     const [history, setHistory] = useState([]);
    
//     const fetchHistory = async () => {
//       const { data } = await supabase
//         .from("transcriptions")
//         .select("*")
//         .eq("user_id", userId)
//         .order("created_at", { ascending: false });
//       setHistory(data || []);
//     };
  
//     const saveTranscription = async (text: string) => {
//       await supabase.from("transcriptions").insert({ user_id: userId, text });
//       fetchHistory(); 
//     };
  
//     return { history, fetchHistory, saveTranscription };
//   }