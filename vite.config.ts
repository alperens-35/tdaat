import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // ÖNEMLİ: Eğer projeyi bir alt dizinde (örn: github.com/kullanici/kubitet-web) 
  // yayınlayacaksan repo adını buraya yazmalısın: base: '/kubitet-web/'
  // Kendi özel domainini bağlayacaksan base ayarını '/' olarak bırakabilirsin.
  base: "/", 
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false, // Üretim ortamında kaynak kodlarının okunmasını zorlaştırır
  },
});
