# hakanyemcilik.com guncellenmiyorsa (Cloudflare)

`hakanyemcilik.com` **Cloudflare** uzerinden yayinlaniyor. Sadece GitHub'a push etmek yetmez;
Cloudflare Pages projesinin de guncellenmesi gerekir.

## Belirti: Sadece "Hakan Yemcilik" basligi, bos sayfa

Canli sitede sayfa kaynagina bakin (Ctrl+U). Asagidaki satir **yanlis** (gelistirme surumu):

```html
<script type="module" src="/src/main.jsx"></script>
```

Dogru production build su sekilde olmali:

```html
<script type="module" crossorigin src="./assets/index-xxxxx.js"></script>
```

**Neden:** Cloudflare Pages projesi `dist/` yerine repo kokunu yayinliyor; Vite build calismiyor.

**Hizli test:**

| URL | Beklenen |
|-----|----------|
| `hakanyemcilik.com/product-images/.../roehnfried-gervit-w.png` | `image/png` |
| Yanlis yapilandirmada | `text/html` (SPA fallback) |

GitHub Pages yedek adresi her zaman dogru build'i gosterir:
https://yigitugurlucimen.github.io/hakanyemcilik/

## Hizli cozum (5 dakika)

### 1) Cloudflare API token

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **My Profile** → **API Tokens**
2. **Create Token** → sablon: **Edit Cloudflare Workers** (veya Custom: Account + **Cloudflare Pages: Edit**)
3. Token'i kopyalayin (bir daha gosterilmez)

### 2) Account ID

Cloudflare ana sayfada sag altta veya **Workers & Pages** → Overview → **Account ID**

### 3) GitHub Secrets

Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Secret | Deger |
|--------|--------|
| `CLOUDFLARE_API_TOKEN` | Az onceki token |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID |

(Zaten varsa: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)

### 4) Cloudflare build ayarlari (kritik)

Cloudflare → **Workers & Pages** → `hakanyemcilik-web` → **Settings** → **Builds**:

| Alan | Deger |
|------|--------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (bos) |

**Environment variables** (Production):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_ADMIN_EMAILS` (opsiyonel)

Projede **Git baglantisi** varsa ve GitHub Actions ile cakisiyorsa:

- Ya yukaridaki build ayarlarini duzeltin (onerilen),
- Ya da Cloudflare'deki **Git entegrasyonunu kaldirin**; sadece GitHub Actions `Deploy to Cloudflare Pages` workflow'u deploy etsin.

### 5) Pages proje adi

Cloudflare proje adi: **`hakanyemcilik-web`**

GitHub Actions workflow bu projeye deploy eder ve Supabase env degiskenlerini Cloudflare'e senkronlar.

### 6) Tetikle

**Actions** → **Deploy to Cloudflare Pages** → **Run workflow**

veya `main` branch'e kucuk bir commit push edin.

1–3 dakika sonra https://hakanyemcilik.com — **Ctrl+F5**

## Alternatif: DNS'i GitHub Pages'e al

`.github/CLOUDFLARE-DNS.md` dosyasindaki adimlarla eski Cloudflare Pages projesini kapatin
ve domain'i `yigitugurlucimen.github.io` adresine yonlendirin.

Guncel site (her zaman): https://yigitugurlucimen.github.io/hakanyemcilik/
