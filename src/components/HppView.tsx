import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Calculator, 
  Trash2, 
  Coins, 
  Award,
  CircleDollarSign,
  Info
} from "lucide-react";
import { HppState, User } from "../types";

interface HppViewProps {
  user: User;
}

export default function HppView({ user }: HppViewProps) {
  const [step, setStep] = useState<number>(1);
  const [inputs, setInputs] = useState<HppState>({
    rawMaterialCost: 250000, // Step 1 default
    packagingCost: 45000,    // Step 2 default
    operationalCost: 20000,  // Step 2 default
    laborCost: 80000,        // Step 3 default
    batchSize: 50,           // Step 3 default (units produced per batch)
    profitMargin: 40,        // Step 4 default desired profit (%)
  });

  const handleCostChange = (key: keyof HppState, val: string) => {
    const rawVal = val.replace(/\D/g, "");
    setInputs((prev) => ({
      ...prev,
      [key]: rawVal ? parseInt(rawVal, 10) : 0,
    }));
  };

  const handleNext = () => {
    if (step === 1 && inputs.rawMaterialCost <= 0) {
      alert("Masukkan biaya bahan baku untuk melanjutkan!");
      return;
    }
    if (step === 3 && inputs.batchSize <= 0) {
      alert("Jumlah unit terproduksi (Batch Size) minimal 1 unit!");
      return;
    }
    if (step < 4) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  // HPP Math Calculations
  const totalCostPerBatch = 
    inputs.rawMaterialCost + 
    inputs.packagingCost + 
    inputs.operationalCost + 
    inputs.laborCost;

  const hppPerUnit = inputs.batchSize > 0 ? totalCostPerBatch / inputs.batchSize : 0;

  // Selling price calculated based on Desired Margin (%)
  // Formula: Selling Price = HPP per Unit / (1 - Margin/100)
  const marginFraction = inputs.profitMargin / 100;
  const sellingPricePerUnit = marginFraction < 1 
    ? hppPerUnit / (1 - marginFraction)
    : hppPerUnit * 1.5;

  const profitPerUnit = sellingPricePerUnit - hppPerUnit;
  const totalProfitPerBatch = profitPerUnit * inputs.batchSize;

  // UI Step text titles matching Screen 6
  const stepTitles = [
    "LANGKAH 1: BAHAN BAKU",
    "LANGKAH 2: OPERASIONAL & KEMASAN",
    "LANGKAH 3: TENAGA KERJA",
    "LANGKAH 4: ESTIMASI HARGA JUAL & LABA"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header precisely matches SukaHitung header look */}
      <header className="sticky top-0 bg-white/85 backdrop-blur-md z-40 border-b border-gray-100 px-5 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 rounded-xl bg-[#0F766E]/10 text-[#0F766E]">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#0b1c30]">Kalkulator HPP</h2>
            <p className="text-[10px] text-gray-500 font-medium">Harga Pokok Penjualan Pintar</p>
          </div>
        </div>

        {/* Premium feature capsule matching Screen 6 */}
        <div className="flex items-center space-x-1.5 bg-gradient-to-r from-[#006b5f] to-[#0F766E] text-white px-2.5 py-1 rounded-full text-[9px] font-black tracking-wider uppercase">
          <Award className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
          <span>Premium</span>
        </div>
      </header>

      {/* Main calculation workspace */}
      <div className="flex-1 px-5 py-6 space-y-5 max-w-lg mx-auto w-full pb-24">
        {/* Title matches screen 6 styling */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#0b1c30]">Kalkulator HPP</h2>
          <p className="text-xs text-gray-500 leading-snug">
            Hitung harga jual akurat dan keuntungan bersih untuk bisnis Anda.
          </p>
        </div>

        {/* Stepper progress matches Screen 6 */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center text-[10px] font-bold text-[#0F766E] tracking-wider">
            <span className="uppercase">{stepTitles[step - 1]}</span>
            <span>{step} / 4</span>
          </div>
          <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
            {/* Progress fill animation */}
            <motion.div 
              className="bg-gradient-to-r from-teal-500 to-[#0F766E] h-full rounded-full"
              initial={{ width: "25%" }}
              animate={{ width: `${step * 25}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Dynamic content holder container with white background & glass shadow */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl p-5 border border-gray-100 shadow-lg relative overflow-hidden space-y-4"
          >
            {/* Ambient subtle decoration */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#0F766E]/5 rounded-bl-3xl pointer-events-none" />

            {/* STEP 1: RAW MATERIAL COST */}
            {step === 1 && (
              <div className="space-y-5">
                {/* Beautiful dynamic mockup image container matches Screen 6 */}
                <div className="relative rounded-2xl overflow-hidden shadow-inner border border-teal-800/10 h-44 bg-gradient-to-br from-[#0F766E] to-[#022c22] p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-extrabold tracking-widest text-[#6df5e1] uppercase">FORMULA HPP</span>
                    <Coins className="w-5 h-5 text-[#6df5e1]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-tight">Total Biaya Bahan Baku</h4>
                    <p className="text-[10px] text-gray-300 leading-snug mt-1">
                      Kalkulasi seluruh bahan utama (kopi, gula, susu, rasa) untuk sekali pembuatan batch.
                    </p>
                  </div>
                  <div className="text-[11px] font-mono text-[#a3faef]/60">ID: HPP_INGR_01</div>
                </div>

                {/* Currency Input matches Screen 7 style input field */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Total Biaya Bahan Baku (per Batch)
                  </label>
                  <div className="flex items-baseline space-x-2 border border-gray-200 focus-within:border-[#0F766E] p-3 rounded-xl bg-[#f0f4f8] focus-within:bg-white transition">
                    <span className="text-lg font-bold text-gray-400">Rp</span>
                    <input
                      type="text"
                      value={inputs.rawMaterialCost.toLocaleString("id-ID")}
                      onChange={(e) => handleCostChange("rawMaterialCost", e.target.value)}
                      className="w-full text-2xl font-black text-[#0b1c30] bg-transparent focus:outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 leading-snug">
                    Tip: Masukkan total harga kulakan bahan yang dipakai dalam satu siklus produksi kopi / kue Anda.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2: PACKAGING & UTILITIES */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="p-4 bg-[#f8fcfb] rounded-xl border border-[#0F766E]/10 flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-teal-50 text-[#0F766E]">
                    <Info className="w-5 h-5" />
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed font-semibold">
                    Kemasan (cup, sedotan, box) dan Operasional (listrik, gas, air) adalah bagian penting dari HPP. Jangan dilewatkan agar hitungan laba tidak boncos!
                  </p>
                </div>

                {/* Packaging Input */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Biaya Kemasan & Label (per Batch)
                  </label>
                  <div className="flex items-baseline space-x-2 border border-gray-200 focus-within:border-[#0F766E] p-3.5 rounded-xl bg-[#f0f4f8] focus-within:bg-white transition">
                    <span className="text-base font-bold text-gray-400">Rp</span>
                    <input
                      type="text"
                      value={inputs.packagingCost.toLocaleString("id-ID")}
                      onChange={(e) => handleCostChange("packagingCost", e.target.value)}
                      className="w-full text-xl font-bold text-[#0b1c30] bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                {/* Operational Cost Input */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Biaya Operasional - Gas/Listrik (per Batch)
                  </label>
                  <div className="flex items-baseline space-x-2 border border-gray-200 focus-within:border-[#0F766E] p-3.5 rounded-xl bg-[#f0f4f8] focus-within:bg-white transition">
                    <span className="text-base font-bold text-gray-400">Rp</span>
                    <input
                      type="text"
                      value={inputs.operationalCost.toLocaleString("id-ID")}
                      onChange={(e) => handleCostChange("operationalCost", e.target.value)}
                      className="w-full text-xl font-bold text-[#0b1c30] bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: LABOR & BATCH SIZE */}
            {step === 3 && (
              <div className="space-y-4">
                {/* Cost Labor input */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Biaya Tenaga Kerja - Pembuat (per Batch)
                  </label>
                  <div className="flex items-baseline space-x-2 border border-gray-200 focus-within:border-[#0F766E] p-3.5 rounded-xl bg-[#f0f4f8] focus-within:bg-white transition">
                    <span className="text-base font-bold text-gray-400">Rp</span>
                    <input
                      type="text"
                      value={inputs.laborCost.toLocaleString("id-ID")}
                      onChange={(e) => handleCostChange("laborCost", e.target.value)}
                      className="w-full text-xl font-bold text-[#0b1c30] bg-transparent focus:outline-none"
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 leading-none mt-1">Kosongkan jika Anda memproduksi sendiri tanpa upah harian.</p>
                </div>

                {/* Batch Quantity product unit size */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Jumlah Unit Dihasilkan (Batch Size)
                  </label>
                  <div className="flex items-baseline space-x-2 border border-gray-200 focus-within:border-[#0F766E] p-3.5 rounded-xl bg-[#f0f4f8] focus-within:bg-white transition">
                    <input
                      type="text"
                      value={inputs.batchSize}
                      onChange={(e) => handleCostChange("batchSize", e.target.value)}
                      className="w-full text-xl font-bold text-[#0b1c30] bg-transparent focus:outline-none"
                    />
                    <span className="text-sm font-bold text-gray-400">Unit / Cup</span>
                  </div>
                  <p className="text-[10px] text-gray-400 leading-none mt-1">Contoh: 1 batch bahan di atas menghasilkan 50 Cup Kopi Susu.</p>
                </div>
              </div>
            )}

            {/* STEP 4: FINAL RECAP AND DESIRED PROFIT */}
            {step === 4 && (
              <div className="space-y-5">
                {/* Mathematical recap card */}
                <div className="p-4 bg-[#f8f9ff] border-2 border-dashed border-[#cbdbf5] rounded-2xl space-y-3">
                  <div className="flex justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
                    <span>HPP Ringkasan</span>
                    <span className="text-[#0F766E]">Perhitungan Valid</span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3.5 pt-1.5 border-t border-gray-200 text-xs text-gray-700">
                    <div>Total Modal Terpakai:</div>
                    <div className="text-right font-black text-gray-900">Rp {totalCostPerBatch.toLocaleString("id-ID")}</div>

                    <div>Bahan Baku ({Math.round((inputs.rawMaterialCost / totalCostPerBatch) * 100)}%):</div>
                    <div className="text-right font-bold text-slate-500">Rp {inputs.rawMaterialCost.toLocaleString("id-ID")}</div>

                    <div>Hasil Batch Size:</div>
                    <div className="text-right font-black text-[#0F766E]">{inputs.batchSize} Unit</div>

                    <div className="text-sm font-extrabold text-[#0D253F] pt-2 border-t border-gray-100">HPP Dasariah per Unit:</div>
                    <div className="text-right text-base font-black text-rose-600 pt-1.5 border-t border-gray-100">
                      Rp {Math.round(hppPerUnit).toLocaleString("id-ID")}
                    </div>
                  </div>
                </div>

                {/* Slide Margin desired */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-[#0b1c30] uppercase tracking-wider">
                    <span>Target Margin Keuntungan</span>
                    <span className="text-[#0F766E] font-black text-sm">{inputs.profitMargin}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={inputs.profitMargin}
                    onChange={(e) => setInputs((prev) => ({ ...prev, profitMargin: parseInt(e.target.value, 10) }))}
                    className="w-full accent-[#0F766E] h-2 bg-gray-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-gray-400 font-bold uppercase">
                    <span>10% (Konservatif)</span>
                    <span>40% (Sedang)</span>
                    <span>80% (Aggresif / Premium)</span>
                  </div>
                </div>

                {/* Selling Prize dynamic projection display */}
                <div className="bg-gradient-to-br from-[#0b1c30] to-[#213145] text-white p-5 rounded-2xl shadow-md space-y-4">
                  <div className="flex items-center space-x-2">
                    <CircleDollarSign className="w-5 h-5 text-[#6df5e1]" />
                    <span className="text-[10px] font-black tracking-widest text-[#cbd5e1] uppercase">Rekomendasi Penjualan SukaHitung</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="block text-[8px] tracking-wider text-gray-400 font-extrabold uppercase leading-none">Harga Jual per Unit</span>
                      <span className="text-3xl font-black text-[#6df5e1] tracking-tight">
                        Rp {Math.round(sellingPricePerUnit).toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-3 text-xs font-medium text-gray-300">
                      <div>Laba Bersih per Unit:</div>
                      <div className="text-right text-white font-extrabold">+Rp {Math.round(profitPerUnit).toLocaleString("id-ID")}</div>

                      <div>Prediksi Laba per Batch:</div>
                      <div className="text-right text-[#6df5e1] font-black">+Rp {Math.round(totalProfitPerBatch).toLocaleString("id-ID")}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Stepper Navigation Buttons matching Screen 6 */}
        <div className="flex space-x-4 pt-1 select-none">
          {step > 1 && (
            <button
              onClick={handlePrev}
              className="flex-1 py-3.5 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm rounded-xl border border-gray-200 shadow-sm flex items-center justify-center space-x-1.5 transition active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
          )}

          <button
            onClick={step === 4 ? () => { alert("Simulasi: Perhitungan HPP sukses disimpan ke profil keuangan UMKM Anda!"); setStep(1); } : handleNext}
            className="flex-[2] py-3.5 bg-gradient-to-r from-[#006b5f] to-[#0F766E] text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center space-x-2 transition hover:shadow-lg active:scale-[98]"
          >
            {step === 4 ? (
              <>
                <span>Simpan Kalkulasi</span>
                <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Selanjutnya</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
