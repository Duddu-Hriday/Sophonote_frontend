import { useState,useEffect } from "react";
import { Mail, Lock, User } from "lucide-react";
import { supabase } from "./SupabaseClient";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

export default function SignupCard() {

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

      const { data: existingUsers, error: checkError } = await supabase
        .from("users")
        .select("email")
        .eq("email", formData.email);

      if (checkError) throw checkError;

      if (existingUsers.length > 0) {
        alert("Email already exists! Redirecting to login...");
        navigate("/login");
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(formData.password, salt);

      const { data, error } = await supabase
        .from("users")
        .insert([{ name: formData.name, email: formData.email, password: hashedPassword }]).select();

      if (error) throw error;
      localStorage.setItem("user", JSON.stringify({ email: formData.email }));
      alert("Signup successful! 🎉");
      navigate("/");
      window.location.reload();
      setMessage("Signup successful!");
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.log("Signup Error: ", error);
    }

    setLoading(false);

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 p-6 shadow-lg rounded-2xl bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
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
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
