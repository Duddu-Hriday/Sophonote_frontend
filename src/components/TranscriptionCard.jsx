import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react"; // Import an icon

function TranscriptionCard() {
  const navigate = useNavigate();

  return (
    
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center transition hover:shadow-xl hover:scale-105 duration-300">
      <FileText className="mx-auto text-purple-600 w-12 h-12" />
      <h2 className="text-xl font-bold text-gray-800">
         Transcriptions
       </h2>
       <p className="text-gray-500 mt-2">
           View your previous transcriptions.
         </p>

      <div className="flex justify-center items-center">
      <button
          onClick={() => navigate("/transcriptions")}
          className="mt-4 px-5 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-transform duration-300"
        >
          Show Previous Transcriptions
        </button>
      </div>


    </div>
  );
}

export default TranscriptionCard;
