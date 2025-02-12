// import React from "react";
import React, { useState, useRef } from "react";
import { Mic, StopCircle, Play } from "lucide-react"; // Using an icon for a better UI

function LiveRecordCard() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [recordingDone, setRecordingDone] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [transcription, setTranscription] = useState("");

  const mediaRecorderref = useRef(null);
  const audioChunksref = useRef([]);

  const startRecording = async () => {
    try {
      if (!localStorage.getItem("user")) {
        alert("Login/Signup is required");
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderref.current = mediaRecorder;
      mediaRecorder.ondataavailable = (event) => {
        audioChunksref.current.push(event.data);
      }

      mediaRecorder.onstop = () => {
        const audioblob = new Blob(audioChunksref.current, { type: "audio/webm" });
        setAudioBlob(audioblob);
        setAudioURL(URL.createObjectURL(audioblob));
        audioChunksref.current = [];
        setRecordingDone(true);
      }

      mediaRecorder.start();
      setIsRecording(true);
    }
    catch (e) {
      console.log(e);
    }
  }

  const stopRecording = async () => {
    try {
      if (mediaRecorderref.current) {
        mediaRecorderref.current.stop();
        setIsRecording(false);
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const handleUpload = async () => {
    if (!audioBlob) {
      console.error("Error: No audioBlob found!");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    const user = localStorage.getItem("user");
    if (user) {
      formData.append("user", user);
    } else {
      alert("User not found. Please login/signup.");
      setIsUploading(false);
      return;
    }

    const file = new File([audioBlob], "recording.webm", { type: "audio/webm" });
    // console.log("File Type =", file.type);
    formData.append("audio", file);

    try {
      const response = await fetch("https://sophonote-backend.vercel.app/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text(); // Capture server error message
        throw new Error(`File upload failed: ${errorText}`);
      }

      const data = await response.json();
      setTranscription(data.transcript);
      // alert(data.transcript);
      // console.log("Transcription =", data.transcript);
    } catch (error) {
      console.error("Upload Error:", error.message || error);
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg text-center transition hover:shadow-xl hover:scale-105 duration-300">
      <Mic size={40} className="text-blue-600 mx-auto mb-3" />
      <h2 className="text-xl font-bold text-gray-800">Live Audio Recording</h2>
      <p className="text-gray-600">Record your voice and transcribe in real-time.</p>

      <div className="flex justify-center items-center">
        {!recordingDone && !isRecording && (
          <button
            onClick={startRecording}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <Mic size={20} />
            Start Recording
          </button>
        )}

        {isRecording && (
          <button
            onClick={stopRecording}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2 relative"
          >
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            <StopCircle size={20} />
            Stop Recording
          </button>
        )}
      </div>

      {audioURL && (
        <div className="mt-4">
          <h3 className="text-gray-700 font-semibold">Recorded Audio:</h3>
          <audio controls className="mt-2 w-full">
            <source src={audioURL} type="audio/wav" />
            Your browser does not support audio playback.
          </audio>
        </div>
      )}

      {
        !transcription && recordingDone &&
        <div className="flex justify-center">
          <button onClick={handleUpload} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
            {isUploading ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span> : "Start Transcription"}
          </button>
        </div>
      }

      {
        transcription && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-gray-700 font-semibold">Transcription:</h3>
            <p className="text-gray-800 mt-2">{transcription}</p>
          </div>
        )
      }

    </div>
  );
}

export default LiveRecordCard;
