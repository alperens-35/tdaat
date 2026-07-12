/**
 * tdaat - Medya Sıkılaştırma ve Optimizasyon Motoru
 * Güvenlik ve Kota Tasarrufu İçin İstemci Tarafında (Client-Side) WebP Dönüştürücü
 */

/**
 * Ham görsel dosyasını alır, doğrular, boyutlandırır ve .webp olarak optimize eder.
 * @param file Kullanıcının input alanından seçtiği ham dosya
 * @returns Sıkıştırılmış ve güvenli hale getirilmiş yeni File nesnesi
 */
export async function optimizeAndValidateImage(file: File): Promise<File> {
  // 1. Girdi Doğrulaması (Saldırı Yüzeyini Sınırlama)
  const MAX_INPUT_SIZE = 15 * 1024 * 1024; // Maksimum 15MB ham girdi sınırı
  if (file.size > MAX_INPUT_SIZE) {
    throw new Error("Yüklemeye çalıştığınız dosya çok büyük. Maksimum 15MB ham görsel yüklenebilir.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Yüklenen dosya geçerli bir görsel formatı değil.");
  }

  // 2. Tarayıcı Tabanlı Optimizasyon (Canvas API)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Maksimum Kabul Edilebilir Boyut Sınırları (Ölçekleme)
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width / height > MAX_WIDTH / MAX_HEIGHT) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Görsel işleme bağlamı (Canvas Context) oluşturulamadı."));
          return;
        }

        // Görseli yeni boyutlarla Canvas üzerine çiz
        ctx.drawImage(img, 0, 0, width, height);

        // Görseli .webp formatına %75 kalite kalibrasyonu ile sıkıştır
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Görsel sıkıştırma işlemi başarısız oldu."));
              return;
            }

            // Dosya adını temizle ve uzantısını .webp yap
            const cleanName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
            
            const optimizedFile = new File([blob], cleanName, {
              type: "image/webp",
              lastModified: Date.now(),
            });

            resolve(optimizedFile);
          },
          "image/webp",
          0.75 // Kalite çarpanı (0.0 - 1.0)
        );
      };
      img.onerror = () => reject(new Error("Görsel nesnesi yüklenirken hata oluştu."));
    };
    reader.onerror = () => reject(new Error("Dosya okuma mekanizması başarısız oldu."));
  });
}

/**
 * Supabase Storage yükleme fonksiyonunu sarmalayan (Wrapper) güvenli metod.
 * Admin panellerindeki upload tetikleyicilerinde doğrudan bu çağrılmalıdır.
 */
import { supabase } from "@/integrations/supabase/client";

export async function safeMediaUpload(file: File, bucketName: string = "public-media"): Promise<string> {
  try {
    // Görseli yüklemeden önce optimize et
    const optimizedFile = await optimizeAndValidateImage(file);
    
    // Çakışmaları önlemek için benzersiz bir dosya adı üret (Timestamp + Random String)
    const fileExt = "webp";
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Supabase'e yükle
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, optimizedFile, {
        cacheControl: "31536000",
        upsert: false
      });

    if (error) throw error;

    // Genel erişim URL'ini al ve dön
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error: any) {
    console.error("Medya yükleme hatası:", error);
    throw new Error(error.message || "Medya yüklenirken beklenmedik bir hata oluştu.");
  }
}