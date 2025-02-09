import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react"; // Import an icon

function TranscriptionCard() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
        {/* Icon at the top */}
        <FileText className="mx-auto text-purple-600 w-12 h-12" />

        <h2 className="text-lg font-semibold text-purple-600 mt-2">
          Transcriptions
        </h2>
        <p className="text-gray-500 mt-2">
          View your previous transcriptions.
        </p>
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
