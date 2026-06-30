# Supabase kurulumu

## 1. SQL (tek sefer)

Supabase Dashboard → **SQL Editor** → **New query** → `full-setup.sql` içeriğini yapıştırıp **Run**.

Sipariş sistemi için ayrıca `phase-c-orders.sql` dosyasını da bir kez çalıştırın (güncel sürüm `is_admin` fonksiyonunu içerir).

## 2. Admin hesabı

**Authentication** → **Users** → kullanıcı oluşturun, ardından birini seçin:

- **App Metadata**: `{"role":"admin"}`
- veya SQL: `INSERT INTO public.admin_allowlist (email) VALUES ('sizin@eposta.com');`

Yerel/canlı build için GitHub secret veya `.env`: `VITE_ADMIN_EMAILS=sizin@eposta.com`

## 3. Veri doldurma

Yerelde (`.env` içinde `SUPABASE_SERVICE_ROLE_KEY` gerekli):

```bash
npm run sync:images
npm run seed:products
npm run seed:content
npm run check:supabase
```

GitHub Actions: **Seed Supabase** workflow → **Run workflow**  
(Gerekli secrets: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
