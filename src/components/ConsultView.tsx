import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Search, 
  Star, 
  UserCheck, 
  X, 
  CheckCircle, 
  Calendar, 
  Clock, 
  DollarSign, 
  Check 
} from "lucide-react";
import { Consultant, BookingSlot, User } from "../types";
import { CONSULTANTS, BOOKING_SLOTS } from "../data";

interface ConsultViewProps {
  user: User;
}

export default function ConsultView({ user }: ConsultViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"Akuntan Publik" | "Konsultan Pajak">("Akuntan Publik");
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(24); // Sen 24, Sel 25, etc.
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("");
  const [successBooking, setSuccessBooking] = useState<boolean>(false);

  // Filter consultants based on search and category
  const filteredConsultants = CONSULTANTS.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = c.specialty === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenBooking = (consultant: Consultant) => {
    setSelectedConsultant(consultant);
    setSelectedTimeRange("");
    setSuccessBooking(false);
  };

  const handleCloseBooking = () => {
    setSelectedConsultant(null);
  };

  const handleConfirmBooking = () => {
    if (!selectedTimeRange) {
      alert("Silakan pilih waktu sesi yang tersedia terlebih dahulu!");
      return;
    }
    setSuccessBooking(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Upper header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-100 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 rounded-xl bg-teal-50 text-[#0F766E]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#0b1c30]">Konsultasi Ahli</h2>
            <p className="text-[10px] text-gray-500 font-medium">Bimbingan Finansial UMKM</p>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 px-5 py-5 space-y-6 max-w-lg mx-auto w-full pb-24">
        {/* Search input bar matching Screen 8 */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari akuntan atau konsultan..."
            className="w-full pl-10 pr-4 py-3 bg-[#f0f4f8] focus:bg-white text-sm text-[#0b1c30] rounded-xl border border-transparent focus:border-[#0F766E] focus:outline-none transition-all duration-200 shadow-sm"
          />
        </div>

        {/* Kategori Keahlian Pills matching Screen 8 */}
        <div className="space-y-2.5">
          <span className="block text-xs font-bold text-[#0b1c30] uppercase tracking-wider">
            Kategori Keahlian
          </span>
          <div className="flex bg-gray-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveCategory("Akuntan Publik")}
              className={`flex-1 py-2.5 text-center text-xs font-bold rounded-xl transition duration-200 ${
                activeCategory === "Akuntan Publik"
                  ? "bg-[#6df5e1] text-[#0b1c30] shadow-sm font-extrabold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Akuntan Publik
            </button>
            <button
              onClick={() => setActiveCategory("Konsultan Pajak")}
              className={`flex-1 py-2.5 text-center text-xs font-bold rounded-xl transition duration-200 ${
                activeCategory === "Konsultan Pajak"
                  ? "bg-[#6df5e1] text-[#0b1c30] shadow-sm font-extrabold"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Konsultan Pajak
            </button>
          </div>
        </div>

        {/* Rekomendasi Ahli List matching Screen 8 */}
        <div className="space-y-4">
          <span className="block text-xs font-bold text-[#0b1c30] uppercase tracking-wider">
            Rekomendasi Ahli
          </span>

          {filteredConsultants.length === 0 ? (
            <p className="text-xs text-gray-400 py-8 text-center bg-white rounded-2xl border border-dashed border-gray-200">
              Tidak ada ahli dengan kriteria tersebut.
            </p>
          ) : (
            filteredConsultants.map((consultant) => (
              <motion.div
                key={consultant.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-[20px] border border-gray-100 shadow-sm space-y-4"
              >
                {/* Consultant Profile Details Row */}
                <div className="flex items-start justify-between">
                  <div className="flex space-x-3.5">
                    {/* Character Avatar with "VERIFIED" badge overlay */}
                    <div className="relative shrink-0">
                      <img
                        src={consultant.avatarUrl}
                        alt={consultant.name}
                        className="w-16 h-16 rounded-2xl object-cover border border-gray-100"
                      />
                      <span className="absolute -top-1.5 -left-1 px-1.5 py-0.5 bg-emerald-600 border border-white text-white rounded-full text-[7px] font-black uppercase tracking-widest leading-none shadow">
                        VERIFIED
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-[#0b1c30] flex items-center">
                        <span>{consultant.name}</span>
                      </h4>
                      <p className="text-[10px] text-gray-500 font-semibold leading-none">{consultant.title}</p>
                      
                      {/* Active green/grey badges */}
                      <div className="flex space-x-1.5 pt-1.5">
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-md ${consultant.status === "Online" ? "bg-teal-50 text-[#0F766E] border border-teal-100" : "bg-gray-50 text-gray-500 border border-gray-100"}`}>
                          {consultant.status}
                        </span>
                        <span className="text-[8px] font-bold bg-[#e8f8f2] text-[#007952] px-1.5 py-0.5 rounded-md border border-emerald-100">
                          {consultant.responseTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating indicator capsule */}
                  <div className="bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-lg flex items-center space-x-1 text-[11px] font-extrabold text-amber-700 shadow-xs">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                    <span>{consultant.rating}</span>
                  </div>
                </div>

                {/* Subfooter row matching Mock 8 precisely */}
                <div className="flex items-center justify-between border-t border-gray-50 pt-3.5">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    {consultant.consultations}+ Konsultasi
                  </span>

                  <div className="flex space-x-2 select-none">
                    <button
                      onClick={() => alert(`Simulasi: Menemukan CV, portofolio kredensial akademis, dan ulasan lengkap untuk ${consultant.name}.`)}
                      className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-extrabold text-xs rounded-xl shadow-xs transition"
                    >
                      Lihat Profil
                    </button>
                    <button
                      onClick={() => handleOpenBooking(consultant)}
                      className="px-5 py-2 bg-[#0F766E] hover:bg-[#006b5f] text-white font-extrabold text-xs rounded-xl shadow-sm transition active:scale-95"
                    >
                      Pesan
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Dynamic Pilih Jadwal modal card sheet matching Screen 8 lower overlay sheet */}
      <AnimatePresence>
        {selectedConsultant && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#0b1c30]/40 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={handleCloseBooking} />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="relative w-full max-w-lg bg-white rounded-t-[28px] shadow-2xl border-t border-white/20 p-6 flex flex-col space-y-4 max-h-[92vh] overflow-y-auto"
            >
              {/* handle swipebar element */}
              <div className="flex justify-center -mt-2 pb-2">
                <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
              </div>

              {/* Header */}
              <div className="flex justify-between items-center pb-1">
                <h3 className="text-xl font-bold text-[#0b1c30]">Pilih Jadwal</h3>
                <button
                  onClick={handleCloseBooking}
                  className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {successBooking ? (
                <div className="flex flex-col items-center justify-center py-10 space-y-5 text-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-[#0F766E]"
                  >
                    <CheckCircle className="w-10 h-10" />
                  </motion.div>

                  <div className="space-y-1">
                    <p className="text-base font-extrabold text-[#0b1c30]">Konsultasi Sukses Dipesan!</p>
                    <p className="text-xs text-gray-500 leading-snug">
                      Sesi tatap muka virtual dengan <strong>{selectedConsultant.name}</strong> dijadwalkan pada hari yang dipilih pukul {selectedTimeRange}.
                    </p>
                  </div>

                  <div className="p-3 bg-[#e8f8f2] border border-emerald-100 rounded-xl leading-snug text-xs font-medium text-[#007952]">
                    Link ruang temu Zoom/Google Meet akan dikirimkan otomatis melalui Email & WhatsApp Anda.
                  </div>

                  <button
                    onClick={handleCloseBooking}
                    className="w-full py-3 bg-[#0F766E] text-white font-bold text-sm rounded-xl"
                  >
                    Selesai
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  {/* Calendar horizontal switcher matching Screen 8 precisely */}
                  <div className="flex justify-between gap-2.5">
                    {[
                      { l: "Sen", d: 24 },
                      { l: "Sel", d: 25 },
                      { l: "Rab", d: 26 },
                      { l: "Kam", d: 27 },
                    ].map((item) => (
                      <button
                        key={item.d}
                        onClick={() => setSelectedDay(item.d)}
                        className={`flex-1 flex flex-col items-center py-3.5 rounded-2xl border transition-all ${
                          selectedDay === item.d
                            ? "bg-[#eaf6f4] border-[#0F766E] text-[#0F766E] shadow-sm transform scale-102"
                            : "bg-[#F8FAFC] border-gray-150 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1">
                          {item.l}
                        </span>
                        <span className="text-lg font-black">{item.d}</span>
                      </button>
                    ))}
                  </div>

                  {/* Sesi Tersedia slots grid matches Screen 8 */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-[#0b1c30] uppercase tracking-wider">
                      <Clock className="w-4 h-4 text-teal-600" />
                      <span>Sesi Tersedia</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      {BOOKING_SLOTS.map((slot, idx) => {
                        const isSelected = selectedTimeRange === slot.timeRange;
                        let statusStyle = "";
                        let disable = false;

                        if (slot.status === "BOOKED") {
                          statusStyle = "border-red-100 bg-red-50/40 text-red-600 cursor-not-allowed opacity-50";
                          disable = true;
                        } else if (slot.status === "ALMOST FULL") {
                          statusStyle = isSelected
                            ? "border-amber-500 bg-amber-50 text-amber-700 font-extrabold ring-2 ring-[#0F766E]"
                            : "border-amber-200 bg-amber-50/50 text-amber-600 hover:border-amber-400";
                        } else {
                          statusStyle = isSelected
                            ? "border-[#0F766E] bg-[#eaf6f4] text-[#0F766E] font-black ring-2 ring-[#0F766E]"
                            : "border-teal-200 bg-teal-50/30 text-teal-700 hover:border-teal-400";
                        }

                        return (
                          <button
                            key={idx}
                            type="button"
                            disabled={disable}
                            onClick={() => setSelectedTimeRange(slot.timeRange)}
                            className={`p-3 rounded-2xl border text-center flex flex-col justify-center min-h-[70px] transition-all relative overflow-hidden ${statusStyle}`}
                          >
                            <span className="text-[13px] font-black tracking-tight">{slot.timeRange}</span>
                            <span className="text-[8px] font-black uppercase tracking-wider mt-1 block">
                              {slot.status}
                            </span>
                            {isSelected && (
                              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#0F766E] flex items-center justify-center text-white">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Session Price Recap matching Screen 8 bottom bar */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        Harga Sesi (60 Menit)
                      </span>
                      <span className="text-base font-black text-emerald-600 tracking-tight">
                        Rp {selectedConsultant.price.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <button
                      onClick={handleConfirmBooking}
                      className="px-8 py-3.5 bg-gradient-to-r from-[#006b5f] to-[#0F766E] text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition active:scale-[98]"
                    >
                      Konfirmasi
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
