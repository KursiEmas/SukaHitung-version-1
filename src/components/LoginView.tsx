import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, Sparkles, UserCheck } from "lucide-react";
import { User } from "../types";

interface LoginViewProps {
  onLoginSuccess: (user: User) => void;
  onNavigateToRegister: () => void;
}

export default function LoginView({ onLoginSuccess, onNavigateToRegister }: LoginViewProps) {
  const [email, setEmail] = useState("nama@email.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email atau Nomor HP harus diisi!");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter!");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        fullName: "Jayadi Sukses",
        businessName: "Kopi Maju Jaya",
        emailOrPhone: email,
        isLoggedIn: true,
      });
    }, 800);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({
        fullName: "Jayadi Sukses",
        businessName: "Kopi Maju Jaya",
        emailOrPhone: "jayadi@gmail.com",
        isLoggedIn: true,
      });
    }, 600);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-[#f8f9ff] to-[#eff4ff] p-5">
      {/* Background Ambience */}
      <div className="absolute top-[10%] right-[15%] w-72 h-72 rounded-full bg-[#6df5e1]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-80 h-80 rounded-full bg-[#007952]/5 blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <span className="text-2xl font-extrabold tracking-widest text-[#0F766E] block mb-1">
          SUKAHITUNG
        </span>
      </motion.div>

      {/* Login Card matching Screen 2 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm bg-white/80 rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur-md border border-white/60"
      >
        <h2 className="text-2xl font-bold text-[#0b1c30] mb-2">
          Selamat Datang Kembali
        </h2>
        <p className="text-sm text-[#5a6b68] mb-6">
          Masuk ke akun Anda untuk mengelola keuangan bisnis.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email / Nomor HP Input */}
          <div>
            <label className="block text-xs font-semibold text-[#0b1c30] mb-1.5 uppercase tracking-wider">
              Email / Nomor HP
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6e7977]">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-10 pr-4 py-3 bg-[#f0f4f8] focus:bg-white text-sm text-[#0b1c30] rounded-xl border border-transparent focus:border-[#0F766E] focus:outline-none transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-[#0b1c30] uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => alert("Simulasi: Link reset password telah dikirim ke email Anda.")}
                className="text-xs font-medium text-[#0F766E] hover:underline"
              >
                Lupa Password?
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6e7977]">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="........"
                className="w-full pl-10 pr-10 py-3 bg-[#f0f4f8] focus:bg-white text-sm text-[#0b1c30] rounded-xl border border-transparent focus:border-[#0F766E] focus:outline-none transition-all duration-200 tracking-widest font-mono"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6e7977] hover:text-[#0b1c30]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#006b5f] to-[#0F766E] hover:from-[#0f766e] hover:to-[#005e3f] disabled:from-[#6e7977] disabled:to-[#bdc9c6] text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none active:scale-[0.98] mt-2 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Masuk</span>
            )}
          </button>
        </form>

        {/* Separator Matching Screen 2 */}
        <div className="relative flex py-4 items-center">
          <div className="flex-grow border-t border-gray-100"></div>
          <span className="flex-shrink mx-3 text-xs text-[#6e7977] font-medium uppercase tracking-wider">
            atau masuk dengan
          </span>
          <div className="flex-grow border-t border-gray-100"></div>
        </div>

        {/* Google Mock Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-[#0b1c30] font-medium text-xs rounded-xl shadow-sm transition-all duration-150 flex items-center justify-center space-x-2 active:scale-[0.98]"
        >
          {/* Flat stylized Google G logo */}
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.57 15.02 1 12 1 7.37 1 3.42 3.66 1.5 7.57l3.8 2.95C6.22 7.74 8.87 5.04 12 5.04z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.38-4.88 3.38-8.5z"
            />
            <path
              fill="#FBBC05"
              d="M5.3 14.78c-.24-.71-.38-1.47-.38-2.26s.14-1.55.38-2.26L1.5 7.31C.54 9.17 0 11.27 0 13.52s.54 4.35 1.5 6.21l3.8-2.95z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.66-2.84c-1.1.74-2.51 1.18-4.3 1.18-3.13 0-5.78-2.7-6.7-5.48L1.5 15.9C3.42 19.81 7.37 23 12 23z"
            />
          </svg>
          <span className="font-semibold">Google</span>
        </button>
      </motion.div>

      {/* Link to Register */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-sm text-[#0b1c30] font-medium"
      >
        Belum punya akun?{" "}
        <button
          onClick={onNavigateToRegister}
          className="text-[#0F766E] font-bold hover:underline"
        >
          Daftar Sekarang
        </button>
      </motion.div>
    </div>
  );
}
