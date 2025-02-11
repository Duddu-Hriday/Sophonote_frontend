import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./SupabaseClient";
// Initialize Supabase client


function TranscriptionsPage() {
  const [transcriptions, setTranscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserId();
  }, []);

  const fetchUserId = async () =>{
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const userEmail = user?.email;
    console.log("UserEmail: ",userEmail);
    if(!userEmail)
    {
      console.log("No User email found in localStorage");
      setLoading(false);
      return;
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", userEmail)
      .single();

    if (userError) {
      console.error("Error fetching user ID:", userError);
      setLoading(false);
      return;
    }

    setUserId(userData.user_id);
    console.log("userData = ",userData);
    fetchTranscriptions(userData.user_id);

  };

  const fetchTranscriptions = async (userId) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("transcriptions")
      .select("transcription_id, text, created_at")
      .eq("user_id",userId)
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {transcriptions.map((item, index) => {
    const formattedDate = new Date(item.created_at).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      // hour12: false,
      timeZone: "IST",
    }) + " IST";
    return (
    <div key={index} className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Transcription {index + 1}</h3>
      <p className="text-gray-700 mt-2">📝 {item.text}</p>
      <p className="text-sm text-gray-500 mt-1">Date: {formattedDate}</p>
    </div>
  )})}
</div>
        ) : (
          <p className="text-gray-500 mt-2">No transcriptions found.</p>
        )}
      </div>
    </div>
  );
}

export default TranscriptionsPage;
