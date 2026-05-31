# PetaTutur-tourism-culture-exchange-website
Peta Tutur is a Spatial-Temporal Cultural Optimizer and web itinerary engine. It promotes hidden heritage sites by generating highly efficient travel routes. The platform processes spatial data, weather forecasts, and site constraints via external APIs to connect travelers with local folklore through a data-driven exploration experience.

## Akses Superadmin
Untuk demo lokal, buka gerbang Superadmin dengan klik logo "Peta Tutur" 5 kali di halaman utama, lalu masukkan `SUPERADMIN_GATE_KEY` dari `.env` (`aksara-tutur-1979` pada `.env.example`).

## Seed Data Budaya
Setelah import `db/schema.sql`, jalankan:

```bash
npm run seed:culture
```

Perintah ini mengisi ulang data budaya terkurasi: 12 provinsi, 144 lokasi wisata asli, dan 360 aset budaya. Setiap provinsi memiliki 30 aset campuran `Audio`, `Cerita/Narasi`, dan `Catatan Budaya`, dengan audio dibatasi maksimal 6 per provinsi.
