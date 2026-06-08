import React, { useState } from "react";
import { motion } from "motion/react";
import { User, Building, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { User as UserType } from "../types";

interface RegisterViewProps {
  onRegisterSuccess: (user: UserType) => void;
  onNavigateToLogin: () => void;
}

export default function RegisterView({ onRegisterSuccess, onNavigateToLogin }: RegisterViewProps) {
  const [fullName, setFullName] = useState("Sunghoon");
  const [businessName, setBusinessName] = useState("UMKM Maju Jaya");
  const [emailOrPhone, setEmailOrPhone] = useState("email@contoh.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) {
      setError("Nama Lengkap harus diisi!");
      return;
    }
    if (!businessName) {
      setError("Nama Bisnis harus diisi!");
      return;
    }
    if (!emailOrPhone) {
      setError("Email atau Nomor HP harus diisi!");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter!");
      return;
    }
    if (!agreeTerms) {
      setError("Anda harus menyetujui Syarat & Ketentuan!");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate signup
    setTimeout(() => {
      setLoading(false);
      onRegisterSuccess({
        fullName: fullName,
        businessName: businessName,
        emailOrPhone: emailOrPhone,
        isLoggedIn: true,
      });
    }, 850);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-[#f8f9ff] to-[#eff4ff] p-5">
      {/* Background Ambience */}
      <div className="absolute top-[10%] left-[10%] w-72 h-72 rounded-full bg-[#6df5e1]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-80 h-80 rounded-full bg-[#007952]/5 blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 text-center"
      >
        <span className="text-2xl font-extrabold tracking-widest text-[#0F766E] block mb-1">
          SUKAHITUNG
        </span>
      </motion.div>

      {/* Register Card matching Screen 3 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm bg-white/80 rounded-3xl p-6 shadow-xl backdrop-blur-md border border-white/60"
      >
        <h2 className="text-xl font-bold text-[#0b1c30] mb-1">
          Mulai Kelola Bisnis
        </h2>
        <p className="text-xs text-[#5a6b68] mb-5">
          Daftar akun baru SUKAHITUNG sekarang.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-xs font-semibold text-[#0b1c30] mb-1 uppercase tracking-wider">
              Nama Lengkap
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6e7977]">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Sunghoon"
                className="w-full pl-10 pr-4 py-2.5 bg-[#f0f4f8] focus:bg-white text-sm text-[#0b1c30] rounded-xl border border-transparent focus:border-[#0F766E] focus:outline-none transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Nama Bisnis */}
          <div>
            <label className="block text-xs font-semibold text-[#0b1c30] mb-1 uppercase tracking-wider">
              Nama Bisnis
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6e7977]">
                <Building className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="UMKM Maju Jaya"
                className="w-full pl-10 pr-4 py-2.5 bg-[#f0f4f8] focus:bg-white text-sm text-[#0b1c30] rounded-xl border border-transparent focus:border-[#0F766E] focus:outline-none transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Email / Nomor HP */}
          <div>
            <label className="block text-xs font-semibold text-[#0b1c30] mb-1 uppercase tracking-wider">
              Email / Nomor HP
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6e7977]">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="email@contoh.com atau 0812..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#f0f4f8] focus:bg-white text-sm text-[#0b1c30] rounded-xl border border-transparent focus:border-[#0F766E] focus:outline-none transition-all duration-200"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-[#0b1c30] mb-1 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6e7977]">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="........"
                className="w-full pl-10 pr-10 py-2.5 bg-[#f0f4f8] focus:bg-white text-sm text-[#0b1c30] rounded-xl border border-transparent focus:border-[#0F766E] focus:outline-none transition-all duration-200 tracking-widest font-mono"
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

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-2 pt-1">
            <input
              type="checkbox"
              id="agree-checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 text-[#0F766E] border-gray-300 rounded focus:ring-[#0F766E]"
            />
            <label htmlFor="agree-checkbox" className="text-xs text-[#5a6b68] select-none leading-snug">
              Saya setuju dengan <span className="text-[#0F766E] font-bold">Syarat & Ketentuan</span> yang berlaku di platform SUKAHITUNG.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0F766E] hover:bg-[#006a63] disabled:bg-[#6e7977] text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none active:scale-[0.98] mt-4 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="flex items-center space-x-1.5">
                <span>Daftar</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <p className="text-xs text-[#5a6b68]">
            Sudah punya akun?{" "}
            <button
              onClick={onNavigateToLogin}
              className="text-[#0F766E] font-bold hover:underline"
            >
              Masuk
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
