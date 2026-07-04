## Yönetim Paneli Planı

`/admin` altında sadece **admin** rolündeki kullanıcıların erişebileceği bir yönetim paneli ekleyeceğim.

### 1. Veritabanı (yeni tablolar)

- `events` — etkinlikler (slug, başlık, tarih/saat, konum, kategori, kısa & uzun açıklama, başlangıç/bitiş, görsel URL, geçmiş/gelecek)
- `blog_posts` — blog yazıları (slug, başlık, özet, yazar, kategori, içerik, yayın tarihi)
- `news_items` — Türk Dünyası haberleri (başlık, özet, içerik paragrafları, ülke, kategori, kaynak, tarih)
- `gallery_images` — galeri (başlık, açıklama, görsel URL, sıralama)

Ortak: `id`, `created_at`, `updated_at`, `created_by`.

**Erişim politikaları:**
- SELECT: herkes (public site okuyor) — `TO anon, authenticated`
- INSERT/UPDATE/DELETE: sadece `has_role(auth.uid(), 'admin')`

**Storage:** `public-media` adlı public bucket — panelden görsel yüklemek için. RLS: okuma herkese açık, yazma sadece admin.

**Rol ataması:** `yhk24052206@gmail.com` hesabı ilk giriş yaptıktan sonra `user_roles` tablosuna `admin` satırı eklenir (auth.users tetiklendiğinde otomatik veya bir kez elle insert).

### 2. Statik veriden geçiş

Mevcut `events-data.ts`, `blog-data.ts`, `turk-dunya-data.ts` içindeki tüm kayıtlar aynı migrasyonda `INSERT` edilecek. Kod tarafında bu dosyalar kaldırılıp yerlerine DB'den okuyan server function'lar konacak:
- `getEvents`, `getEvent(slug)`
- `getBlogPosts`, `getBlogPost(slug)`
- `getNewsItems`, `getNewsItem(id)`
- `getGalleryImages`

Public sayfalar (`events`, `blog`, `turk-dunyasi`, `galeri`) loader üzerinden DB'den çeker. Kültür/akademik statik kalır (kapsam dışı — istenmedi).

### 3. Admin arayüzü

Yeni pathless layout: `src/routes/_admin/` — `beforeLoad` içinde `admin` rolü doğrulanır, değilse `/` sayfasına redirect. Sidebar'lı düzen:

- `/admin` — özet (sayaçlar)
- `/admin/events` — liste + "Yeni etkinlik" + düzenle/sil
- `/admin/events/$id` — form (görsel yükleme dahil)
- `/admin/blog` — liste + form
- `/admin/news` — liste + form (paragraflar textarea)
- `/admin/gallery` — grid + yükle + sil + yeniden sırala
- `/admin/uyelikler` — `membership_applications` listesi (onayla/reddet — mevcut tablodaki `status` alanını günceller)

Server function'lar (`.middleware([requireSupabaseAuth])` + admin rol kontrolü) tüm mutation'ları yürütür. Görseller `public-media` bucket'ına yüklenir, `getPublicUrl` ile URL alınır ve ilgili satırda tutulur.

### 4. Navigasyon

Header'da admin girişi yapılmışsa "Yönetim" linki görünür. Sign-out düzeltilir (cache temizliği + `/auth` redirect).

### Teknik notlar
- Tüm mutation'lar Zod ile doğrulanır.
- Mevcut `_authenticated` layout'u değişmez; `_admin` ondan bağımsız olur (sadece admin gerektirir).
- Statik veri dosyaları kaldırıldığı için `image` alanları migrasyonda korunur (`/__l5e/...` URL'leri aynen taşınır).

Onaylarsan uygulamaya başlayacağım.