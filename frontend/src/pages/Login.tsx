import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const role = await login(email, password);
      if (role === "STUDENT") navigate("/student-dashboard");
      else if (role === "TEACHER") navigate("/my-courses");
      else navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-300 overflow-hidden">

      {/* Card wrapper */}
      <div className="flex w-[1300px] h-[720px] rounded-3xl overflow-hidden shadow-2xl">

        {/* Left — white form panel */}
        <div className="relative flex w-1/2 flex-col items-center justify-center bg-white px-14">

          {/* Purple corner blobs */}
          <div className="absolute top-0 left-0 h-20 w-20 rounded-br-full bg-violet-600" />
          <div className="absolute bottom-0 left-0 h-20 w-20 rounded-tr-full bg-violet-600" />

          {/* Paper plane icon */}
          <div className="absolute top-16 right-16">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h1 className="mb-10 text-5xl font-bold text-gray-800">Login</h1>

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-full bg-gray-100 px-7 py-4 text-base text-gray-700 outline-none focus:ring-2 focus:ring-violet-300 transition placeholder:text-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-full bg-gray-100 px-7 py-4 text-base text-gray-700 outline-none focus:ring-2 focus:ring-violet-300 transition placeholder:text-gray-400"
            />

            <div className="text-right">
              <span className="text-sm text-gray-400 cursor-pointer hover:text-violet-600">Forget Password ?</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-violet-600 py-4 text-base font-semibold text-white hover:bg-violet-700 transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-400">
            Don't have an account ?{" "}
            <Link to="/register" className="font-semibold text-violet-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right — purple panel */}
        <div className="relative flex w-1/2 flex-col items-center justify-center bg-violet-600 overflow-hidden">

          {/* White corner blobs */}
          <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-white/20" />
          <div className="absolute bottom-0 right-0 h-20 w-20 rounded-tl-full bg-white/20" />

          {/* Dashed arc line */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 520" fill="none">
            <path
              d="M 60 80 Q 300 200 340 460"
              stroke="white"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              opacity="0.4"
            />
          </svg>

          {/* 3D student illustration */}
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/student-reading-book-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--girl-study-education-pack-illustrations-4645988.png"
            alt="Student reading"
            className="relative z-10 w-96 drop-shadow-2xl"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://cdni.iconscout.com/illustration/premium/thumb/student-studying-illustration-download-in-svg-png-gif-file-formats--girl-reading-book-education-pack-illustrations-4897198.png";
            }}
          />
        </div>

      </div>
    </div>
  );
}
