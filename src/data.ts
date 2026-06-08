import { Transaction, Consultant, BookingSlot } from "./types";

// Helper to format dates near today's date
const getRelativeDate = (offsetDays: number) => {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  return d.toISOString().split("T")[0];
};

export const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    title: "Penjualan Kopi",
    amount: 45000,
    type: "in",
    category: "Penjualan",
    date: getRelativeDate(0), // Today
    time: "14:20",
    notes: "Penjualan espresso n' latte x3",
    status: "BERHASIL",
  },
  {
    id: "tx-2",
    title: "Bahan Baku Susu",
    amount: 250000,
    type: "out",
    category: "Bahan Baku",
    date: getRelativeDate(0), // Today
    time: "10:15",
    notes: "Susu UHT Fresh milk carton x10",
    status: "KELUAR",
  },
  {
    id: "tx-3",
    title: "Penjualan Snack",
    amount: 120000,
    type: "in",
    category: "Penjualan",
    date: getRelativeDate(1), // Yesterday
    time: "18:45",
    notes: "Keripik singkong pedas & kentang",
    status: "BERHASIL",
  },
  {
    id: "tx-4",
    title: "Listrik & Air",
    amount: 850000,
    type: "out",
    category: "Operasional",
    date: getRelativeDate(2),
    time: "09:00",
    notes: "Tagihan Air & Listrik Ruko Juni",
    status: "TAGIHAN",
  },
  {
    id: "tx-5",
    title: "Pendapatan QRIS",
    amount: 340000,
    type: "in",
    category: "Penjualan",
    date: getRelativeDate(3),
    time: "21:00",
    notes: "Pelunasan QRIS pembeli sore hari",
    status: "SETTLED",
  },
];

export const CONSULTANTS: Consultant[] = [
  {
    id: "cons-1",
    name: "Na Jisoo, M.Ak",
    title: "Spesialis Pajak & Audit UMKM",
    specialty: "Akuntan Publik",
    rating: 4.9,
    consultations: 257,
    status: "Online",
    responseTime: "Respon Cepat",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    price: 150000,
  },
  {
    id: "cons-2",
    name: "Budi Santoso, S.E.",
    title: "Perencana Keuangan UMKM",
    specialty: "Akuntan Publik",
    rating: 4.8,
    consultations: 184,
    status: "Offline",
    responseTime: "Respon Cepat",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    price: 120000,
  },
  {
    id: "cons-3",
    name: "Ahmad Farhan, Ak.",
    title: "Konsultan Pajak & Retribusi Dagang",
    specialty: "Konsultan Pajak",
    rating: 4.7,
    consultations: 92,
    status: "Online",
    responseTime: "Respon Sedang",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    price: 100000,
  },
];

export const BOOKING_SLOTS: BookingSlot[] = [
  { timeRange: "09:00 - 10:00", status: "AVAILABLE" },
  { timeRange: "10:30 - 11:30", status: "BOOKED" },
  { timeRange: "13:00 - 14:00", status: "ALMOST FULL" },
  { timeRange: "15:00 - 16:00", status: "AVAILABLE" },
];
