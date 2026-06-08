import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Bell, 
  TrendingUp, 
  TrendingDown, 
  Warehouse, 
  Zap, 
  Sparkles, 
  PieChart as PieIcon, 
  ArrowRight,
  TrendingUp as TrendUpIcon,
  HelpCircle,
  Play
} from "lucide-react";
import { Transaction, User } from "../types";

interface AnalitikViewProps {
  user: User;
  transactions: Transaction[];
}

type ModeType = "Minggu" | "Bulan" | "Tahun";

export default function AnalitikView({ user, transactions }: AnalitikViewProps) {
  const [activeTab, setActiveTab] = useState<ModeType>("Bulan");
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>("");

  // Stats data responsive to activeTab selection
  const tabData = {
    Minggu: {
      omzet: "Rp 21,3M",
      omzetTrend: "+14.2%",
      pengeluaran: "Rp 7,8M",
      pengeluaranTrend: "+3.1%",
      totalSpend: "Rp 7,8M",
      breakdown: [
        { name: "Gaji", val: "Rp 3,5jt", pct: 45, color: "#0F766E" },
        { name: "Logistik", val: "Rp 1,9jt", pct: 25, color: "#14b8a6" },
        { name: "Iklan", val: "Rp 1,2jt", pct: 15, color: "#2dd4bf" },
        { name: "Lainnya", val: "Rp 1,2jt", pct: 15, color: "#cbd5e1" },
      ]
    },
    Bulan: {
      omzet: "Rp 84,2M",
      omzetTrend: "+12.5%",
      pengeluaran: "Rp 32,1M",
      pengeluaranTrend: "+4.2%",
      totalSpend: "Rp 32M",
      breakdown: [
        { name: "Gaji", val: "Rp 14,4jt", pct: 45, color: "#0F766E" },
        { name: "Logistik", val: "Rp 8,0jt", pct: 25, color: "#14b8a6" },
        { name: "Iklan", val: "Rp 4,8jt", pct: 15, color: "#2dd4bf" },
        { name: "Lainnya", val: "Rp 4,8jt", pct: 15, color: "#cbd5e1" },
      ]
    },
    Tahun: {
      omzet: "Rp 984,2M",
      omzetTrend: "+18.9%",
      pengeluaran: "Rp 412,6M",
      pengeluaranTrend: "+2.5%",
      totalSpend: "Rp 412M",
      breakdown: [
        { name: "Gaji", val: "Rp 185,4jt", pct: 45, color: "#0F766E" },
        { name: "Logistik", val: "Rp 103,1jt", pct: 25, color: "#14b8a6" },
        { name: "Iklan", val: "Rp 61,8jt", pct: 15, color: "#2dd4bf" },
        { name: "Lainnya", val: "Rp 61,8jt", pct: 15, color: "#cbd5e1" },
      ]
    },
  };

  const currentStats = tabData[activeTab];

  const handleFetchAiAnalysis = async () => {
    setLoadingAi(true);
    setAiResponse("");

    try {
      // Calculate real summary from state transactions
      const totalIn = transactions.filter(t => t.type === "in").reduce((sum, t) => sum + t.amount, 0);
      const totalOut = transactions.filter(t => t.type === "out").reduce((sum, t) => sum + t.amount, 0);
      const balance = totalIn - totalOut;

      const response = await fetch("/api/ai-analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: user.businessName,
          ownerName: user.fullName,
          transactions: transactions,
          summary: {
            totalIn,
            totalOut,
            balance
          }
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAiResponse(data.text);
      } else {
        setAiResponse("### ⚠️ Koneksi Gagal\n\nMaaf, sistem AI sedang sibuk. Silakan coba lagi nanti.");
      }
    } catch (e) {
      console.error(e);
      setAiResponse("### ⚠️ Kesalahan Jaringan\n\nMaaf terjadi masalah dalam menghubungi Server AI Analis SukaHitung.");
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header exactly like Screen 4 */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-100 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
            alt="Avatar"
            className="w-10 h-10 rounded-full border-2 border-[#0F766E]/20 object-cover"
          />
          <div>
            <h2 className="text-sm font-bold text-[#0b1c30]">
              Halo, {user.fullName.split(" ")[0]}!
            </h2>
            <p className="text-[10px] text-[#0F766E] font-bold">
              Grafik Wawasan Keuangan UMKM
            </p>
          </div>
        </div>

        <button className="relative p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition">
          <Bell className="w-5 h-5 text-[#0b1c30]" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
        </button>
      </header>

      {/* Controller segmented tabs precisely matching Screen 4 */}
      <div className="max-w-lg mx-auto w-full px-5 pt-4">
        <div className="flex bg-[#f1f5f9] p-1 rounded-full border border-gray-100 shadow-sm">
          {(["Minggu", "Bulan", "Tahun"] as ModeType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setAiResponse(""); // Clear previous answers
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-full transition-all duration-200 ${
                activeTab === tab
                  ? "bg-[#6df5e1] text-[#0b1c30] shadow-sm font-black"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-5 py-4 space-y-6 max-w-lg mx-auto w-full pb-24">
        {/* Omzet and Pengeluaran Cards Row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Omzet card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-gray-500 block tracking-wider uppercase">
              Omzet
            </span>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gray-900 leading-tight">
                {currentStats.omzet}
              </span>
              <span className="text-xs text-teal-600 font-extrabold flex items-center space-x-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5 inline shrink-0" />
                <span>{currentStats.omzetTrend}</span>
              </span>
            </div>
          </div>

          {/* Spend card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-gray-500 block tracking-wider uppercase">
              Pengeluaran
            </span>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-gray-900 leading-tight">
                {currentStats.pengeluaran}
              </span>
              <span className="text-xs text-[#ba1a1a] font-extrabold flex items-center space-x-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5 inline shrink-0" />
                <span>{currentStats.pengeluaranTrend}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Trend Bulanan Area Chart matching Screen 4 */}
        <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-[#0b1c30]">Trend Bulanan</h3>
              <p className="text-[10px] text-gray-400 font-semibold leading-none mt-1">
                Visualisasi Omzet vs Pengeluaran
              </p>
            </div>
            {/* Custom chart legend matches screen 4 */}
            <div className="flex space-x-3 text-[9px] font-bold">
              <span className="flex items-center space-x-1.5 text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E]" />
                <span>Sales</span>
              </span>
              <span className="flex items-center space-x-1.5 text-gray-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6df5e1]" />
                <span>Expense</span>
              </span>
            </div>
          </div>

          {/* Precise custom SVG bezier curves matching Screen 4 chart exactly */}
          <div className="w-full relative py-2 select-none h-40">
            <svg viewBox="0 0 400 160" className="w-full h-full">
              {/* Grid Lines */}
              <line x1="0" y1="120" x2="400" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="80" x2="400" y2="80" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="0" y1="40" x2="400" y2="40" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />

              {/* Expense Bezier (Gradient Fill) */}
              <defs>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6df5e1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#6df5e1" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0F766E" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0F766E" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Flow curves */}
              <path
                d="M 10 95 Q 85 105, 140 60 T 260 90 T 390 40 L 390 140 L 10 140 Z"
                fill="url(#salesGrad)"
              />
              <path
                d="M 10 105 Q 85 115, 140 90 T 260 115 T 390 85 L 390 140 L 10 140 Z"
                fill="url(#expenseGrad)"
              />

              {/* Stroke Lines */}
              <path
                d="M 10 95 Q 85 105, 140 60 T 260 90 T 390 40"
                fill="none"
                stroke="#0f766e"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 10 105 Q 85 115, 140 90 T 260 115 T 390 85"
                fill="none"
                stroke="#2dd4bf"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Key highlighted dots in chart matching screen 4 */}
              <circle cx="260" cy="90" r="5" fill="#0f766e" stroke="#fff" strokeWidth="2" className="animate-pulse shadow-md" />
              <circle cx="260" cy="115" r="4" fill="#2dd4bf" stroke="#fff" strokeWidth="1.5" />
            </svg>

            {/* Custom chart X labels matching screen 4 */}
            <div className="flex justify-between px-2 text-[8px] font-bold text-gray-400 mt-2">
              <span>JAN</span>
              <span>MAR</span>
              <span>MEI</span>
              <span>JUL</span>
              <span>SEP</span>
              <span>DES</span>
            </div>
          </div>
        </section>

        {/* Expense Allocation Donut Chart matching Screen 4 */}
        <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[#0b1c30]">Alokasi Biaya</h3>
            <p className="text-[10px] text-gray-400 font-semibold">Breakdown pengeluaran operasional</p>
          </div>

          {/* Donut graphic and total in center */}
          <div className="flex flex-col items-center justify-center py-4 relative">
            <div className="w-36 h-36 relative flex items-center justify-center">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                {/* Segment 1: Gaji (45%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#0F766E" strokeWidth="3" strokeDasharray="45 55" strokeDashoffset="0" />
                {/* Segment 2: Logistik (25%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#14b8a6" strokeWidth="3" strokeDasharray="25 75" strokeDashoffset="-45" />
                {/* Segment 3: Iklan (15%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#2dd4bf" strokeWidth="3" strokeDasharray="15 85" strokeDashoffset="-70" />
                {/* Segment 4: Lainnya (15%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeDasharray="15 85" strokeDashoffset="-85" />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[8px] tracking-wider uppercase font-extrabold text-gray-400 leading-none">TOTAL</span>
                <span className="text-sm font-black text-gray-900 mt-0.5">Rp {currentStats.totalSpend}</span>
              </div>
            </div>
          </div>

          {/* Legends matched dynamically */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] font-semibold text-gray-600 border-t border-gray-50 pt-3">
            {currentStats.breakdown.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span>{item.name} ({item.pct}%)</span>
                </div>
                <span className="font-extrabold text-gray-900 text-[10px]">{item.val}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pengeluaran Tertinggi List section matching Screen 4 */}
        <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
          <div>
            <h3 className="text-sm font-bold text-[#0b1c30]">Pengeluaran Tertinggi</h3>
            <p className="text-[10px] text-gray-400 font-semibold">Vendor & operasional utama</p>
          </div>

          <div className="space-y-3">
            {/* Vendor A */}
            <div className="flex items-center justify-between py-1 border-b border-gray-50 pb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <Warehouse className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0b1c30]">Pemasok Bahan Baku A</h4>
                  <p className="text-[9px] text-[#ba1a1a] font-medium leading-none mt-1">Terbayar 12 Des 2025</p>
                </div>
              </div>
              <span className="text-xs font-black text-[#ba1a1a]">Rp 12,4jt</span>
            </div>

            {/* Listrik & Utilitas */}
            <div className="flex items-center justify-between py-1 border-b border-gray-50 pb-2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0b1c30]">Listrik & Utilitas</h4>
                  <p className="text-[9px] text-[#ba1a1a] font-medium leading-none mt-1">Terbayar 10 Des 2025</p>
                </div>
              </div>
              <span className="text-xs font-black text-[#ba1a1a]">Rp 4,2jt</span>
            </div>

            {/* Ads */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <PieIcon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0b1c30]">Meta Ads Dashboard</h4>
                  <p className="text-[9px] text-[#ba1a1a] font-medium leading-none mt-1">Terbayar 08 Des 2025</p>
                </div>
              </div>
              <span className="text-xs font-black text-[#ba1a1a]">Rp 8,5jt</span>
            </div>
          </div>

          <button
            onClick={() => alert("Simulasi: Mengarah ke file ekspor pembukuan format PDF/Excel.")}
            className="w-full mt-2 py-3 bg-[#f0f4f8] hover:bg-[#e2e8f0] text-xs font-bold text-[#0F766E] rounded-xl text-center active:scale-95 transition"
          >
            Lihat Semua Laporan
          </button>
        </section>

        {/* Proyeksi Cash Flow and GEMINI AI ANALIS Card matching Screen 4 */}
        <section className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-[#0b1c30]">Proyeksi Cash Flow</h3>
              <p className="text-[10px] text-gray-400 font-semibold">Estimasi saldo 30 hari kedepan</p>
            </div>

            {/* Pill "AI Analis" precisely matching Screen 4 icon */}
            <div className="flex items-center space-x-1.5 bg-teal-50 text-[#0F766E] px-2.5 py-1 rounded-full text-[10px] font-black border border-teal-100 uppercase tracking-widest animate-pulse">
              <Sparkles className="w-3 h-3 text-teal-600" />
              <span>AI Analis</span>
            </div>
          </div>

          {/* Forecast Bar chart precisely matching the gradient bars in mockup */}
          <div className="flex items-end justify-between h-20 w-full gap-2 px-1 select-none">
            <div className="h-[30%] flex-1 bg-teal-600/10 rounded-t-md hover:bg-teal-600/20 transition-all cursor-pointer" />
            <div className="h-[43%] flex-1 bg-teal-600/20 rounded-t-md hover:bg-teal-600/30 transition-all" />
            <div className="h-[55%] flex-1 bg-teal-600/40 rounded-t-md hover:bg-teal-600/50 transition-all" />
            <div className="h-[75%] flex-1 bg-[#115e59] rounded-t-md shadow-sm" />
            <div className="h-[95%] flex-1 bg-[#0f766e] rounded-t-md shadow-md" />
            <div className="h-[80%] flex-1 bg-[#49e3c9]/60 rounded-t-md hover:bg-[#49e3c9]/80 transition-all" />
          </div>

          {/* Interactive AI recommendation block under the projections */}
          <div className="p-4 bg-teal-50/50 border border-teal-100 rounded-2xl flex flex-col space-y-3">
            {aiResponse ? (
              <div className="text-xs text-slate-800 leading-relaxed font-medium prose prose-slate max-w-none">
                <div className="whitespace-pre-wrap">{aiResponse}</div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-[11px] text-slate-700 leading-relaxed font-semibold">
                  <strong>Insight:</strong> Arus kas diperkirakan naik <strong>18%</strong> pada minggu ke-4 karena pelunasan invoice dari distributor utama. Disarankan untuk menahan pengeluaran non-urgent hingga tgl 25.
                </p>
                <p className="text-[10px] text-teal-700 font-bold">
                  Dapatkan rekomendasi keuangan kustom dari Akuntan AI berdasarkan transaksi riil Anda!
                </p>
              </div>
            )}

            <button
              onClick={handleFetchAiAnalysis}
              disabled={loadingAi}
              className="mt-1 w-full py-2.5 bg-[#0F766E] hover:bg-[#005e3f] disabled:bg-gray-400 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 shadow active:scale-95 transition"
            >
              {loadingAi ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Menghitung Keuangan...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>⚡ Tanya AI Analis Real-Time</span>
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
