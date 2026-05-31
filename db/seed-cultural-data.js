import db from './db.js';
import { pathToFileURL } from 'url';

const SEED_PROVIDER = {
    name: 'Peta Tutur Cultural Seed',
    email: 'seed-provider@petatutur.local',
    password: 'seed123',
    agency: 'Peta Tutur Cultural Data Lab'
};

export const REGION_DATA = [
    {
        region: 'DKI Jakarta',
        description: 'Ruang temu Betawi, sejarah kolonial, museum nasional, dan kampung kota yang terus bergerak.',
        tags: ['betawi', 'sejarah', 'museum', 'kota tua', 'maritim'],
        locations: [
            ['Jakarta Pusat', 'Monas', 'Monumen nasional yang menyimpan narasi kemerdekaan, ruang publik, dan memori politik Indonesia.', 'Sejarah', ['kemerdekaan', 'monumen']],
            ['Jakarta Barat', 'Kota Tua Jakarta', 'Kawasan cagar budaya dengan lapisan sejarah Batavia, museum, plaza, dan bangunan kolonial.', 'Sejarah', ['batavia', 'kolonial']],
            ['Jakarta Barat', 'Museum Fatahillah', 'Museum Sejarah Jakarta di bekas balai kota Batavia yang menampilkan artefak kota dan administrasi kolonial.', 'Museum', ['museum', 'batavia']],
            ['Jakarta Pusat', 'Museum Nasional Indonesia', 'Museum arkeologi, etnografi, dan sejarah yang menyimpan koleksi lintas Nusantara.', 'Museum', ['arkeologi', 'etnografi']],
            ['Jakarta Timur', 'Taman Mini Indonesia Indah', 'Taman budaya yang memperkenalkan rumah adat, anjungan provinsi, dan ragam tradisi Nusantara.', 'Budaya', ['rumah adat', 'nusantara']],
            ['Jakarta Selatan', 'Setu Babakan', 'Perkampungan Budaya Betawi dengan kuliner, danau, rumah tradisional, dan pertunjukan lokal.', 'Masyarakat Adat', ['betawi', 'kampung budaya']],
            ['Jakarta Pusat', 'Masjid Istiqlal', 'Masjid nasional Indonesia yang menjadi penanda arsitektur modern dan ruang perjumpaan keagamaan.', 'Religi', ['arsitektur', 'religi']],
            ['Jakarta Pusat', 'Gereja Katedral Jakarta', 'Gereja bergaya neogotik di seberang Istiqlal yang mencatat sejarah komunitas Katolik Jakarta.', 'Religi', ['arsitektur', 'neogotik']],
            ['Jakarta Utara', 'Pelabuhan Sunda Kelapa', 'Pelabuhan tua yang masih memperlihatkan perahu pinisi dan jejak perdagangan maritim.', 'Maritim', ['pinisi', 'pelabuhan']],
            ['Jakarta Utara', 'Museum Bahari', 'Museum di kawasan gudang tua yang memuat sejarah pelayaran, perdagangan rempah, dan kehidupan pesisir.', 'Museum', ['maritim', 'rempah']],
            ['Jakarta Barat', 'Glodok Pancoran', 'Kawasan pecinan tua dengan klenteng, toko obat, kuliner, dan jejaring dagang komunitas Tionghoa.', 'Budaya', ['pecinan', 'kuliner']],
            ['Kepulauan Seribu', 'Pulau Onrust', 'Pulau bersejarah yang pernah menjadi galangan kapal, karantina, dan bagian sistem pertahanan Teluk Jakarta.', 'Sejarah', ['pulau', 'maritim']]
        ],
        themes: [
            ['Tradisi Betawi', 'Budaya Betawi terbentuk dari perjumpaan Melayu, Arab, Tionghoa, Sunda, Jawa, dan Eropa dalam sejarah kota pelabuhan.'],
            ['Jejak Batavia', 'Kawasan tua Jakarta memperlihatkan perubahan dari kota dagang VOC menuju ibu kota modern Indonesia.'],
            ['Memori Maritim', 'Sunda Kelapa dan Teluk Jakarta menandai pentingnya jalur laut, kapal, gudang, dan perdagangan rempah.'],
            ['Ruang Religi', 'Istiqlal dan Katedral menjadi contoh kedekatan ruang ibadah besar yang sering dibaca sebagai simbol toleransi.'],
            ['Museum Kota', 'Museum di Jakarta menyimpan artefak yang menjelaskan administrasi kota, ilmu pengetahuan, dan kehidupan warga.'],
            ['Kampung Budaya', 'Setu Babakan memperlihatkan bagaimana rumah, kuliner, musik, dan bahasa Betawi dirawat di tengah urbanisasi.']
        ],
        featuredAssets: []
    },
    {
        region: 'Jawa Barat',
        description: 'Tanah Pasundan dengan seni bambu, kampung adat, arsitektur kota, dan bentang alam vulkanik.',
        tags: ['sunda', 'angklung', 'kampung adat', 'vulkanik', 'arsitektur'],
        locations: [
            ['Bandung', 'Saung Angklung Udjo', 'Pusat pelestarian angklung yang memadukan pertunjukan, edukasi, dan pembuatan alat musik bambu.', 'Seni Budaya', ['angklung', 'musik']],
            ['Cimahi', 'Kampung Adat Cireundeu', 'Kampung adat yang dikenal dengan tradisi pangan rasi berbahan singkong dan praktik hidup komunal.', 'Masyarakat Adat', ['adat', 'pangan lokal']],
            ['Bandung', 'Gedung Sate', 'Ikon arsitektur Bandung dengan puncak tusuk sate dan sejarah administrasi pemerintahan Jawa Barat.', 'Sejarah', ['arsitektur', 'kolonial']],
            ['Bandung Barat', 'Tangkuban Perahu', 'Gunung api aktif yang terhubung dengan cerita Sangkuriang dan lanskap kawah Priangan.', 'Alam & Cerita Rakyat', ['legenda', 'vulkanik']],
            ['Bandung', 'Kawah Putih', 'Danau kawah di kawasan Ciwidey dengan warna air khas akibat aktivitas vulkanik.', 'Alam', ['kawah', 'vulkanik']],
            ['Bandung', 'Situ Patenggang', 'Danau wisata di dataran tinggi yang dikenal lewat cerita Batu Cinta dan lanskap perkebunan teh.', 'Alam & Cerita Rakyat', ['danau', 'legenda']],
            ['Bandung', 'Museum Geologi Bandung', 'Museum ilmu bumi dengan koleksi batuan, fosil, dan penjelasan sejarah geologi Indonesia.', 'Museum', ['geologi', 'fosil']],
            ['Tasikmalaya', 'Kampung Naga', 'Kampung adat Sunda yang menjaga tata ruang, rumah panggung, dan tradisi hidup sederhana.', 'Masyarakat Adat', ['adat', 'arsitektur']],
            ['Cirebon', 'Keraton Kasepuhan Cirebon', 'Keraton tua Cirebon yang mencerminkan perjumpaan budaya Jawa, Sunda, Islam, Tionghoa, dan Eropa.', 'Sejarah', ['keraton', 'cirebon']],
            ['Cirebon', 'Taman Sari Gua Sunyaragi', 'Situs taman air dan gua buatan yang berkaitan dengan sejarah Keraton Cirebon.', 'Sejarah', ['gua', 'keraton']],
            ['Bogor', 'Kebun Raya Bogor', 'Kebun botani bersejarah yang menjadi pusat koleksi tumbuhan tropis dan riset botani.', 'Alam & Edukasi', ['botani', 'kolonial']],
            ['Sumedang', 'Museum Prabu Geusan Ulun', 'Museum yang menyimpan koleksi sejarah Sumedang Larang dan budaya Sunda Priangan.', 'Museum', ['sumedang', 'sunda']]
        ],
        themes: [
            ['Seni Bambu Sunda', 'Angklung dikenal sebagai alat musik bambu yang dimainkan bersama, menonjolkan harmoni sosial dalam budaya Sunda.'],
            ['Pangan Rasi Cireundeu', 'Masyarakat Cireundeu mempertahankan rasi dari singkong sebagai identitas pangan dan simbol kemandirian.'],
            ['Legenda Sangkuriang', 'Cerita Sangkuriang sering digunakan untuk membaca lanskap Tangkuban Perahu dalam imajinasi masyarakat Sunda.'],
            ['Arsitektur Priangan', 'Bangunan publik di Bandung menyimpan lapisan sejarah kolonial, pemerintahan, dan modernitas kota.'],
            ['Keraton Cirebon', 'Cirebon memperlihatkan percampuran motif Jawa, Sunda, Islam, Tionghoa, dan Eropa pada seni serta arsitekturnya.'],
            ['Kampung Adat Sunda', 'Kampung adat di Jawa Barat menjaga tata ruang, larangan adat, rumah panggung, dan pola hidup komunal.']
        ],
        featuredAssets: [
            ['Saung Angklung Udjo', 'Audio Angklung Buhun', 'Audio', 'audio', 'Rekaman interpretatif mengenai pola tabuh angklung buhun, bahan bambu, dan cara pertunjukan angklung membangun kebersamaan antar pemain. Audio ini disiapkan sebagai aset crowdsourcing dari penyedia jasa budaya dan terbuka setelah kunjungan tervalidasi.'],
            ['Kampung Adat Cireundeu', 'Narasi Ketahanan Pangan Singkong', 'Cerita/Narasi', 'text', 'Narasi ini menjelaskan bagaimana masyarakat Cireundeu merawat rasi, olahan singkong pengganti nasi, sebagai praktik hidup yang lahir dari sejarah, kemandirian pangan, dan ikatan antarwarga. Tradisi ini tidak hanya soal makanan, tetapi juga cara komunitas menjaga identitasnya di tengah perubahan kota.'],
            ['Gedung Sate', 'Catatan Arsitektur Gedung Sate', 'Catatan Budaya', 'text', 'Catatan ini menghubungkan bentuk puncak Gedung Sate dengan sejarah pembangunan kolonial, tenaga kerja lokal, dan cara warga Bandung membaca bangunan ini sebagai ikon kota. Detail arsitektur menjadi pintu masuk untuk memahami hubungan pemerintahan, memori kota, dan visual Priangan modern.']
        ]
    },
    {
        region: 'Jawa Tengah',
        description: 'Ruang candi, batik, kota lama, pesantren pesisir, dan lanskap pegunungan Jawa bagian tengah.',
        tags: ['candi', 'batik', 'jawa', 'kota lama', 'pesantren'],
        locations: [
            ['Magelang', 'Candi Borobudur', 'Candi Buddha besar dengan relief naratif, stupa, dan lanskap Kedu yang penting bagi sejarah Asia Tenggara.', 'Sejarah', ['candi', 'buddha']],
            ['Wonosobo', 'Dataran Tinggi Dieng', 'Kawasan pegunungan dengan candi, kawah, telaga, dan tradisi ruwatan rambut gimbal.', 'Alam & Budaya', ['dieng', 'ritual']],
            ['Surakarta', 'Keraton Surakarta Hadiningrat', 'Pusat budaya Jawa yang menyimpan tradisi keraton, pusaka, tari, dan tata ruang kota.', 'Sejarah', ['keraton', 'jawa']],
            ['Semarang', 'Lawang Sewu', 'Bangunan bersejarah Semarang yang terkait sejarah perkeretaapian dan arsitektur kolonial.', 'Sejarah', ['kolonial', 'kereta']],
            ['Semarang', 'Kota Lama Semarang', 'Kawasan cagar budaya dengan gereja Blenduk, gedung lama, dan memori kota pelabuhan.', 'Sejarah', ['kota lama', 'pelabuhan']],
            ['Semarang', 'Candi Gedong Songo', 'Kompleks candi Hindu di lereng Gunung Ungaran dengan lanskap pegunungan.', 'Sejarah', ['candi', 'gunung']],
            ['Surakarta', 'Museum Batik Danar Hadi', 'Museum batik yang memperkenalkan ragam motif, teknik, dan sejarah batik Jawa.', 'Museum', ['batik', 'tekstil']],
            ['Sragen', 'Museum Sangiran', 'Museum manusia purba di kawasan Sangiran yang penting bagi kajian prasejarah.', 'Museum', ['prasejarah', 'arkeologi']],
            ['Jepara', 'Karimunjawa', 'Kepulauan wisata bahari dengan ekosistem laut dan komunitas pesisir.', 'Bahari', ['laut', 'pesisir']],
            ['Demak', 'Masjid Agung Demak', 'Masjid bersejarah yang terkait perkembangan Islam di pesisir utara Jawa.', 'Religi', ['wali', 'islam']],
            ['Karanganyar', 'Candi Sukuh', 'Candi lereng Lawu dengan relief dan simbolisme yang berbeda dari candi Jawa klasik lain.', 'Sejarah', ['candi', 'lawu']],
            ['Klaten', 'Umbul Ponggok', 'Mata air wisata yang menunjukkan hubungan desa, air, dan ekonomi kreatif lokal.', 'Alam & Desa', ['mata air', 'desa']]
        ],
        themes: [
            ['Relief Candi', 'Relief candi di Jawa Tengah sering menjadi sumber pembacaan ajaran, kehidupan masyarakat, dan teknologi masa lalu.'],
            ['Batik Pesisir dan Keraton', 'Batik Jawa Tengah memperlihatkan perbedaan gaya keraton dan pesisir melalui warna, motif, dan fungsi sosial.'],
            ['Kota Pelabuhan', 'Semarang dan Demak menandai pentingnya pesisir utara Jawa dalam perdagangan dan penyebaran agama.'],
            ['Tradisi Keraton', 'Keraton Surakarta menjaga tata upacara, gamelan, tari, dan konsep ruang Jawa yang masih dipelajari sampai kini.'],
            ['Prasejarah Sangiran', 'Sangiran menjadi salah satu situs penting untuk memahami manusia purba dan perubahan lingkungan prasejarah.'],
            ['Ritual Dieng', 'Ruwatan rambut gimbal di Dieng memperlihatkan hubungan ritual, keluarga, komunitas, dan lanskap pegunungan.']
        ],
        featuredAssets: []
    },
    {
        region: 'DI Yogyakarta',
        description: 'Pusat kebudayaan Jawa dengan keraton, situs arkeologi, kampung kerajinan, dan narasi rakyat pesisir.',
        tags: ['keraton', 'batik', 'candi', 'jawa', 'kerajinan'],
        locations: [
            ['Yogyakarta', 'Keraton Yogyakarta', 'Istana Kesultanan Yogyakarta yang menjadi pusat tradisi, upacara, dan tata ruang filosofis kota.', 'Sejarah', ['keraton', 'filosofi']],
            ['Yogyakarta', 'Taman Sari', 'Situs bekas taman kerajaan dengan kolam, lorong, dan ruang air yang terkait sejarah keraton.', 'Sejarah', ['taman air', 'keraton']],
            ['Sleman', 'Candi Prambanan', 'Kompleks candi Hindu besar yang dikenal dengan relief Ramayana dan arsitektur candi tinggi.', 'Sejarah', ['candi', 'ramayana']],
            ['Sleman', 'Ratu Boko', 'Situs arkeologi di perbukitan yang memperlihatkan gerbang, teras, dan lanskap Prambanan.', 'Sejarah', ['arkeologi', 'perbukitan']],
            ['Yogyakarta', 'Malioboro', 'Koridor kota yang menjadi ruang belanja, seni jalanan, kuliner, dan memori perjalanan wisata.', 'Budaya Kota', ['koridor kota', 'kuliner']],
            ['Yogyakarta', 'Kotagede', 'Kawasan bersejarah bekas pusat Mataram Islam yang dikenal dengan kerajinan perak dan rumah tradisional.', 'Sejarah', ['perak', 'mataram']],
            ['Yogyakarta', 'Museum Sonobudoyo', 'Museum budaya Jawa yang menyimpan wayang, keris, batik, dan koleksi etnografi.', 'Museum', ['wayang', 'keris']],
            ['Bantul', 'Desa Wisata Kasongan', 'Sentra gerabah yang menghubungkan kerajinan tanah liat dengan ekonomi kreatif desa.', 'Kerajinan', ['gerabah', 'desa']],
            ['Bantul', 'Pantai Parangtritis', 'Pantai selatan yang lekat dengan cerita Ratu Kidul dan lanskap gumuk pasir.', 'Alam & Cerita Rakyat', ['pantai', 'legenda']],
            ['Bantul', 'Imogiri', 'Kawasan makam raja-raja Mataram yang terkait tata ziarah dan sejarah dinasti Jawa.', 'Religi & Sejarah', ['ziarah', 'mataram']],
            ['Sleman', 'Candi Ijo', 'Candi di perbukitan yang memperlihatkan lanskap Yogyakarta dari ketinggian.', 'Sejarah', ['candi', 'bukit']],
            ['Sleman', 'Tebing Breksi', 'Bekas tambang batu yang berubah menjadi ruang wisata geologi dan seni ukir tebing.', 'Alam & Edukasi', ['geologi', 'ukir']]
        ],
        themes: [
            ['Sumbu Filosofis', 'Yogyakarta dikenal dengan konsep sumbu yang menghubungkan Gunung Merapi, keraton, dan laut selatan dalam pembacaan kosmologi Jawa.'],
            ['Kerajinan Desa', 'Kasongan dan Kotagede memperlihatkan bagaimana keahlian tangan menjadi penopang ekonomi sekaligus identitas budaya.'],
            ['Cerita Laut Selatan', 'Parangtritis sering dibaca melalui cerita Ratu Kidul, tata larangan, dan hubungan masyarakat dengan laut selatan.'],
            ['Wayang dan Keris', 'Museum dan keraton Yogyakarta menyimpan tradisi benda budaya yang berhubungan dengan seni tutur, pusaka, dan etika Jawa.'],
            ['Relief Ramayana', 'Prambanan memperlihatkan narasi Ramayana melalui relief yang dapat dibaca sebagai teks visual.'],
            ['Kampung Kota', 'Kawasan tua Yogyakarta memperlihatkan hubungan rumah, gang, pasar, dan produksi budaya sehari-hari.']
        ],
        featuredAssets: [
            ['Taman Sari', 'Legenda Lorong Air Taman Sari', 'Cerita/Narasi', 'text', 'Narasi lengkap membawa turis membaca Taman Sari sebagai ruang pertahanan, peristirahatan, dan simbol relasi air dalam kosmologi keraton. Lorong dan kolam tidak hanya dilihat sebagai bangunan tua, tetapi sebagai arsip ruang yang menyimpan perubahan politik serta kehidupan istana.'],
            ['Keraton Yogyakarta', 'Audio Pemandu Keraton', 'Audio', 'audio', 'Audio ini menjelaskan sumbu filosofis keraton, fungsi pendopo, serta etika sederhana saat memasuki ruang budaya yang masih hidup. Konten disusun sebagai interpretasi awal sebelum turis membaca koleksi, halaman, dan tata ruang keraton secara langsung.']
        ]
    },
    {
        region: 'Jawa Timur',
        description: 'Bentang Majapahit, gunung api, pesantren pesisir, dan kota-kota lama di timur Jawa.',
        tags: ['majapahit', 'bromo', 'pesisir', 'candi', 'kota lama'],
        locations: [
            ['Probolinggo', 'Gunung Bromo', 'Gunung api ikonik di kawasan Tengger yang terkait lanskap kaldera dan tradisi masyarakat Tengger.', 'Alam & Budaya', ['tengger', 'gunung']],
            ['Banyuwangi', 'Kawah Ijen', 'Kawah vulkanik dengan danau asam dan aktivitas penambang belerang.', 'Alam', ['kawah', 'belerang']],
            ['Mojokerto', 'Trowulan', 'Kawasan arkeologi yang dikaitkan dengan bekas pusat Kerajaan Majapahit.', 'Sejarah', ['majapahit', 'arkeologi']],
            ['Surabaya', 'House of Sampoerna', 'Bangunan museum di Surabaya yang mencatat sejarah industri kretek dan kota lama.', 'Museum', ['kretek', 'surabaya']],
            ['Batu', 'Museum Angkut', 'Museum transportasi yang mengemas sejarah kendaraan dan budaya populer.', 'Museum', ['transportasi', 'edukasi']],
            ['Blitar', 'Candi Penataran', 'Kompleks candi Hindu yang berkaitan dengan masa Kediri sampai Majapahit.', 'Sejarah', ['candi', 'majapahit']],
            ['Surabaya', 'Makam Sunan Ampel', 'Kawasan religi dan kampung Arab yang terkait sejarah penyebaran Islam di Surabaya.', 'Religi', ['wali', 'kampung arab']],
            ['Malang', 'Kampung Warna Warni Jodipan', 'Kampung kota yang berkembang menjadi ruang wisata visual dan ekonomi kreatif warga.', 'Budaya Kota', ['kampung kota', 'mural']],
            ['Jember', 'Pantai Papuma', 'Pantai selatan dengan formasi batu karang dan tradisi wisata pesisir.', 'Alam', ['pantai', 'karang']],
            ['Sidoarjo', 'Museum Mpu Tantular', 'Museum provinsi yang menyimpan koleksi arkeologi, etnografi, dan sejarah Jawa Timur.', 'Museum', ['arkeologi', 'etnografi']],
            ['Malang', 'Alun-Alun Malang', 'Ruang kota bersejarah yang menjadi titik temu warga, masjid, gereja, dan koridor kolonial.', 'Budaya Kota', ['alun-alun', 'kolonial']],
            ['Sumenep', 'Keraton Sumenep', 'Keraton Madura yang memperlihatkan arsitektur, pusaka, dan sejarah pemerintahan lokal.', 'Sejarah', ['madura', 'keraton']]
        ],
        themes: [
            ['Majapahit', 'Trowulan dan candi-candi Jawa Timur sering dipakai untuk membaca jejak politik, perdagangan, dan seni Majapahit.'],
            ['Masyarakat Tengger', 'Tradisi Tengger di sekitar Bromo memperlihatkan hubungan ritual, gunung, pertanian, dan identitas komunitas.'],
            ['Kota Pesisir', 'Surabaya berkembang sebagai kota pelabuhan yang mempertemukan industri, perdagangan, kampung, dan komunitas perantau.'],
            ['Kretek dan Industri', 'Museum kota di Jawa Timur sering menyimpan sejarah industri yang berkaitan dengan tenaga kerja dan perubahan kota.'],
            ['Madura', 'Sumenep memperlihatkan sejarah keraton Madura, ukiran, batik, dan jaringan dagang pulau.'],
            ['Gunung Api Timur Jawa', 'Bromo dan Ijen memperlihatkan hubungan wisata alam, geologi, dan kehidupan masyarakat sekitar gunung.']
        ],
        featuredAssets: []
    },
    {
        region: 'Bali',
        description: 'Pulau dengan desa adat, pura, subak, seni pertunjukan, dan lanskap sawah yang hidup bersama ritual.',
        tags: ['desa adat', 'pura', 'subak', 'seni', 'ritual'],
        locations: [
            ['Karangasem', 'Pura Besakih', 'Kompleks pura besar di lereng Gunung Agung yang penting dalam kehidupan religi Bali.', 'Religi', ['pura', 'gunung']],
            ['Bangli', 'Desa Penglipuran', 'Desa adat yang dikenal dengan tata ruang rapi, rumah tradisional, dan aturan komunitas.', 'Masyarakat Adat', ['desa adat', 'awig-awig']],
            ['Gianyar', 'Tirta Empul', 'Pura dengan mata air suci yang digunakan dalam prosesi penyucian diri.', 'Religi', ['melukat', 'mata air']],
            ['Tabanan', 'Tanah Lot', 'Pura laut di atas batu karang yang menjadi ikon hubungan ritual dan pesisir.', 'Religi', ['pura laut', 'pesisir']],
            ['Badung', 'Pura Luhur Uluwatu', 'Pura tebing yang dikenal dengan pemandangan laut dan pertunjukan kecak.', 'Religi & Seni', ['kecak', 'tebing']],
            ['Gianyar', 'Tegallalang Rice Terrace', 'Sawah terasering yang memperlihatkan lanskap pertanian dan sistem irigasi tradisional.', 'Alam & Budaya', ['sawah', 'subak']],
            ['Gianyar', 'Ubud Monkey Forest', 'Kawasan hutan, pura, dan habitat monyet di lingkungan desa adat Padangtegal.', 'Alam & Religi', ['hutan', 'pura']],
            ['Tabanan', 'Pura Ulun Danu Bratan', 'Pura danau yang berkaitan dengan air, pertanian, dan lanskap pegunungan Bedugul.', 'Religi', ['danau', 'air']],
            ['Badung', 'Taman Ayun', 'Pura kerajaan Mengwi dengan halaman luas dan meru bertingkat.', 'Religi & Sejarah', ['mengwi', 'meru']],
            ['Gianyar', 'Goa Gajah', 'Situs arkeologi dengan gua, petirtaan, dan jejak Hindu-Buddha.', 'Sejarah', ['arkeologi', 'petirtaan']],
            ['Tabanan', 'Jatiluwih', 'Lanskap sawah terasering yang terkait sistem subak dan pertanian Bali.', 'Alam & Budaya', ['subak', 'sawah']],
            ['Klungkung', 'Kerta Gosa', 'Balai pengadilan bersejarah dengan lukisan langit-langit bergaya Kamasan.', 'Sejarah', ['kamasan', 'lukisan']]
        ],
        themes: [
            ['Subak', 'Subak adalah sistem irigasi dan organisasi sosial petani Bali yang menghubungkan air, pura, sawah, dan keputusan komunitas.'],
            ['Awig-Awig', 'Awig-awig merupakan aturan adat yang mengikat warga desa adat dalam tata ruang, upacara, dan kehidupan bersama.'],
            ['Melukat', 'Prosesi melukat memakai air sebagai simbol penyucian dan dilakukan dengan tata etika tertentu di pura sumber air.'],
            ['Pura Laut', 'Pura di pesisir Bali memperlihatkan hubungan ritual, arah mata angin, dan penghormatan pada kekuatan alam.'],
            ['Seni Kamasan', 'Lukisan Kamasan dikenal sebagai gaya naratif yang memuat cerita pewayangan dan ajaran moral.'],
            ['Pertunjukan Kecak', 'Kecak berkembang sebagai pertunjukan vokal kolektif yang sering dikaitkan dengan kisah Ramayana.']
        ],
        featuredAssets: [
            ['Desa Penglipuran', 'Awig-Awig Desa Penglipuran', 'Cerita/Narasi', 'text', 'Narasi lengkap menerangkan awig-awig sebagai kesepakatan hidup bersama, mulai dari tata ruang, kebersihan, hingga cara warga menjaga keseimbangan antara tradisi dan kunjungan wisata. Aset ini menempatkan desa adat sebagai ruang sosial yang masih hidup, bukan sekadar latar foto wisata.'],
            ['Tirta Empul', 'Audio Prosesi Tirta Empul', 'Audio', 'audio', 'Audio ini memandu turis memahami melukat sebagai praktik penyucian diri, makna antrean pancuran, dan batas etika saat menyaksikan prosesi religi. Rekaman dibuat sebagai pengantar agar kunjungan tetap menghormati warga yang beribadah.']
        ]
    },
    {
        region: 'Sumatera Barat',
        description: 'Ranah Minang dengan rumah gadang, tradisi merantau, surau, kuliner, dan lanskap lembah vulkanik.',
        tags: ['minangkabau', 'rumah gadang', 'merantau', 'kuliner', 'surau'],
        locations: [
            ['Tanah Datar', 'Istano Basa Pagaruyung', 'Replika istana kerajaan Minangkabau yang memperlihatkan bentuk rumah gadang dan simbol adat.', 'Sejarah', ['rumah gadang', 'adat']],
            ['Bukittinggi', 'Jam Gadang', 'Menara jam ikonik Bukittinggi yang menjadi penanda ruang kota Minangkabau modern.', 'Sejarah', ['kota', 'ikon']],
            ['Lima Puluh Kota', 'Lembah Harau', 'Lembah dengan tebing tinggi, air terjun, dan kampung yang dikelilingi lanskap alam.', 'Alam', ['lembah', 'air terjun']],
            ['Agam', 'Danau Maninjau', 'Danau kaldera yang terkait cerita Bujang Sembilan dan kehidupan nagari di tepian danau.', 'Alam & Cerita Rakyat', ['danau', 'legenda']],
            ['Bukittinggi', 'Ngarai Sianok', 'Lembah patahan alam yang menjadi lanskap penting Bukittinggi dan Agam.', 'Alam', ['ngarai', 'geologi']],
            ['Padang', 'Pantai Air Manis', 'Pantai yang dikenal lewat cerita Malin Kundang dan batu legenda di pesisir Padang.', 'Alam & Cerita Rakyat', ['malin kundang', 'pantai']],
            ['Padang', 'Kota Tua Padang', 'Kawasan lama di sekitar Batang Arau yang menyimpan jejak perdagangan dan komunitas kota pelabuhan.', 'Sejarah', ['kota tua', 'pelabuhan']],
            ['Tanah Datar', 'Nagari Pariangan', 'Nagari tua di lereng Marapi yang sering dikaitkan dengan asal-usul Minangkabau.', 'Masyarakat Adat', ['nagari', 'adat']],
            ['Padang', 'Museum Adityawarman', 'Museum budaya Minangkabau dengan koleksi tekstil, adat, dan sejarah daerah.', 'Museum', ['museum', 'minang']],
            ['Solok', 'Danau Singkarak', 'Danau besar Sumatera Barat yang terkait ekologi dan kehidupan nagari sekitar.', 'Alam', ['danau', 'nagari']],
            ['Padang Panjang', 'Pusat Dokumentasi dan Informasi Kebudayaan Minangkabau', 'Ruang dokumentasi budaya Minangkabau dengan bentuk arsitektur rumah gadang.', 'Museum', ['dokumentasi', 'adat']],
            ['Sawahlunto', 'Kota Tambang Sawahlunto', 'Kota tambang bersejarah yang menunjukkan perubahan industri, pekerja, dan warisan kota.', 'Sejarah', ['tambang', 'industri']]
        ],
        themes: [
            ['Matrilineal Minangkabau', 'Minangkabau dikenal dengan sistem kekerabatan matrilineal yang berpengaruh pada rumah, warisan, dan struktur sosial.'],
            ['Rumah Gadang', 'Rumah gadang bukan hanya arsitektur, tetapi juga ruang musyawarah, identitas suku, dan simbol kebersamaan.'],
            ['Tradisi Merantau', 'Merantau menjadi bagian penting dalam sejarah sosial Minangkabau dan membentuk jaringan ekonomi serta budaya.'],
            ['Surau', 'Surau berperan sebagai ruang belajar agama, adat, dan pembentukan karakter pemuda di banyak nagari.'],
            ['Cerita Rakyat Minang', 'Malin Kundang dan Bujang Sembilan memperlihatkan bagaimana cerita rakyat mengikat moral dengan lanskap nyata.'],
            ['Kota Tambang', 'Sawahlunto memperlihatkan sejarah industri tambang, migrasi pekerja, dan transformasi kota kolonial.']
        ],
        featuredAssets: []
    },
    {
        region: 'Sumatera Utara',
        description: 'Ruang Danau Toba, budaya Batak, kota Medan, perkebunan, dan koridor alam Sumatera bagian utara.',
        tags: ['batak', 'danau toba', 'medan', 'rumah adat', 'alam'],
        locations: [
            ['Simalungun', 'Danau Toba', 'Danau vulkanik besar yang menjadi pusat lanskap, ekologi, dan budaya Batak.', 'Alam & Budaya', ['danau', 'batak']],
            ['Samosir', 'Pulau Samosir', 'Pulau di tengah Danau Toba dengan desa adat, makam batu, dan seni Batak.', 'Masyarakat Adat', ['samosir', 'batak']],
            ['Toba', 'Museum TB Silalahi', 'Museum yang memperkenalkan sejarah, tokoh, dan kebudayaan Batak.', 'Museum', ['museum', 'batak']],
            ['Medan', 'Istana Maimun', 'Istana Kesultanan Deli dengan perpaduan arsitektur Melayu, Islam, India, dan Eropa.', 'Sejarah', ['melayu deli', 'istana']],
            ['Medan', 'Masjid Raya Al Mashun', 'Masjid bersejarah Medan yang berkaitan dengan Kesultanan Deli.', 'Religi', ['masjid', 'deli']],
            ['Medan', 'Tjong A Fie Mansion', 'Rumah saudagar Tionghoa-Medan yang mencatat sejarah perniagaan multikultural.', 'Sejarah', ['tionghoa', 'medan']],
            ['Samosir', 'Desa Tomok', 'Desa wisata di Samosir dengan makam Raja Sidabutar dan kerajinan Batak.', 'Masyarakat Adat', ['tomok', 'makam batu']],
            ['Karo', 'Air Terjun Sipiso-piso', 'Air terjun tinggi yang menghadap kawasan Danau Toba dan dataran Karo.', 'Alam', ['air terjun', 'karo']],
            ['Langkat', 'Bukit Lawang', 'Kawasan ekowisata yang dikenal sebagai pintu masuk hutan dan konservasi orangutan Sumatera.', 'Alam', ['hutan', 'konservasi']],
            ['Karo', 'Berastagi Gundaling', 'Kawasan dataran tinggi Karo dengan pasar buah, pemandangan gunung, dan budaya agraris.', 'Alam & Budaya', ['karo', 'dataran tinggi']],
            ['Karo', 'Taman Alam Lumbini', 'Kompleks replika pagoda yang menjadi ruang wisata religi dan lanskap pegunungan.', 'Religi', ['pagoda', 'karo']],
            ['Simalungun', 'Rumah Bolon Pematang Purba', 'Rumah adat Simalungun yang memperlihatkan struktur kerajaan lokal dan arsitektur Batak.', 'Masyarakat Adat', ['rumah adat', 'simalungun']]
        ],
        themes: [
            ['Budaya Batak', 'Budaya Batak memiliki tradisi marga, ulos, gondang, dan rumah adat yang berbeda antar subkelompok.'],
            ['Danau Vulkanik', 'Danau Toba terbentuk dari sejarah geologi besar dan menjadi ruang hidup masyarakat di sekelilingnya.'],
            ['Ulos', 'Ulos dipakai dalam upacara Batak sebagai simbol hubungan sosial, restu, dan penghormatan.'],
            ['Kesultanan Deli', 'Medan menyimpan jejak Kesultanan Deli, perdagangan perkebunan, dan masyarakat multikultural.'],
            ['Karo', 'Dataran tinggi Karo memperlihatkan budaya agraris, pasar, rumah adat, dan hubungan dengan gunung api.'],
            ['Konservasi Hutan', 'Bukit Lawang memperlihatkan hubungan ekowisata, hutan hujan, dan perlindungan satwa.']
        ],
        featuredAssets: []
    },
    {
        region: 'Aceh',
        description: 'Serambi Makkah dengan masjid bersejarah, memori tsunami, benteng pesisir, dan tradisi gampong.',
        tags: ['aceh', 'islam', 'tsunami', 'gampong', 'maritim'],
        locations: [
            ['Banda Aceh', 'Masjid Raya Baiturrahman', 'Masjid bersejarah Aceh yang menjadi simbol keagamaan, ketahanan kota, dan identitas daerah.', 'Religi', ['masjid', 'aceh']],
            ['Banda Aceh', 'Museum Tsunami Aceh', 'Museum memorial yang mengingat bencana 2004 sekaligus menjadi ruang edukasi mitigasi.', 'Museum', ['tsunami', 'memorial']],
            ['Banda Aceh', 'PLTD Apung', 'Kapal pembangkit yang terdorong tsunami ke daratan dan kini menjadi monumen memori bencana.', 'Memorial', ['tsunami', 'kapal']],
            ['Banda Aceh', 'Gunongan', 'Bangunan taman kerajaan yang dikaitkan dengan masa Sultan Iskandar Muda.', 'Sejarah', ['kerajaan', 'taman']],
            ['Aceh Besar', 'Pantai Lampuuk', 'Pantai wisata yang juga menyimpan memori pemulihan komunitas pesisir pascatsunami.', 'Alam', ['pantai', 'pesisir']],
            ['Sabang', 'Pulau Weh', 'Pulau paling barat Indonesia dengan wisata bahari, benteng, dan komunitas pesisir.', 'Bahari', ['pulau', 'laut']],
            ['Aceh Besar', 'Benteng Indra Patra', 'Situs benteng tua di pesisir Aceh Besar yang menunjukkan lapisan pertahanan maritim.', 'Sejarah', ['benteng', 'maritim']],
            ['Banda Aceh', 'Museum Aceh', 'Museum yang menyimpan lonceng Cakra Donya, rumah Aceh, dan koleksi sejarah daerah.', 'Museum', ['museum', 'rumoh aceh']],
            ['Aceh Besar', 'Rumah Cut Nyak Dhien', 'Rumah memorial pahlawan Aceh yang terkait perjuangan melawan kolonial.', 'Sejarah', ['pahlawan', 'kolonial']],
            ['Banda Aceh', 'Makam Sultan Iskandar Muda', 'Situs makam sultan besar Aceh yang mencerminkan sejarah kejayaan kerajaan Aceh.', 'Religi & Sejarah', ['sultan', 'kerajaan']],
            ['Banda Aceh', 'Ulee Lheue', 'Kawasan pelabuhan dan pesisir yang menjadi titik pergerakan ke pulau-pulau sekitar Aceh.', 'Maritim', ['pelabuhan', 'pesisir']],
            ['Aceh Besar', 'Gampong Nusa', 'Desa wisata yang memperkenalkan kehidupan gampong, kerajinan, kuliner, dan lanskap pedesaan Aceh.', 'Desa Wisata', ['gampong', 'kerajinan']]
        ],
        themes: [
            ['Serambi Makkah', 'Aceh sering disebut Serambi Makkah karena sejarah Islam yang kuat dalam kehidupan sosial dan politiknya.'],
            ['Memori Tsunami', 'Museum dan monumen tsunami di Aceh menjadi ruang belajar tentang kehilangan, pemulihan, dan mitigasi bencana.'],
            ['Kerajaan Aceh', 'Masa Sultan Iskandar Muda dikenal sebagai salah satu periode penting kejayaan politik dan dagang Aceh.'],
            ['Rumoh Aceh', 'Rumah tradisional Aceh berbentuk panggung dan menyimpan pengetahuan tentang iklim, ruang, dan adat.'],
            ['Maritim Aceh', 'Posisi Aceh di ujung barat Nusantara membuatnya penting dalam jalur pelayaran dan perdagangan.'],
            ['Gampong', 'Gampong menjadi unit sosial penting untuk membaca gotong royong, adat, dan kegiatan ekonomi warga.']
        ],
        featuredAssets: []
    },
    {
        region: 'Sulawesi Selatan',
        description: 'Bentang Bugis-Makassar, karst Maros, pelabuhan, benteng, dan tradisi Toraja di pegunungan.',
        tags: ['bugis', 'makassar', 'toraja', 'karst', 'maritim'],
        locations: [
            ['Makassar', 'Fort Rotterdam', 'Benteng bersejarah Makassar yang menyimpan museum, arsitektur kolonial, dan memori pelabuhan.', 'Sejarah', ['benteng', 'makassar']],
            ['Makassar', 'Pantai Losari', 'Ruang publik pesisir Makassar yang menjadi ikon kota dan titik temu warga.', 'Budaya Kota', ['pesisir', 'kuliner']],
            ['Maros', 'Rammang-Rammang', 'Kawasan karst dengan sungai, kampung, dan lanskap batu kapur yang khas.', 'Alam & Desa', ['karst', 'sungai']],
            ['Toraja Utara', 'Kete Kesu', 'Desa adat Toraja dengan tongkonan, lumbung, ukiran, dan situs pemakaman.', 'Masyarakat Adat', ['toraja', 'tongkonan']],
            ['Toraja Utara', 'Londa', 'Situs pemakaman tebing dan gua yang memperlihatkan tradisi kematian Toraja.', 'Masyarakat Adat', ['pemakaman', 'toraja']],
            ['Tana Toraja', 'Buntu Burake', 'Kawasan patung dan panorama dataran tinggi Toraja.', 'Religi & Alam', ['toraja', 'dataran tinggi']],
            ['Gowa', 'Museum Balla Lompoa', 'Museum di bekas istana Gowa yang menyimpan pusaka dan sejarah kerajaan lokal.', 'Museum', ['gowa', 'kerajaan']],
            ['Makassar', 'Masjid 99 Kubah', 'Masjid modern di kawasan CPI Makassar dengan kubah warna-warni.', 'Religi', ['masjid', 'arsitektur']],
            ['Makassar', 'Pulau Samalona', 'Pulau kecil dekat Makassar yang terkait wisata bahari dan kehidupan pesisir.', 'Bahari', ['pulau', 'laut']],
            ['Gowa', 'Benteng Somba Opu', 'Situs benteng Kerajaan Gowa yang menandai sejarah Makassar sebagai kekuatan maritim.', 'Sejarah', ['gowa', 'benteng']],
            ['Maros', 'Leang-Leang', 'Kawasan gua prasejarah dengan lukisan cadas tangan dan satwa.', 'Prasejarah', ['gua', 'cadas']],
            ['Bulukumba', 'Tanjung Bira', 'Pantai dan kawasan maritim yang terkait tradisi perahu pinisi di Sulawesi Selatan.', 'Bahari', ['pinisi', 'pantai']]
        ],
        themes: [
            ['Pinisi', 'Perahu pinisi berkaitan dengan tradisi pelayaran Bugis-Makassar dan keahlian pembuatan kapal kayu.'],
            ['Tongkonan', 'Tongkonan Toraja menjadi rumah adat, simbol garis keturunan, dan pusat upacara keluarga.'],
            ['Tradisi Rambu Solo', 'Rambu Solo adalah upacara kematian Toraja yang memperlihatkan hubungan sosial, status, dan leluhur.'],
            ['Karst Maros', 'Karst Maros menyimpan lanskap geologi, sungai, gua, dan bukti hunian prasejarah.'],
            ['Kerajaan Gowa', 'Gowa dan Makassar pernah menjadi kekuatan maritim penting dalam perdagangan kawasan timur Nusantara.'],
            ['Kuliner Pesisir', 'Ruang pesisir Makassar memperlihatkan hubungan kuliner, pelabuhan, dan kehidupan kota.']
        ],
        featuredAssets: []
    },
    {
        region: 'Nusa Tenggara Barat',
        description: 'Ruang Sasak, Rinjani, desa tenun, masjid tua, dan pesisir Lombok-Sumbawa.',
        tags: ['sasak', 'rinjani', 'tenun', 'desa adat', 'pesisir'],
        locations: [
            ['Lombok Tengah', 'Desa Sade', 'Desa adat Sasak dengan rumah tradisional, tenun, dan tata ruang komunitas.', 'Masyarakat Adat', ['sasak', 'rumah adat']],
            ['Lombok Utara', 'Gunung Rinjani', 'Gunung tinggi Lombok dengan danau Segara Anak dan jalur pendakian budaya-alam.', 'Alam & Budaya', ['gunung', 'rinjani']],
            ['Lombok Tengah', 'Pantai Kuta Mandalika', 'Pantai selatan Lombok dengan lanskap bukit, pasir, dan tradisi bau nyale di kawasan sekitarnya.', 'Alam & Cerita Rakyat', ['pantai', 'bau nyale']],
            ['Lombok Utara', 'Gili Trawangan', 'Pulau wisata bahari dengan budaya pesisir dan ekologi laut.', 'Bahari', ['gili', 'laut']],
            ['Lombok Barat', 'Pura Lingsar', 'Kompleks pura yang mencerminkan perjumpaan tradisi Hindu Bali dan Islam Wetu Telu.', 'Religi', ['lingsar', 'wetu telu']],
            ['Lombok Barat', 'Taman Narmada', 'Taman air bersejarah yang dibangun sebagai replika simbolik Gunung Rinjani.', 'Sejarah', ['taman air', 'rinjani']],
            ['Lombok Utara', 'Masjid Kuno Bayan Beleq', 'Masjid tua Sasak yang penting dalam sejarah Islam lokal Lombok.', 'Religi & Sejarah', ['masjid kuno', 'sasak']],
            ['Lombok Tengah', 'Desa Sukarara', 'Desa tenun songket yang memperlihatkan produksi tekstil dan peran perempuan pengrajin.', 'Kerajinan', ['tenun', 'songket']],
            ['Lombok Utara', 'Air Terjun Sendang Gile', 'Air terjun di kaki Rinjani yang terkait wisata alam dan desa sekitar.', 'Alam', ['air terjun', 'rinjani']],
            ['Lombok Timur', 'Pantai Pink', 'Pantai dengan pasir berwarna merah muda akibat serpihan organisme laut.', 'Alam', ['pantai', 'pesisir']],
            ['Lombok Utara', 'Gili Meno', 'Pulau kecil yang dikenal dengan suasana tenang, laut, dan konservasi penyu.', 'Bahari', ['gili', 'konservasi']],
            ['Lombok Tengah', 'Desa Ende', 'Desa adat Sasak yang memperlihatkan arsitektur bale dan kehidupan komunitas.', 'Masyarakat Adat', ['sasak', 'bale']]
        ],
        themes: [
            ['Budaya Sasak', 'Budaya Sasak terlihat pada rumah bale, bahasa, tenun, musik, dan tata adat desa di Lombok.'],
            ['Tenun Songket', 'Tenun songket Lombok memuat motif, teknik, dan peran sosial perempuan dalam ekonomi budaya.'],
            ['Bau Nyale', 'Bau Nyale adalah tradisi menangkap cacing laut yang dikaitkan dengan legenda Putri Mandalika.'],
            ['Wetu Telu', 'Wetu Telu memperlihatkan sejarah perjumpaan Islam lokal, adat Sasak, dan kosmologi setempat.'],
            ['Rinjani', 'Rinjani memiliki nilai ekologis dan spiritual bagi masyarakat Lombok, termasuk Segara Anak.'],
            ['Gili dan Pesisir', 'Gili memperlihatkan hubungan pariwisata bahari, konservasi laut, dan kehidupan komunitas pulau.']
        ],
        featuredAssets: []
    },
    {
        region: 'Kalimantan Timur',
        description: 'Ruang Dayak, Kutai, hutan tropis, sungai, pesisir, dan kota-kota tambang serta pelabuhan.',
        tags: ['dayak', 'kutai', 'hutan', 'sungai', 'pesisir'],
        locations: [
            ['Samarinda', 'Desa Budaya Pampang', 'Desa budaya Dayak Kenyah yang menampilkan lamin, tari, musik, dan ukiran.', 'Masyarakat Adat', ['dayak', 'lamin']],
            ['Berau', 'Pulau Derawan', 'Pulau wisata bahari dengan ekosistem laut, penyu, dan komunitas pesisir.', 'Bahari', ['pulau', 'penyu']],
            ['Kutai Timur', 'Taman Nasional Kutai', 'Kawasan hutan konservasi yang menjadi habitat orangutan dan ekosistem tropis Kalimantan.', 'Alam', ['hutan', 'konservasi']],
            ['Kutai Kartanegara', 'Bukit Bangkirai', 'Kawasan hutan hujan dengan jembatan tajuk dan pohon bangkirai.', 'Alam', ['hutan', 'canopy']],
            ['Kutai Kartanegara', 'Museum Mulawarman', 'Museum di Tenggarong yang menyimpan koleksi Kesultanan Kutai Kartanegara.', 'Museum', ['kutai', 'kerajaan']],
            ['Kutai Kartanegara', 'Kedaton Kutai Kartanegara', 'Bangunan kedaton yang memperlihatkan sejarah dan simbol Kesultanan Kutai.', 'Sejarah', ['kedaton', 'kutai']],
            ['Balikpapan', 'Pantai Melawai', 'Ruang pesisir Balikpapan yang menjadi tempat berkumpul warga dan menikmati senja.', 'Alam Kota', ['pantai', 'kota']],
            ['Bontang', 'Pulau Beras Basah', 'Pulau kecil dekat Bontang dengan wisata laut dan mercusuar.', 'Bahari', ['pulau', 'laut']],
            ['Samarinda', 'Islamic Center Samarinda', 'Masjid besar di tepi Sungai Mahakam dengan arsitektur monumental.', 'Religi', ['masjid', 'mahakam']],
            ['Samarinda', 'Tepian Mahakam', 'Koridor sungai yang memperlihatkan kehidupan kota, perahu, dan ruang publik Samarinda.', 'Budaya Kota', ['sungai', 'mahakam']],
            ['Berau', 'Kampung Biduk-Biduk', 'Kawasan pesisir Berau yang dekat dengan pantai, laut, dan kehidupan nelayan.', 'Bahari', ['pesisir', 'nelayan']],
            ['Kutai Kartanegara', 'Lamin Etam Ambors', 'Rumah panjang Dayak yang menjadi ruang pengenalan arsitektur dan seni ukir Kalimantan Timur.', 'Masyarakat Adat', ['rumah panjang', 'ukir']]
        ],
        themes: [
            ['Lamin Dayak', 'Lamin adalah rumah panjang yang menjadi ruang komunal, simbol kekerabatan, dan media ukiran Dayak.'],
            ['Sungai Mahakam', 'Mahakam menjadi jalur hidup penting untuk transportasi, perdagangan, permukiman, dan cerita masyarakat sungai.'],
            ['Kesultanan Kutai', 'Kutai memiliki sejarah kerajaan tua dan kesultanan yang meninggalkan koleksi istana, upacara, dan pusaka.'],
            ['Hutan Tropis', 'Hutan Kalimantan Timur menyimpan keanekaragaman hayati dan pengetahuan lokal tentang tanaman serta satwa.'],
            ['Pesisir Berau', 'Pulau dan kampung pesisir Berau memperlihatkan hubungan nelayan, penyu, terumbu, dan wisata bahari.'],
            ['Ukiran Dayak', 'Motif ukiran Dayak sering berhubungan dengan alam, leluhur, perlindungan, dan identitas kelompok.']
        ],
        featuredAssets: []
    }
];

export const NARRATIVE_TARGET_PER_REGION = 30;
export const MAX_AUDIO_PER_REGION = 6;

function slugify(value) {
    return String(value)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function unique(values) {
    return [...new Set(values.filter(Boolean))];
}

function columnDefinition(table, column) {
    const definitions = {
        locations: {
            city: 'VARCHAR(100) NULL AFTER region',
            tags: 'JSON DEFAULT NULL AFTER category'
        },
        narratives: {
            title: 'VARCHAR(255) NULL AFTER location_name',
            narrative_type: "ENUM('Cerita/Narasi', 'Catatan Budaya', 'Audio') DEFAULT 'Cerita/Narasi' AFTER title",
            tags: 'JSON DEFAULT NULL AFTER description',
            media_type: "ENUM('text', 'audio', 'image', 'document') DEFAULT 'text' AFTER tags"
        }
    };
    return definitions[table]?.[column];
}

async function ensureColumn(table, column) {
    const [rows] = await db.execute(
        `SELECT COUNT(*) AS count
         FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE()
           AND TABLE_NAME = ?
           AND COLUMN_NAME = ?`,
        [table, column]
    );

    if (Number(rows[0].count) > 0) return;

    const definition = columnDefinition(table, column);
    if (!definition) throw new Error(`Missing column definition for ${table}.${column}`);
    await db.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
}

async function ensureCultureColumns() {
    await ensureColumn('locations', 'city');
    await ensureColumn('locations', 'tags');
    await ensureColumn('narratives', 'title');
    await ensureColumn('narratives', 'narrative_type');
    await ensureColumn('narratives', 'tags');
    await ensureColumn('narratives', 'media_type');
}

async function ensureSeedProvider() {
    await db.execute(
        `INSERT INTO users (name, email, password, role, status, specific_data)
         VALUES (?, ?, ?, 'Penyedia Jasa', 'approved', ?)
         ON DUPLICATE KEY UPDATE
            name = VALUES(name),
            status = 'approved',
            specific_data = VALUES(specific_data)`,
        [
            SEED_PROVIDER.name,
            SEED_PROVIDER.email,
            SEED_PROVIDER.password,
            JSON.stringify({ agency: SEED_PROVIDER.agency, seed: true })
        ]
    );

    const [rows] = await db.execute('SELECT id FROM users WHERE email = ?', [SEED_PROVIDER.email]);
    return rows[0].id;
}

function buildNarrativeDescription(type, regionData, location, theme) {
    const [themeTitle, fact] = theme;
    if (type === 'Audio') {
        return `Audio interpretatif ini disiapkan untuk ${location.name} di ${regionData.region}. ${location.description} ${fact} Rekaman ini dirancang sebagai pengantar singkat sebelum turis mendengar penjelasan langsung dari pemandu atau komunitas lokal, sehingga konteks sejarah, adat, dan etika kunjungan dapat dipahami lebih awal.`;
    }

    if (type === 'Catatan Budaya') {
        return `Catatan budaya tentang ${location.name} menempatkan lokasi ini sebagai bagian dari lanskap ${regionData.region}, bukan hanya titik wisata. ${location.description} ${fact} Pembacaan ini membantu turis melihat hubungan antara ruang, praktik warga, arsip sejarah, dan cara komunitas menjaga pengetahuan lokal dari generasi ke generasi.`;
    }

    return `Cerita naratif ini mengajak turis membaca ${location.name} melalui pengalaman ruang, ingatan warga, dan lapisan sejarah setempat. ${location.description} ${fact} Narasi ini dapat dipakai sebagai bahan interpretasi awal agar perjalanan tidak berhenti pada dokumentasi visual, tetapi juga memahami mengapa tempat tersebut penting bagi identitas wilayah.`;
}

export function buildNarratives(regionData) {
    const narratives = [];
    let audioCount = 0;

    regionData.featuredAssets.forEach(([locationName, title, narrativeType, mediaType, description]) => {
        if (narrativeType === 'Audio') audioCount += 1;
        const location = regionData.locations.find(item => item[1] === locationName) || regionData.locations[0];
        narratives.push({
            locationName,
            title,
            narrativeType,
            mediaType,
            description,
            tags: unique([...regionData.tags, ...location[4], narrativeType.toLowerCase()]).slice(0, 8),
            mediaPath: null
        });
    });

    let cursor = 0;
    while (narratives.length < NARRATIVE_TARGET_PER_REGION) {
        const location = regionData.locations[cursor % regionData.locations.length];
        const theme = regionData.themes[cursor % regionData.themes.length];
        const shouldAudio = audioCount < MAX_AUDIO_PER_REGION && cursor % 5 === 0;
        const narrativeType = shouldAudio
            ? 'Audio'
            : cursor % 2 === 0
                ? 'Catatan Budaya'
                : 'Cerita/Narasi';
        const mediaType = narrativeType === 'Audio' ? 'audio' : 'text';
        if (shouldAudio) audioCount += 1;

        const titlePrefix = narrativeType === 'Audio'
            ? 'Audio'
            : narrativeType === 'Catatan Budaya'
                ? 'Catatan'
                : 'Narasi';
        const title = `${titlePrefix} ${theme[0]} - ${location[1]}`;

        narratives.push({
            locationName: location[1],
            title,
            narrativeType,
            mediaType,
            description: buildNarrativeDescription(narrativeType, regionData, {
                city: location[0],
                name: location[1],
                description: location[2],
                category: location[3],
                tags: location[4]
            }, theme),
            tags: unique([...regionData.tags, ...location[4], theme[0].toLowerCase(), narrativeType.toLowerCase()]).slice(0, 8),
            mediaPath: null
        });
        cursor += 1;
    }

    return narratives;
}

async function clearSeedRegions(providerId) {
    const regions = REGION_DATA.map(item => item.region);
    const placeholders = regions.map(() => '?').join(', ');

    await db.execute(
        `DELETE n
         FROM narratives n
         LEFT JOIN locations l ON l.id = n.location_id
         WHERE n.provider_id = ? OR l.region IN (${placeholders})`,
        [providerId, ...regions]
    );

    await db.execute(`DELETE FROM locations WHERE region IN (${placeholders})`, regions);
}

async function insertLocations() {
    const lookup = new Map();

    for (const regionData of REGION_DATA) {
        for (const [city, name, description, category, tags] of regionData.locations) {
            const [result] = await db.execute(
                `INSERT INTO locations (region, city, name, description, category, tags, media_path)
                 VALUES (?, ?, ?, ?, ?, ?, NULL)`,
                [regionData.region, city, name, description, category, JSON.stringify(unique([...regionData.tags, ...tags]))]
            );
            lookup.set(`${regionData.region}|${name}`, result.insertId);
        }
    }

    return lookup;
}

async function insertNarratives(providerId, locationLookup) {
    let count = 0;

    for (const regionData of REGION_DATA) {
        const narratives = buildNarratives(regionData);
        for (const narrative of narratives) {
            const locationId = locationLookup.get(`${regionData.region}|${narrative.locationName}`);
            await db.execute(
                `INSERT INTO narratives
                    (provider_id, location_id, location_name, title, narrative_type, description, tags, media_type, media_path, approval_status)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'approved')`,
                [
                    providerId,
                    locationId,
                    narrative.locationName,
                    narrative.title,
                    narrative.narrativeType,
                    narrative.description,
                    JSON.stringify(narrative.tags),
                    narrative.mediaType,
                    narrative.mediaPath
                ]
            );
            count += 1;
        }
    }

    return count;
}

async function main() {
    await ensureCultureColumns();
    const providerId = await ensureSeedProvider();
    await clearSeedRegions(providerId);
    const locationLookup = await insertLocations();
    const narrativeCount = await insertNarratives(providerId, locationLookup);

    console.log(`Seed selesai: ${REGION_DATA.length} provinsi, ${locationLookup.size} lokasi wisata, ${narrativeCount} aset budaya.`);
    console.log(`Audio dibatasi maksimal ${MAX_AUDIO_PER_REGION} aset per provinsi. Jalankan ulang perintah ini jika ingin menyegarkan data seed.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main()
        .catch(error => {
            console.error('Seed cultural data gagal:', error);
            process.exitCode = 1;
        })
        .finally(async () => {
            await db.end();
        });
}
