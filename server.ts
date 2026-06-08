import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with custom User-Agent for Telemetry
const initGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("WARNING: GEMINI_API_KEY is not configured or using placeholder.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

const ai = initGemini();

// API: AI Financial Analysis for Indonesian UMKM
app.post("/api/ai-analyse", async (req, res) => {
  try {
    const { businessName, ownerName, transactions, summary } = req.body;

    const transactionListText = (transactions || [])
      .map(
        (t: any) =>
          `- ${t.date} | ${t.type === "in" ? "Pemasukan (+)" : "Pengeluaran (-)"} | ${t.category} | Rp ${parseFloat(t.amount).toLocaleString("id-ID")} | Catatan: ${t.notes || "Tidak ada"}`
      )
      .join("\n");

    const prompt = `Analisis keuangan untuk bisnis:
Nama Bisnis: ${businessName || "UMKM Saya"}
Pemilik: ${ownerName || "Sahabat UMKM"}
Omzet Terakhir: Rp ${(summary?.totalIn || 84200000).toLocaleString("id-ID")}
Pengeluaran Terakhir: Rp ${(summary?.totalOut || 32100000).toLocaleString("id-ID")}
Saldo Saat Ini: Rp ${(summary?.balance || 24500000).toLocaleString("id-ID")}

Daftar Transaksi Terbaru:
${transactionListText || "- Belum ada transaksi terbaru."}

Mohon berikan:
1. Analisis singkat kondisi keuangan bisnis ini (apakah sehat, stabil, atau perlu hati-hati?).
2. 3 Rekomendasi konkret dalam Bahasa Indonesia untuk meningkatkan omzet atau menekan biaya operasional.
3. Estimasi pertumbuhan arus kas dalam 30 hari ke depan berdasarkan data ini.
Biarkan jawaban terstruktur dengan rapi menggunakan Markdown. Jawab dengan sangat ringkas dan to-the-point agar mudah dibaca oleh pedagang kecil.`;

    if (!ai) {
      // Graceful simulated response if API key is missing
      return res.json({
        success: true,
        text: `### 📊 Analisis Keuangan SUKAHITUNG AI (Simulasi)

Halo **${ownerName || "Jay"}**, kondisi keuangan **${businessName || "UMKM Maju Jaya"}** secara umum cukup **STABIL** dengan rasio pengeluaran sebesar **${Math.round(((summary?.totalOut || 32100000) / (summary?.totalIn || 84200000)) * 100)}%** dari total omzet.

#### 💡 Rekomendasi Utama:
1. **Efisiensi Bahan Baku:** Dikarenakan pengeluaran terbesar Anda adalah untuk bahan baku, cobalah bernegosiasi dengan pemasok untuk skema pembayaran berkala (termin) guna melonggarkan arus kas harian.
2. **Optimalisasi Anggaran Iklan:** Alokasi iklan digital Anda cukup produktif, namun pastikan konversi penjualan dipantau ketat secara mingguan agar ROI tetap positif.
3. **Dana Darurat Arus Kas:** Cadangkan minimal 10% dari omzet bulan ini untuk pos biaya tak terduga seperti perbaikan peralatan atau fluktuasi harga energi.

*Catatan: Segera konfigurasikan GEMINI_API_KEY di panel Secrets AI Studio Anda untuk memperoleh analisis keuangan real-time yang didukung AI penuh berdasarkan pembukuan mutakhir Anda!*`,
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Anda adalah analis keuangan bisnis bersertifikat khusus untuk UMKM (Usaha Mikro, Kecil, dan Menengah) di Indonesia. Berikan wawasan keuangan yang ringkas, strategis, dan ramah pengguna mengenai arus kas, omzet, pengeluaran, serta rekomendasi keuangan. Jawablah dalam Bahasa Indonesia yang profesional, ramah, dan membimbing pedagang/pelaku UMKM agar sukses.",
        temperature: 0.7,
      },
    });

    const outputText = response.text || "Tidak ada analisis yang dihasilkan.";
    res.json({ success: true, text: outputText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      success: false,
      message: "Gagal memproses analisis AI.",
      error: error.message || error,
    });
  }
});

// Configure Vite or Static Files
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static production files from dist/...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SUKAHITUNG dev server running on http://localhost:${PORT}`);
  });
}

setupVite();
