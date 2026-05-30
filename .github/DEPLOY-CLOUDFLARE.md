# hakanyemcilik.com guncellenmiyorsa (Cloudflare)

`hakanyemcilik.com` **Cloudflare** uzerinden yayinlaniyor. Sadece GitHub'a push etmek yetmez;
Cloudflare Pages projesinin de guncellenmesi gerekir.

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

### 4) Pages proje adi

Cloudflare → **Workers & Pages** → projenizin adi (or. `hakanyemcilik`)

Farkliysa repo → **Settings** → **Variables** → **Repository variable**:

- `CLOUDFLARE_PAGES_PROJECT` = proje adiniz

### 5) Tetikle

**Actions** → **Deploy to Cloudflare Pages** → **Run workflow**

veya `main` branch'e kucuk bir commit push edin.

1–3 dakika sonra https://hakanyemcilik.com — **Ctrl+F5**

## Alternatif: DNS'i GitHub Pages'e al

`.github/CLOUDFLARE-DNS.md` dosyasindaki adimlarla eski Cloudflare Pages projesini kapatin
ve domain'i `yigitugurlucimen.github.io` adresine yonlendirin.

Guncel site (her zaman): https://yigitugurlucimen.github.io/hakanyemcilik/
