import React, { useState, useEffect } from "react";
import { 
  Home, 
  TrendingUp, 
  Calculator, 
  Users, 
  LogOut 
} from "lucide-react";

import { User, Transaction } from "./types";
import { DEFAULT_TRANSACTIONS } from "./data";

// Sub-views
import SplashView from "./components/SplashView";
import LoginView from "./components/LoginView";
import RegisterView from "./components/RegisterView";
import DashboardView from "./components/DashboardView";
import AnalitikView from "./components/AnalitikView";
import HppView from "./components/HppView";
import ConsultView from "./components/ConsultView";
import TransactionModal from "./components/TransactionModal";

export default function App() {
  const [activeScreen, setActiveScreen] = useState<
    "splash" | "login" | "register" | "dashboard" | "analitik" | "hpp" | "consult"
  >("splash");

  const [user, setUser] = useState<User>({
    fullName: "",
    businessName: "",
    emailOrPhone: "",
    isLoggedIn: false,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [txModalDefaultType, setTxModalDefaultType] = useState<"in" | "out">("in");

  // Load from Local Storage on Mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("sukahitung_user");
      const savedTransactions = localStorage.getItem("sukahitung_transactions");

      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        if (parsedUser.isLoggedIn) {
          setActiveScreen("dashboard");
        }
      }

      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      } else {
        setTransactions(DEFAULT_TRANSACTIONS);
        localStorage.setItem("sukahitung_transactions", JSON.stringify(DEFAULT_TRANSACTIONS));
      }
    } catch (e) {
      console.error("Local storage reading error:", e);
      setTransactions(DEFAULT_TRANSACTIONS);
    }
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem("sukahitung_user", JSON.stringify(loggedInUser));
    setActiveScreen("dashboard");
  };

  const handleRegisterSuccess = (registeredUser: User) => {
    setUser(registeredUser);
    localStorage.setItem("sukahitung_user", JSON.stringify(registeredUser));
    setActiveScreen("dashboard");
  };

  const handleLogout = () => {
    const updatedUser = {
      fullName: "",
      businessName: "",
      emailOrPhone: "",
      isLoggedIn: false,
    };
    setUser(updatedUser);
    localStorage.removeItem("sukahitung_user");
    setActiveScreen("login");
  };

  const handleOpenTransactionModal = (type: "in" | "out") => {
    setTxModalDefaultType(type);
    setIsTxModalOpen(true);
  };

  const handleSaveTransaction = (newTx: Omit<Transaction, "id" | "status" | "time">) => {
    const time = new Date().toLocaleTimeString("id", { hour: "2-digit", minute: "2-digit" });
    const status = newTx.type === "in" ? "BERHASIL" : "KELUAR";

    const completedTx: Transaction = {
      ...newTx,
      id: `tx-${Date.now()}`,
      time: time,
      status: status,
    };

    const updatedTxs = [completedTx, ...transactions];
    setTransactions(updatedTxs);
    localStorage.setItem("sukahitung_transactions", JSON.stringify(updatedTxs));
  };

  return (
    <div className="relative mx-auto max-w-md min-h-screen bg-[#F8FAFC] shadow-2xl overflow-hidden flex flex-col">
      
      {/* View routing blocks */}
      <main className="flex-1 overflow-y-auto">
        {activeScreen === "splash" && (
          <SplashView onProceed={() => setActiveScreen(user.isLoggedIn ? "dashboard" : "login")} />
        )}

        {activeScreen === "login" && (
          <LoginView
            onLoginSuccess={handleLoginSuccess}
            onNavigateToRegister={() => setActiveScreen("register")}
          />
        )}

        {activeScreen === "register" && (
          <RegisterView
            onRegisterSuccess={handleRegisterSuccess}
            onNavigateToLogin={() => setActiveScreen("login")}
          />
        )}

        {activeScreen === "dashboard" && (
          <DashboardView
            user={user}
            transactions={transactions}
            onOpenTransactionModal={handleOpenTransactionModal}
            onNavigateToHpp={() => setActiveScreen("hpp")}
            onNavigateToConsult={() => setActiveScreen("consult")}
          />
        )}

        {activeScreen === "analitik" && (
          <AnalitikView user={user} transactions={transactions} />
        )}

        {activeScreen === "hpp" && (
          <HppView user={user} />
        )}

        {activeScreen === "consult" && (
          <ConsultView user={user} />
        )}
      </main>

      {/* Persistent Bottom Tab Bar Navigation - visible ONLY when logged in */}
      {user.isLoggedIn && activeScreen !== "splash" && activeScreen !== "login" && activeScreen !== "register" && (
        <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-white/90 backdrop-blur-md rounded-t-[24px] shadow-2xl border-t border-gray-100 py-3.5 px-4 z-40">
          <div className="flex justify-between items-center px-2">
            
            {/* Dashboard tab */}
            <button
              onClick={() => setActiveScreen("dashboard")}
              className={`flex flex-col items-center space-y-1 ${
                activeScreen === "dashboard" ? "text-[#0F766E]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Home className={`w-5 h-5 transition-transform duration-200 ${activeScreen === "dashboard" ? "scale-110 stroke-[2.5]" : ""}`} />
              <span className="text-[9px] font-bold tracking-wider">Beranda</span>
            </button>

            {/* Reports tab */}
            <button
              onClick={() => setActiveScreen("analitik")}
              className={`flex flex-col items-center space-y-1 ${
                activeScreen === "analitik" ? "text-[#0F766E]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <TrendingUp className={`w-5 h-5 transition-transform duration-200 ${activeScreen === "analitik" ? "scale-110 stroke-[2.5]" : ""}`} />
              <span className="text-[9px] font-bold tracking-wider">Laporan</span>
            </button>

            {/* Stepper Wizard Calculator Tab */}
            <button
              onClick={() => setActiveScreen("hpp")}
              className={`flex flex-col items-center space-y-1 ${
                activeScreen === "hpp" ? "text-[#0F766E]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Calculator className={`w-5 h-5 transition-transform duration-200 ${activeScreen === "hpp" ? "scale-110 stroke-[2.5]" : ""}`} />
              <span className="text-[9px] font-bold tracking-wider">Hitung HPP</span>
            </button>

            {/* Consulting Expert list */}
            <button
              onClick={() => setActiveScreen("consult")}
              className={`flex flex-col items-center space-y-1 ${
                activeScreen === "consult" ? "text-[#0F766E]" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Users className={`w-5 h-5 transition-transform duration-200 ${activeScreen === "consult" ? "scale-110 stroke-[2.5]" : ""}`} />
              <span className="text-[9px] font-bold tracking-wider">Ahli</span>
            </button>

            {/* Quick action logout option */}
            <button
              onClick={handleLogout}
              className="flex flex-col items-center space-y-1 text-gray-400 hover:text-red-600 transition-colors"
              title="Keluar Akun"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-[9px] font-bold tracking-wider">Keluar</span>
            </button>
          </div>
        </nav>
      )}

      {/* Floating Add Transaction Modal Drawer Board Sheet */}
      <TransactionModal
        isOpen={isTxModalOpen}
        onClose={() => setIsTxModalOpen(false)}
        defaultType={txModalDefaultType}
        onSave={handleSaveTransaction}
      />
    </div>
  );
}
