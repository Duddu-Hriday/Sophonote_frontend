import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function TranscriptionsPage() {
  const [transcriptions, setTranscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTranscriptions();
  }, []);

  const fetchTranscriptions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("transcriptions")
      .select("transcription_id, text")
      .order("transcription_id", { ascending: false });

    if (error) {
      console.error("Error fetching transcriptions:", error);
    } else {
      setTranscriptions(data || []);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <button
        onClick={() => navigate("/")}
        className="px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-transform duration-300 mb-4"
      >
        ⬅ Back to Home
      </button>

      <h2 className="text-xl font-semibold text-purple-600">Previous Transcriptions</h2>

      <div className="mt-4 w-3/4">
        {loading ? (
          <p className="text-gray-500 mt-2">Loading...</p>
        ) : transcriptions.length > 0 ? (
          <ul className="bg-white shadow-md rounded-lg p-4">
            {transcriptions.map((item) => (
              <li key={item.transcription_id} className="p-2 border-b last:border-none">
                📝 {item.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No transcriptions found.</p>
        )}
      </div>
    </div>
  );
}

export default TranscriptionsPage;
