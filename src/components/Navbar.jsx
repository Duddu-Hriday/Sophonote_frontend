import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
    window.location.reload();
  }
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex justify-between items-center shadow-xl transition-all duration-300">
      <div className="flex items-center">
        <img src="/logo.png" alt="Website Logo" className="h-10 w-10 mr-2 drop-shadow-lg" />
        <h1 className="text-white text-2xl font-extrabold tracking-wide">Sophonote</h1>
      </div>
      {
        user ? (<button
          onClick={handleLogout}
          className="px-5 py-2 bg-white text-red-600 font-semibold rounded-lg shadow-md hover:bg-red-100 hover:scale-105 transition-transform duration-300"
        >
          Logout
        </button>) : (
          <div className="space-x-3">
            <button onClick={() => navigate("/login")} className="px-5 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-100 hover:scale-105 transition-transform duration-300">
              Login
            </button>
            <button onClick={() => navigate("/signup")} className="px-5 py-2 bg-white text-purple-600 font-semibold rounded-lg shadow-md hover:bg-purple-100 hover:scale-105 transition-transform duration-300">
              Sign Up
            </button>
          </div>)
      }
    </nav>
  );
}

export default Navbar;
