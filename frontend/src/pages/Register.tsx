import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<"ADMIN" | "STUDENT" | "">("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload =
        role === "ADMIN"
          ? { email, password }
          : {
              firstName,
              lastName,
              phoneNumber,
              gender,
              user: { email, password },
            };
      await register(payload, role as "ADMIN" | "STUDENT");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-full border border-gray-300 px-5 py-3.5 text-base outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition";
  const selectClass =
    "w-full rounded-full border border-gray-300 px-5 py-3.5 text-base outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition bg-white";

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left — Register Form */}
      <div className="flex w-full flex-col justify-center overflow-y-auto bg-white px-16 md:w-1/2 lg:px-24">
        <h1 className="mb-8 text-5xl font-bold text-green-500">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Role */}
          <div className="space-y-2">
            <label className="text-base font-medium text-gray-700">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "ADMIN" | "STUDENT")}
              required
              className={selectClass}
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {role !== "" && (
            <>
              {role === "STUDENT" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-base font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-base font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-base font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="8449984265"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-base font-medium text-gray-700">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                      className={selectClass}
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label className="text-base font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading || role === ""}
            className="w-full rounded-full bg-green-500 py-4 text-base font-semibold tracking-widest text-white transition hover:bg-green-600 disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-base text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-green-500 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>

      {/* Right — Blue Panel */}
      <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-indigo-700 md:flex md:w-1/2">
        {/* Decorative circles */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(14)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 border-white"
              style={{
                width: `${25 + ((i * 18) % 70)}px`,
                height: `${25 + ((i * 18) % 70)}px`,
                top: `${(i * 37) % 90}%`,
                left: `${(i * 53) % 90}%`,
                opacity: 0.4,
              }}
            />
          ))}
        </div>

        {/* OR badge */}
        <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-500 shadow-md z-10">
          OR
        </div>

        <div className="relative z-10 text-center px-12">
          <h2 className="text-4xl font-bold text-white leading-snug">
            Let's educate <span className="text-yellow-400">together</span>
          </h2>
          <p className="mt-3 text-base text-indigo-200">
            Create your account free
          </p>

          <div className="mt-10 space-y-4">
            <button className="flex w-full items-center justify-center gap-3 rounded-full bg-indigo-800 px-8 py-4 text-base font-medium text-white transition hover:bg-indigo-900">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">
                f
              </span>
              Sign in with facebook
            </button>
            <button className="flex w-full items-center justify-center gap-3 rounded-full bg-sky-400 px-8 py-4 text-base font-medium text-white transition hover:bg-sky-500">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-sm font-bold">
                𝕏
              </span>
              Sign in with twitter
            </button>
          </div>
        </div>

        {/* Monster illustration */}
        <div className="absolute bottom-0 flex items-end justify-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-green-500 shadow-xl">
            <div className="flex h-22 w-22 items-center justify-center rounded-full bg-green-400">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white">
                <div className="h-7 w-7 rounded-full bg-green-800" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
