# DevOps Frontend

## Amaç ve Kullanılan Teknolojiler
Bu proje, DevOps eğitim projesi kapsamında geliştirilen basit bir frontend uygulamasıdır.

- **Teknoloji:** Düz HTML, CSS, JavaScript (framework yok, build adımı gerekmez)
- **Web Sunucusu:** Nginx (statik dosya sunumu)
- **CI/CD:** GitHub Actions

## Canlı Adres
https://aziz-frontend.team-vit-devops.nl

## Özellikler
- Ana sayfa
- "Backend'i Kontrol Et" butonu ile backend'in `/api/health` endpoint'ine istek atma
- Backend'den gelen cevabın ekranda gösterilmesi
- Sayfa altında backend'in `/api/info` endpoint'inden çekilen versiyon/ortam bilgisi

## Local Ortamda Çalıştırma
Build adımı gerekmediği için `index.html` dosyasını doğrudan bir tarayıcıda açabilir,
veya basit bir local sunucu ile çalıştırabilirsin:

```bash
git clone <bu-repo-url>
cd devops-frontend
npx serve .
```

## Backend Bağlantısı
`script.js` içindeki `BACKEND_URL` sabiti, backend API'nin adresini tutar:

```js
const BACKEND_URL = "https://aziz-backend.team-vit-devops.nl";
```

## Production'a Deploy Süreci
1. `main` branch'ine yapılan her push, GitHub Actions workflow'unu (`.github/workflows/deploy.yml`) tetikler.
2. Workflow, dosyaları SSH/SCP ile sunucuya (`SERVER_SSH_KEY` secret'ı ile, parola kullanılmadan) gönderir.
3. Dosyalar `/var/www/frontend-app` dizinine kopyalanır.
4. Nginx yapılandırması test edilir (`nginx -t`) ve gerekirse reload edilir.

Sunucuya manuel bağlanıp `git pull` yapmak bu projede kabul edilen bir yöntem değildir; tüm süreç GitHub Actions üzerinden otomatik yürür.

## Kullanılan GitHub Secrets
| Secret | Açıklama |
|--------|----------|
| `SERVER_HOST` | VPS IP adresi |
| `SERVER_USER` | Deployment için kısıtlı yetkili kullanıcı (root değil) |
| `SERVER_SSH_KEY` | SSH private key |
| `SERVER_PORT` | SSH portu |
| `DEPLOY_PATH` | Sunucuda frontend dosyalarının bulunduğu dizin |
