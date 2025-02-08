import React from "react";
import Navbar from "./components/Navbar";
import LiveRecordCard from "./components/LiveRecordCard";
import UploadFileCard from "./components/UploadFileCard";
import './App.css'
import Reload from "./components/Reload";
function App() {
  return (
    <div>
      <Navbar />
      <main className="p-8 flex flex-col md:flex-row justify-center items-center gap-6">
        <LiveRecordCard />
        <UploadFileCard />
      </main>
      <Reload/>
    </div>
  );
}

export default App;
