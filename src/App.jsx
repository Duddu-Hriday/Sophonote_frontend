import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LiveRecordCard from "./components/LiveRecordCard";
import UploadFileCard from "./components/UploadFileCard";
import Reload from "./components/Reload";
import TranscriptionCard from "./components/TranscriptionCard";
import TranscriptionsPage from "./components/TranscriptionsPage"; // Import new page
import "./App.css";

function Home() {
  return (
    <main className="p-8 flex flex-col md:flex-row justify-center items-center gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        <LiveRecordCard />
        <UploadFileCard />
        <TranscriptionCard />
      </div>
    </main>
  );
}



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transcriptions" element={<TranscriptionsPage />} />
      </Routes>
      <Reload />
    </Router>
  );
}

export default App;
