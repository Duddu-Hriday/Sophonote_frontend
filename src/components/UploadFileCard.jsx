// import React from "react";
import { UploadCloud } from "lucide-react"; // Using an icon for aesthetics
import React, { useState, useRef } from "react"

function UploadFileCard() {
  const fileInputRef = useRef(null);
  const [audioURL, setAudioURL] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [transcriptionDone, setTranscriptionDone] = useState(false);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (event) => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Login/Signup is required");
      event.target.value = "";
      return;
    }
    const file = event.target.files[0];

    if (file) {
      if (file.type !== "audio/mpeg") {
        alert("File is not mp3");
        return;
      }

      if (file.size > 1 * 1024 * 1024) { // 1 MB = 1024 * 1024 bytes
        alert("File size exceeds 1 MB");
        return;
      }

      setSelectedFile(file);
      setUploadedFile(true);
      setAudioURL(URL.createObjectURL(file))
      console.log(file.name);
    }

  }

  const handleUpload = async () => {

    if (!selectedFile) return;
    setIsUploading(true);
    const formData = new FormData();

    formData.append("audio", selectedFile);
    const user = localStorage.getItem("user");
    if (user) {
      formData.append("user", user);
    } else {
      alert("User not found. Please login/signup.");
      setIsUploading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();
      setTranscription(data.transcript);
      setTranscriptionDone(true);
      // alert(data.transcript);
      console.log("Transcription = " + data.transcript);
    }

    catch (error) {
      console.error("Error: '", error);
    }

    finally {
      setIsUploading(false);
    }
  }


  return (

    <div className="bg-white p-6 rounded-2xl shadow-lg text-center transition hover:shadow-xl hover:scale-105 duration-300">
      <UploadCloud size={40} className="text-purple-600 mx-auto mb-3" />
      <h2 className="text-xl font-bold text-gray-800">Upload Audio File</h2>
      <p className="text-gray-600">Upload an audio file [MP3 Only for now] and get an instant transcription.</p>
      <input type="file" accept="audio/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
      {!uploadedFile && (
        <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition" onClick={handleButtonClick}>
          Upload File
        </button>)
      }

      {selectedFile && (
        <div className="mt-4">
          <h3 className="text-gray-700 font-semibold">Recorded Audio:</h3>
          <audio controls className="mt-2 w-full">
            <source src={audioURL} type="audio/wav" />
            Your browser does not support audio playback.
          </audio>
        </div>
      )}

      {
        !transcriptionDone && uploadedFile &&
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

export default UploadFileCard;
