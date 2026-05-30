# hakanyemcilik.com → GitHub Pages

Site **GitHub Actions** ile yayinlaniyor (`main` push → Pages).

**Onemli:** `hakanyemcilik.com` hâlâ eski **Cloudflare Pages** projesine gidiyorsa,
GitHub'a push etseniz bile canli sitede fiyat/gorsel guncellenmez. Kontrol:

- https://yigitugurlucimen.github.io/hakanyemcilik/product-images/by-slug/roehnfried-gervit-w.png → `image/png` olmali
- https://hakanyemcilik.com/product-images/by-slug/roehnfried-gervit-w.png → `text/html` ise domain yanlis yere bakiyor

Cloudflare'deki eski Pages projesi veya yanlis DNS kayitlari canli siteyi bozar.

## 1) Cloudflare Pages (varsa)

- Workers & Pages → ilgili proje → **Custom domains** → `hakanyemcilik.com` kaldirin
- Veya projeyi tamamen silin (cakisma onlenir)

## 2) DNS kayitlari (Cloudflare → DNS)

**Onerilen:** Proxy **kapali** (gri bulut / DNS only)

| Tip | Ad | Hedef |
|-----|-----|--------|
| CNAME | `www` | `yigitugurlucimen.github.io` |
| CNAME | `@` | `yigitugurlucimen.github.io` |

Kok `@` CNAME desteklenmiyorsa GitHub'in verdigi **A** kayitlarini kullanin:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

## 3) GitHub

Repo → **Settings → Pages → Custom domain** → `hakanyemcilik.com`  
DNS dogrulandiktan sonra **Enforce HTTPS** acik olsun.

## 4) Kontrol

- https://hakanyemcilik.com — fiyatlar ve urunler
- https://yigitugurlucimen.github.io/hakanyemcilik/ — yedek adres

Degisiklik 5–30 dakika surebilir. Tarayicida Ctrl+F5 yapin.
