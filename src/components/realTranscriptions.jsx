import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function TranscriptionCard() {
  const [transcriptions, setTranscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch transcriptions from Supabase
  const fetchTranscriptions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("transcriptions")
      .select("transcription_id, text") // Replace "text_column" with actual column names
      .order("transcription_id", { ascending: false }); // Order by latest first

    if (error) {
      console.error("❌ Error fetching transcriptions:", error);
    } else {
      setTranscriptions(data || []);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <button
        onClick={fetchTranscriptions}
        className="px-5 py-2 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-purple-100 hover:scale-105 transition-transform duration-300"
      >
        {loading ? "Loading..." : "Show Previous Transcriptions"}
      </button>

      {/* Display transcriptions */}
      <div className="mt-4 w-3/4">
        {transcriptions.length > 0 ? (
          <ul className="bg-white shadow-md rounded-lg p-4">
          {transcriptions.map((item) => (
            <li key={item.transcription_id} className="p-2 border-b last:border-none">
              📝 {item.text} {/* Ensure "text" matches your column name in Supabase */}
            </li>
          ))}
        </ul>
        
        ) : (
          !loading && <p className="text-gray-500 mt-2">Click here to view Transcriptions.</p>
        )}
      </div>
    </div>
  );
}

export default TranscriptionCard;
