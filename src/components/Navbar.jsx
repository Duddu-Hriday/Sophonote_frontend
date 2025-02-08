import React from "react";

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between items-center shadow-xl transition-all duration-300">
      <div className="flex items-center">
        <img src="/logo.png" alt="Website Logo" className="h-10 w-10 mr-2 drop-shadow-lg" />
        <h1 className="text-white text-2xl font-extrabold tracking-wide">SpeechSyncEaze</h1>
      </div>
      <div className="space-x-3">
        <button className="px-5 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform duration-300">
          Login
        </button>
        <button className="px-5 py-2 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-purple-100 hover:scale-105 transition-transform duration-300">
          Sign Up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
