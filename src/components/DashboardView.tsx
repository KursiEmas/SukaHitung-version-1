import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Bell, 
  Plus, 
  Minus, 
  Calculator, 
  Users, 
  TrendingUp, 
  Coffee, 
  DollarSign, 
  ShoppingBag, 
  Activity, 
  Search, 
  MapPin, 
  CheckCircle,
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Transaction, User } from "../types";

interface DashboardViewProps {
  user: User;
  transactions: Transaction[];
  onOpenTransactionModal: (type: "in" | "out") => void;
  onNavigateToHpp: () => void;
  onNavigateToConsult: () => void;
}

export default function DashboardView({
  user,
  transactions,
  onOpenTransactionModal,
  onNavigateToHpp,
  onNavigateToConsult,
}: DashboardViewProps) {
  const [filterType, setFilterType] = useState<"all" | "in" | "out">("all");

  // Calculate Balance dynamically
  const totalIn = transactions
    .filter((t) => t.type === "in")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOut = transactions
    .filter((t) => t.type === "out")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIn - totalOut;

  // Map category to Lucide Icon for rich transaction list
  const getCategoryIcon = (category: string, type: string) => {
    switch (category) {
      case "Penjualan":
      case "QRIS":
        return <Coffee className="w-5 h-5 text-[#0F766E]" />;
      case "Bahan Baku":
        return <ShoppingBag className="w-5 h-5 text-amber-600" />;
      case "Gaji":
        return <Users className="w-5 h-5 text-blue-600" />;
      case "Sewa":
        return <Activity className="w-5 h-5 text-indigo-600" />;
      case "Operasional":
        return <Activity className="w-5 h-5 text-red-600" />;
      default:
        return type === "in" 
          ? <DollarSign className="w-5 h-5 text-teal-600" />
          : <ShoppingBag className="w-5 h-5 text-rose-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "BERHASIL":
      case "SETTLED":
        return "bg-teal-50 text-[#0F766E] border border-teal-100";
      case "TAGIHAN":
        return "bg-amber-50 text-amber-700 border border-amber-100";
      case "KELUAR":
      default:
        return "bg-rose-50 text-rose-600 border border-rose-100";
    }
  };

  // Filter transaction list
  const filteredTransactions = transactions.filter((t) => {
    if (filterType === "all") return true;
    return t.type === filterType;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Upper header block matches Screen 5 precisely */}
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
            <p className="text-[11px] text-gray-500 font-medium">
              Keuangan bisnismu membaik bulan ini
            </p>
          </div>
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition">
          <Bell className="w-5 h-5 text-[#0b1c30]" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
        </button>
      </header>

      {/* Main Container */}
      <div className="flex-1 px-5 py-6 space-y-6 max-w-lg mx-auto w-full pb-24">
        {/* Main Balance Card matching Screen 5 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-br from-[#0F766E] to-[#005e3f] rounded-[24px] p-6 text-white overflow-hidden shadow-xl"
        >
          {/* Ambient overlay */}
          <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

          {/* Label & Trend badge */}
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-extrabold tracking-widest text-[#a3faef]/80 uppercase">
              SALDO SAAT INI
            </span>
            <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#9cf2e8]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+12.5%</span>
            </div>
          </div>

          {/* Current balance display */}
          <h1 className="text-3xl font-extrabold tracking-tight mb-4">
            Rp {netBalance.toLocaleString("id-ID")}
          </h1>

          {/* Micro bar chart representing cash flows (Screen 5 design detail) */}
          <div className="flex items-end justify-between h-12 w-full gap-1.5 pt-2">
            <div className="h-[25%] flex-1 bg-white/20 rounded-sm hover:bg-[#9cf2e8]/80 transition-all cursor-pointer" title="Sen" />
            <div className="h-[45%] flex-1 bg-white/20 rounded-sm hover:bg-[#9cf2e8]/80 transition-all cursor-pointer" />
            <div className="h-[35%] flex-1 bg-white/20 rounded-sm hover:bg-[#9cf2e8]/80 transition-all cursor-pointer" />
            <div className="h-[55%] flex-1 bg-white/20 rounded-sm hover:bg-[#9cf2e8]/80 transition-all cursor-pointer" />
            <div className="h-[75%] flex-1 bg-white/20 rounded-sm hover:bg-[#9cf2e8]/80 transition-all cursor-pointer" />
            <div className="h-[45%] flex-1 bg-white/30 rounded-sm hover:bg-[#9cf2e8]/80 transition-all cursor-pointer" />
            <div className="h-[100%] flex-1 bg-[#6df5e1] rounded-sm shadow-md" title="Hari ini" />
          </div>
        </motion.div>

        {/* 4 Quick Actions (Grid of 4 items) matching Screen 5 precisely */}
        <div className="grid grid-cols-2 gap-4">
          {/* Income Button */}
          <button
            onClick={() => onOpenTransactionModal("in")}
            className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition active:scale-95 text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-[#e1faf7] text-[#0F766E] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 stroke-[3]" />
            </div>
            <span className="text-xs font-bold text-[#0b1c30]">Catat Pemasukan</span>
          </button>

          {/* Expense Button */}
          <button
            onClick={() => onOpenTransactionModal("out")}
            className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition active:scale-95 text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-[#ffebeb] text-rose-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Minus className="w-6 h-6 stroke-[3]" />
            </div>
            <span className="text-xs font-bold text-[#0b1c30]">Catat Pengeluaran</span>
          </button>

          {/* Calculate HPP */}
          <button
            onClick={onNavigateToHpp}
            className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition active:scale-95 text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-teal-50 text-[#0f766e] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Calculator className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#0b1c30]">Hitung HPP</span>
          </button>

          {/* Consult Expert */}
          <button
            onClick={onNavigateToConsult}
            className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition active:scale-95 text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-[#e8f8f2] text-[#007952] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-[#0b1c30]">Konsultasi</span>
          </button>
        </div>

        {/* Wawasan Bisnis matching Screen 5 */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-[#0b1c30] uppercase tracking-wider">
              Wawasan Bisnis
            </h3>
            <button
              onClick={() => alert("Simulasi: Mengarah ke halaman semua laporan wawasan keuangan.")}
              className="text-xs font-bold text-[#0F766E] hover:underline"
            >
              Lihat Semua
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {/* Card 1: Growth */}
            <div className="bg-white p-4 rounded-xl border-l-4 border-teal-500 shadow-sm flex flex-col justify-between min-h-[90px]">
              <span className="text-[10px] uppercase font-bold text-[#6e7977] tracking-wider block">
                Pertumbuhan
              </span>
              <span className="text-sm font-extrabold text-[#0b1c30] flex items-center space-x-1 mt-1">
                <span className="text-teal-600 font-black">Omzet naik 15%</span>
                <ArrowUpRight className="w-4 h-4 text-teal-600 inline-block shrink-0" />
              </span>
            </div>

            {/* Card 2: Efficiency */}
            <div className="bg-white p-4 rounded-xl border-l-4 border-[#0F766E] shadow-sm flex flex-col justify-between min-h-[90px]">
              <span className="text-[10px] uppercase font-bold text-[#6e7977] tracking-wider block">
                Efisiensi
              </span>
              <span className="text-sm font-extrabold text-[#0b1c30] flex items-center space-x-1 mt-1">
                <span className="text-[#0F766E] font-black">Biaya turun 8%</span>
                <ArrowDownRight className="w-4 h-4 text-[#0F766E] inline-block shrink-0" />
              </span>
            </div>
          </div>
        </section>

        {/* Transaksi Terakhir matching Screen 5 precisely */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-[#0b1c30] uppercase tracking-wider">
              Transaksi Terakhir
            </h3>
            {/* Filter buttons */}
            <div className="flex space-x-1.5 bg-gray-100 p-0.5 rounded-lg text-[10px] font-bold">
              <button
                onClick={() => setFilterType("all")}
                className={`px-2 py-1 rounded-md transition ${filterType === "all" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}
              >
                Semua
              </button>
              <button
                onClick={() => setFilterType("in")}
                className={`px-2 py-1 rounded-md transition ${filterType === "in" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}
              >
                In
              </button>
              <button
                onClick={() => setFilterType("out")}
                className={`px-2 py-1 rounded-md transition ${filterType === "out" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500"}`}
              >
                Out
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredTransactions.length === 0 ? (
              <p className="text-xs text-gray-400 py-6 text-center">Belum ada transaksi.</p>
            ) : (
              filteredTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="bg-white p-3.5 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center space-x-3.5">
                    {/* Circle icon category representation */}
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                      {getCategoryIcon(tx.category, tx.type)}
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#0b1c30] leading-snug">
                        {tx.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 font-medium">
                        {tx.date.split("-").reverse().join("/")}, {tx.time}
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end space-y-1">
                    <span className={`text-[13px] font-extrabold tracking-tight ${tx.type === "in" ? "text-teal-600" : "text-rose-600"}`}>
                      {tx.type === "in" ? "+" : "-"}Rp {tx.amount.toLocaleString("id-ID")}
                    </span>
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-md ${getStatusColor(tx.status)}`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
