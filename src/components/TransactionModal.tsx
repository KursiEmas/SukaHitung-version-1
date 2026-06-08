import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { X, Calendar, Edit3, Image as ImageIcon, CheckCircle, Plus } from "lucide-react";
import { Transaction, TransactionType } from "../types";

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType: TransactionType;
  onSave: (transaction: Omit<Transaction, "id" | "status" | "time">) => void;
}

export default function TransactionModal({ isOpen, onClose, defaultType, onSave }: TransactionModalProps) {
  const [type, setType] = useState<TransactionType>(defaultType);
  const [nominal, setNominal] = useState<string>("0");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  // Set default current date in YYYY-MM-DD
  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
      setType(defaultType);
      setNominal("0");
      setNotes("");
      setImage(null);
      setSuccess(false);

      // Pre-select first category based on type
      setCategory(defaultType === "in" ? "Penjualan" : "Bahan Baku");
    }
  }, [isOpen, defaultType]);

  // Adjust categories based on transaction type
  const categories = type === "in" 
    ? ["Penjualan", "Modal", "QRIS", "Piutang", "Lainnya"]
    : ["Bahan Baku", "Gaji", "Sewa", "Operasional", "Iklan", "Lainnya"];

  if (!isOpen) return null;

  const handleNominalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Stripping all non-digits, then format
    const value = e.target.value.replace(/\D/g, "");
    if (!value) {
      setNominal("0");
    } else {
      setNominal(parseInt(value, 10).toString());
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulatedCamera = () => {
    // Set a neat mock payment receipt or grocery item
    setImage("https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=300");
  };

  const handleSave = () => {
    const amt = parseInt(nominal, 10);
    if (!amt || amt <= 0) {
      alert("Masukkan nominal transaksi yang valid!");
      return;
    }
    if (!category) {
      alert("Pilih kategori transaksi!");
      return;
    }

    onSave({
      title: notes || `${type === "in" ? "Pemasukan" : "Pengeluaran"} ${category}`,
      amount: amt,
      type: type,
      category: category,
      date: date || new Date().toISOString().split("T")[0],
      notes: notes,
    });

    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#0b1c30]/40 backdrop-blur-sm">
      {/* Background Dimming Close Area */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal / Bottom Sheet Box Matching Screen 7 */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 220 }}
        className="relative w-full max-w-lg bg-white rounded-t-[28px] shadow-2xl border-t border-white/20 p-6 flex flex-col space-y-4 max-h-[92vh] overflow-y-auto"
      >
        {/* Handle bar at the top */}
        <div className="flex justify-center -mt-2 pb-3">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex justify-between items-center pb-2">
          <h3 className="text-xl font-bold text-[#0b1c30]">
            {success ? "Berhasil Disimpan!" : "Catat Transaksi"}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-[#0b1c30] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-[#0F766E]"
            >
              <CheckCircle className="w-12 h-12" />
            </motion.div>
            <p className="text-base font-semibold text-[#0b1c30]">
              Transaksi sebesar Rp {parseInt(nominal, 10).toLocaleString("id-ID")} disimpan!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Segmented Controller (Pemasukan/Pengeluaran) */}
            <div className="flex bg-gray-100 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setType("in");
                  setCategory("Penjualan");
                }}
                className={`flex-1 py-3 text-center text-sm font-bold rounded-xl transition-all duration-200 ${
                  type === "in"
                    ? "bg-white text-[#0F766E] shadow-sm font-extrabold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Pemasukan
              </button>
              <button
                type="button"
                onClick={() => {
                  setType("out");
                  setCategory("Bahan Baku");
                }}
                className={`flex-1 py-3 text-center text-sm font-bold rounded-xl transition-all duration-200 ${
                  type === "out"
                    ? "bg-white text-[#0F766E] shadow-sm font-extrabold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                Pengeluaran
              </button>
            </div>

            {/* Nominal Currency Input matching Screen 7 style */}
            <div className="py-4 border-b border-gray-200">
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Nominal
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-400">Rp</span>
                <input
                  type="text"
                  value={parseInt(nominal, 10).toLocaleString("id-ID")}
                  onChange={handleNominalChange}
                  className="w-full text-4xl font-extrabold text-[#0b1c30] tracking-tight bg-transparent focus:outline-none focus:ring-0"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Kategori Grid buttons */}
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
                Kategori
              </span>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-3 px-2 text-center text-xs font-semibold rounded-xl border transition-all ${
                      category === cat
                        ? "bg-[#0F766E]/10 border-[#0F766E] text-[#0F766E] font-bold"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Row Fields: Tanggal & Catatan */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Tanggal
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 bg-[#f0f4f8] focus:bg-white text-xs font-medium text-[#0b1c30] rounded-xl border border-transparent focus:border-[#0F766E] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Catatan
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Edit3 className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Beli stok..."
                    className="w-full pl-9 pr-3 py-3 bg-[#f0f4f8] focus:bg-white text-xs font-medium text-[#0b1c30] rounded-xl border border-transparent focus:border-[#0F766E] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Bukti Transaksi Attachment Area */}
            <div>
              <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Bukti Transaksi
              </span>
              {image ? (
                <div className="relative h-28 w-full rounded-2xl overflow-hidden border border-gray-200">
                  <img src={image} alt="Bukti transfer" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/75 rounded-full text-white text-xs transition"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-200 hover:border-[#0F766E] bg-gray-50 hover:bg-[#eaf6f4]/40 transition h-28 rounded-2xl p-4 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <ImageIcon className="w-6 h-6 text-gray-400 mb-1" />
                  <p className="text-[11px] text-gray-500 text-center font-medium">
                    Drag-and-drop atau <span className="text-[#0F766E] font-bold">Pilih file</span> / Kamera
                  </p>
                  {/* Camera simulated helper */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      simulatedCamera();
                    }}
                    className="mt-2 text-[10px] font-bold text-[#0F766E] bg-white hover:bg-teal-50 px-3 py-1 rounded-full border border-gray-200 shadow-sm active:scale-95 transition"
                  >
                    Simulasi Ambil Foto 📸
                  </button>
                </div>
              )}
            </div>

            {/* Actions Submit Button */}
            <button
              onClick={handleSave}
              className="w-full py-3.5 bg-gradient-to-r from-[#006b5f] to-[#0F766E] text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center space-x-2 transition hover:shadow-lg active:scale-[0.98]"
            >
              <span>Simpan Transaksi</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
