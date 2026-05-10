# CV Analyzer - Setup Kılavuzu

Bu proje full-stack bir uygulamadır: Spring Boot backend (Java) ve React frontend (TypeScript).

## Sistem Gereksinimleri

- Docker & Docker Compose (önerilir)
- VEYA yerel kurulum için:
  - Java 17+
  - Node.js 18+
  - PostgreSQL 16
  - Redis 7
  - MinIO

## Kurulum Seçenek 1: Docker Compose (Önerilir)

### 1. Backend Klasörüne Gidin
```bash
cd cv-analyzer-backend
```

### 2. Docker Compose Başlatın
```bash
docker-compose up -d
```

Bu komut otomatik olarak başlatır:
- Spring Boot Backend (port 8080)
- PostgreSQL (port 5432)
- Redis (port 6379)
- MinIO (port 9000/9001)

### 3. Frontend'i Başlatın (Yeni Terminal)
```bash
cd cv-analyzer-frontend
npm install
npm run dev
```

Frontend default olarak `http://localhost:5173` adresinde açılacak.

### 4. Tarayıcıda Açın
- Frontend: http://localhost:3000 veya http://localhost:5173
- Backend: http://localhost:8080/api/v1
- MinIO Console: http://localhost:9001 (minioadmin/minioadmin)

---

## Kurulum Seçenek 2: Yerel Ortam

### Önkoşullar Kurulumu

1. **PostgreSQL** (Windows):
```bash
# PostgreSQL yükleyin ve şu ayarlarla bir database oluşturun:
# Host: localhost
# Port: 5432
# Database: cvanalyzer
# User: postgres
# Password: 1234
```

2. **Redis** (Windows):
```bash
# Redis yükleyin veya Docker ile başlatın:
docker run -d -p 6379:6379 redis:7-alpine
```

3. **MinIO** (Windows):
```bash
# MinIO Docker ile başlatın:
docker run -d -p 9000:9000 -p 9001:9001 \
  -e MINIO_ROOT_USER=minioadmin \
  -e MINIO_ROOT_PASSWORD=minioadmin \
  minio/minio server /data --console-address ":9001"
```

### Backend Başlatma

```bash
cd cv-analyzer-backend

# local profile ile başlatın
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=local"

# VEYA Maven build sonra çalıştırın
mvn clean package
java -Dspring.profiles.active=local -jar target/cv-analyzer-*.jar
```

### Frontend Başlatma

```bash
cd cv-analyzer-frontend
npm install
npm run dev
```

---

## Ortam Değişkenleri

### Backend (.env dosyası veya sistem değişkenleri)

```env
# İsteğe bağlı - default değerler vardır
DB_URL=jdbc:postgresql://localhost:5432/cvanalyzer
DB_USERNAME=postgres
DB_PASSWORD=1234
REDIS_HOST=localhost
REDIS_PORT=6379
MINIO_ENDPOINT=http://localhost:9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin

# Gerekli
OPENAI_API_KEY=your_openai_api_key_here
JWT_SECRET=your_jwt_secret_here
GITHUB_TOKEN=your_github_token_here (opsiyonel)
```

### Frontend (.env dosyası - Zaten Yapılandırılı)

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
VITE_WS_URL=http://localhost:8080/ws
VITE_GITHUB_API=https://api.github.com
```

---

## Sorun Giderme

### "Address Not Found" Hatası
1. **Backend kontrol edin**: `http://localhost:8080/actuator/health` ziyaret edin
2. **Veritabanı bağlantısını kontrol edin**: PostgreSQL çalışıyor mu?
3. **CORS hatası**: Tarayıcı konsolunda hata var mı?
   - Düzeltildi: SecurityConfig.java CORS konfigürasyonu eklendi

### Backend Başlamıyor
```bash
# Logları kontrol edin
docker logs <container_id>

# Veya local çalıştırıyorsanız Maven çıktısını kontrol edin
```

### Database Bağlantısı Başarısız
- PostgreSQL çalıştığını doğrulayın
- Kullanıcı adı/şifre doğru mu?
- `application.yml` veya `application-local.yml` kontrol edin

### Redis Bağlantı Hatası
```bash
# Redis çalışıp çalışmadığını kontrol edin
redis-cli ping
```

---

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Kullanıcı kaydı
- `POST /api/v1/auth/login` - Giriş

### CV Operations (Authentication gerekli)
- `POST /api/v1/cv/upload` - CV dosyası yükle
- `POST /api/v1/cv/{cvId}/analyze` - CV analizi başlat
- `GET /api/v1/cv/{cvId}/result` - Analiz sonuçlarını al

### WebSocket
- `ws://localhost:8080/ws` - Real-time güncellemeler için

---

## Development Tips

- **Hot Reload Frontend**: `npm run dev` zaten live reloading destekliyor
- **Backend Debugging**: IDE'de debug modunda çalıştırın
- **Database Reset**: `ddl-auto: create-drop` ile database otomatik reset olur
- **API Testing**: Postman veya Thunder Client kullanabilirsiniz

---

## Deployment

Docker Compose ile üretim için:
1. `.env` dosyasında gerçek API anahtarlarını ayarlayın
2. `docker-compose up -d` çalıştırın
3. Frontend için vercel/netlify/github pages kullanın

