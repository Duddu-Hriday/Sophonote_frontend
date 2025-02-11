import { useState,useEffect } from "react";
import { Mail, Lock, User } from "lucide-react";
import { supabase } from "./SupabaseClient";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
function LoginCard() {

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {

      const { data: users, error: checkError } = await supabase
        .from("users")
        .select("email,password")
        .eq("email", formData.email);

      if (checkError) throw checkError;

      if (users.length === 0) {
        setMessage("Invalid email or password.");
        setLoading(false);
        return;
      }

      const user = users[0];
      const passwordMatch = await bcrypt.compare(formData.password, user.password);
      if (!passwordMatch) {
        setMessage("Invalid email or password.");
        setLoading(false);
        return;
      }
      localStorage.setItem("user", JSON.stringify({ email: user.email }));
      alert("Login successful! 🎉");
      navigate("/");
      window.location.reload();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error("Login Error:", error);
    }

    setLoading(false);

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 p-6 shadow-lg rounded-2xl bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {message && <p className="text-red-500 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginCard;