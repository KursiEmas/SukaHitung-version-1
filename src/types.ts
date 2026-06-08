/**
 * SukaHitung Type Declarations
 */

export interface User {
  fullName: string;
  businessName: string;
  emailOrPhone: string;
  isLoggedIn: boolean;
}

export type TransactionType = "in" | "out";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  notes?: string;
  status: "BERHASIL" | "KELUAR" | "TAGIHAN" | "SETTLED";
}

export interface Consultant {
  id: string;
  name: string;
  title: string;
  specialty: string;
  rating: number;
  consultations: number;
  status: "Online" | "Offline";
  responseTime: string;
  avatarUrl: string;
  price: number;
}

export interface BookingSlot {
  timeRange: string;
  status: "AVAILABLE" | "BOOKED" | "ALMOST FULL";
}

export interface HppState {
  rawMaterialCost: number; // Step 1
  packagingCost: number; // Step 2
  operationalCost: number; // Step 2 (Utilities, Rent)
  laborCost: number; // Step 3
  batchSize: number; // Step 3 (Units produced per batch)
  profitMargin: number; // Step 4 (%)
}
