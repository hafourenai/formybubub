# PRD: Video Motion Graphic TCP vs UDP (Remotion)

Sistem Terdistribusi · Sistem Informasi · Pertemuan 3–4 · Dokumen kerja untuk AI Agent

## 1. Ringkasan Proyek

**Tujuan tugas (dari dosen):** membuat animasi untuk mengilustrasikan perbedaan protokol TCP dan UDP.

**Output yang diminta dari AI Agent:** kode proyek Remotion (React + TypeScript). Agent TIDAK membuat atau merender file video. Pengguna yang akan menjalankan dan merender sendiri.

**Durasi:** 4 menit 52 detik (8.760 frame pada 30 fps), jadi lebih dari 3 menit. Naskah sekitar 650–700 kata dan dibaca dengan tempo santai sekitar 140 kata per menit.

**Cakupan wajib (sesuai lembar tugas):**

1. Pengertian Protokol
2. Connectionless Communication (UDP)
3. Connection-Oriented Communication (TCP)

Selain itu ada konteks singkat (lapisan transport dan port), perbandingan, serta kesimpulan agar video utuh.

**Narasi:** voice over direkam pengguna belakangan. Video tidak memakai subtitle atau caption. Naskah dipisah di Bagian 5.

| Kriteria penilaian | Cara dipenuhi | Bagian |
| --- | --- | --- |
| Kelengkapan ilustrasi | Tiga topik wajib, perbandingan, dan kesimpulan. Setiap konsep punya ilustrasi: analogi, diagram sequence, dan simulasi paket. | 5, 6 |
| Kebenaran isi ilustrasi | Fact sheet teknis dan daftar klaim terlarang | 2.3 |
| Tampilan animasi | Design system, prinsip motion, dan komponen reusable | 3, 4 |

## 2. Aturan untuk AI Agent (Scope Lock)

### 2.1 Aturan wajib

1. **Sumber kebenaran tunggal.** Isi video hanya boleh berasal dari dokumen ini (Bagian 2.3, 5, dan 6). Jangan menambah, mengubah, atau menghilangkan fakta, istilah, maupun urutan materi.
2. **Naskah tidak boleh diubah.** Naskah di Bagian 5 adalah acuan final. Setiap adegan visual harus bisa ditunjuk ke kalimat naskah tertentu. Visual yang tidak didukung naskah harus dihapus.
3. **Fokus pada tiga topik wajib** (Protokol, UDP, TCP) beserta konteks, perbandingan, dan kesimpulan yang sudah ditentukan. Jangan membuat scene di luar daftar scene S01–S08.
4. **Jangan generate video.** Tugas agent hanya menulis kode. Jangan menjalankan perintah render. Verifikasi cukup dengan typecheck dan Remotion Studio.
5. **Tanpa subtitle atau caption.** Teks narasi tidak boleh tampil di layar. Teks yang diperbolehkan hanya label pendek pada ilustrasi (misalnya SYN, ACK, Datagram, Port 80), judul scene, isi tabel perbandingan, dan referensi pada scene penutup.
6. **Jangan mengarang.** Jika ragu terhadap fakta teknis atau keputusan desain, pilih opsi paling sederhana yang konsisten dengan dokumen ini, beri komentar `// TODO(verify): ...`, lalu laporkan di akhir. Jangan menebak lalu menampilkannya sebagai fakta.
7. **Bahasa:** label Bahasa Indonesia, dengan istilah teknis tetap berbahasa Inggris (handshake, datagram, header, ACK, dan seterusnya).
8. **Tanpa aset eksternal** dan tanpa panggilan jaringan saat render. Semua ilustrasi dibuat dengan SVG atau HTML+CSS di dalam kode.
9. **Laporan akhir wajib** berisi: daftar file, cara menjalankan, pemetaan scene ke file, daftar asumsi dan TODO, serta hasil checklist Bagian 8.

### 2.2 Di dalam dan di luar cakupan

| Di dalam cakupan | Di luar cakupan (JANGAN dibuat) |
| --- | --- |
| Definisi protokol dan contoh HTTP, SMTP, FTP | Detail model OSI 7 lapisan |
| Peran lapisan transport, IP, dan port (singkat) | QUIC, HTTP/3, SCTP, dan protokol lain |
| UDP: connectionless, datagram, tanpa jaminan, header 8 byte, kasus penggunaan | Algoritma congestion control (slow start, Reno, Cubic) |
| TCP: handshake, nomor urut, ACK, retransmisi, flow control, congestion control (konsep saja), FIN, header minimal 20 byte, kasus penggunaan | Seluruh field header TCP (flag lengkap, options) |
| Tabel perbandingan, kesimpulan, referensi | TLS/SSL, enkripsi, NAT, firewall, serangan (SYN flood), socket programming, kode sumber |

### 2.3 Fact sheet teknis (acuan kebenaran ilustrasi)

- **Protokol:** kumpulan aturan dan format yang mengatur komunikasi, yaitu format pesan, urutan pengiriman, dan tindakan saat mengirim atau menerima.
- **IP vs port:** alamat IP mengarahkan data ke komputer. Nomor port mengarahkan data ke proses atau aplikasi di komputer tersebut. Contoh port: 80 (HTTP), 25 (SMTP), 53 (DNS).
- **UDP (User Datagram Protocol, RFC 768):** connectionless. Tidak ada handshake. Data dikirim sebagai datagram independen. Tidak ada ACK, retransmisi, penjaminan urutan, flow control, maupun congestion control. Paket dapat hilang atau tiba tidak berurutan. Header 8 byte: Source Port, Destination Port, Length, Checksum.
- **TCP (Transmission Control Protocol, RFC 9293):** connection-oriented. Koneksi dibuka dengan three-way handshake: klien kirim SYN, server balas SYN-ACK, klien kirim ACK, lalu koneksi berstatus ESTABLISHED. Data diberi nomor urut dan dikonfirmasi lewat ACK. Jika ACK tidak datang sebelum timeout, segmen dikirim ulang. Penerima menyusun data sesuai urutan. Flow control mencegah pengirim membanjiri penerima (berdasarkan window dari penerima). Congestion control mencegah jaringan kewalahan. Koneksi ditutup teratur dengan FIN. Header minimal 20 byte.
- **Istilah satuan data:** UDP = datagram. TCP = segmen. IP = paket. Gunakan istilah ini secara konsisten.

**Klaim TERLARANG (salah, jangan pernah ditampilkan):**

- UDP tidak punya checksum.
- TCP itu terenkripsi atau lebih aman.
- TCP membuat jaringan tidak pernah kehilangan paket. Yang benar: TCP memulihkan paket yang hilang lewat pengiriman ulang.
- UDP selalu lebih cepat dalam semua kondisi.
- UDP tidak punya port.

### 2.4 Jika instruksi tampak bertentangan

Urutan prioritas: (1) Fact sheet 2.3, (2) Naskah Bagian 5, (3) Storyboard Bagian 6, (4) Design system. Jika storyboard bertentangan dengan fakta, ikuti fakta dan laporkan.

## 3. Spesifikasi Teknis (Remotion)

| Parameter | Nilai |
| --- | --- |
| Framework | Remotion 4.x, React, TypeScript (strict) |
| Composition ID | `TcpUdpExplainer` |
| Resolusi / FPS | 1920×1080 / 30 fps |
| Durasi | 8.760 frame (292 detik), dihitung otomatis dari `scenes.ts` |
| Render (oleh pengguna) | mp4 H.264 |

**Aturan teknis:**

- Semua animasi harus frame-driven: `useCurrentFrame`, `interpolate`, `spring`, `Easing`. DILARANG: CSS transition/animation, `setTimeout`, `requestAnimationFrame`, dan `Math.random()` (gunakan `random(seed)` dari remotion agar deterministik).
- Durasi scene HANYA didefinisikan di `src/config/scenes.ts` (satuan detik, dikonversi ke frame). `Root.tsx` menghitung `durationInFrames` dari total. Tujuannya agar pengguna mudah menyesuaikan setelah merekam voice over.
- Susun scene dengan `<Series>`. Fade-in dan fade-out 10 frame berada di dalam durasi scene masing-masing, tanpa overlap, sehingga total durasi pasti.
- **Slot audio (opsional):** `public/audio/voiceover.mp3` dan `public/audio/bgm.mp3`. Komponen `<Audio>` hanya dirender jika flag di `src/config/audio.ts` bernilai true (default false), sehingga proyek tetap berjalan tanpa file audio. Musik latar volume 0.1.
- Font via `@remotion/google-fonts`: Inter (teks) dan JetBrains Mono (label paket).
- Script npm: `dev` (`remotion studio`), `typecheck` (`tsc --noEmit`), `render` (`remotion render TcpUdpExplainer out/tcp-udp.mp4`). Script render hanya didefinisikan dan tidak dijalankan agent.
- Dependensi seminimal mungkin: remotion, @remotion/cli, @remotion/google-fonts, react, react-dom, typescript.

## 4. Design System

| Token | Nilai | Pemakaian |
| --- | --- | --- |
| Background | #0B1220 | Latar utama |
| Surface | #131C2E | Kartu dan panel |
| Teks | #E8EEF9 / #8FA3C4 | Teks utama / teks sekunder |
| TCP | #3B82F6 (biru) | Semua elemen TCP |
| UDP | #F97316 (oranye) | Semua elemen UDP |
| Sukses / Gagal / Peringatan | #22C55E / #EF4444 / #FACC15 | ACK diterima / paket hilang / timeout |

**Konsistensi warna:** biru selalu TCP, oranye selalu UDP, di semua scene.

**Tipografi dan layout:** judul scene 96 px, label minimal 32 px, margin aman 96 px. Di pojok kiri atas ada chip nama scene (misalnya ‘1 · Pengertian Protokol’), dan di bawah ada progress bar tipis untuk kemajuan video.

**Motion:** `spring` halus (damping 200) untuk masuk, `spring` ‘pop’ (damping 12) untuk penekanan. Stagger antar elemen 6–10 frame. Tidak ada pemotongan mendadak. Paket bergerak dengan easing dan meninggalkan jejak tipis. Satu fokus utama per momen, sementara elemen lain diredupkan.

**Komponen reusable:** `SceneFrame`, `ProgressBar`, `Host` (komputer atau server), `Packet` (label, warna, nomor urut), `PacketFlight` (animasi paket di sepanjang jalur dengan progres), `SequenceDiagram` (lifeline dan panah), `LayerStack`, `PortDoors`, `HeaderBar` (diagram header 8 vs 20 byte), `ComparisonTable`, `Avatar`, `Icons` (kartu pos, telepon, browser, email, berkas, game, dan lain-lain).

## 5. Naskah Voice Over (terpisah, siap rekam)

Bagian ini hanya berisi narasi, tanpa instruksi visual. Estimasi durasi di setiap judul adalah slot visual. Jika rekamanmu lebih panjang atau pendek, ubah angka di `scenes.ts`. Saran pelafalan: TCP (te-ce-pe), UDP (u-de-pe), IP (ai-pi), DNS (de-en-es), SYN (sin), ACK (ek), FIN (fin).

### S01 · Pembuka (0:00 – 0:20)

Setiap kali kamu membuka situs web, mengirim pesan, atau menonton video, ada data yang berpindah dari satu komputer ke komputer lain. Tapi, bagaimana data itu bisa sampai dengan benar? Jawabannya ada pada protokol. Di video ini, kita akan membahas dua protokol penting: TCP dan UDP.

### S02 · Pengertian Protokol (0:20 – 1:08)

Apa itu protokol? Protokol adalah sekumpulan aturan dan kesepakatan yang mengatur bagaimana dua pihak berkomunikasi. Aturan ini menentukan format pesan, urutan pengiriman, dan tindakan yang harus dilakukan ketika pesan dikirim atau diterima.

Bayangkan dua orang yang sedang berbicara. Mereka harus memakai bahasa yang sama, bergantian bicara, dan tahu kapan percakapan dimulai dan diakhiri. Komputer pun sama. Tanpa protokol, perangkat yang berbeda tidak akan saling mengerti.

Dalam sistem terdistribusi, tempat banyak komputer bekerja sama lewat jaringan, protokol adalah fondasi komunikasinya. Contohnya HTTP untuk web, SMTP untuk email, dan FTP untuk transfer berkas. Protokol-protokol aplikasi ini mengandalkan protokol lapisan transport untuk mengantarkan data, dan dua yang paling terkenal adalah TCP dan UDP.

### S03 · Lapisan Transport dan Port (1:08 – 1:38)

Di jaringan, data melewati beberapa lapisan. Protokol IP bertugas mengantarkan paket dari satu komputer ke komputer lain berdasarkan alamat IP. Namun, di dalam satu komputer ada banyak program yang berjalan bersamaan. Di sinilah lapisan transport bekerja. Dengan bantuan nomor port, data diantarkan ke proses atau aplikasi yang tepat. Lapisan ini menyediakan dua pilihan utama: UDP yang sederhana dan cepat, serta TCP yang andal dan terstruktur.

### S04 · UDP – Connectionless (1:38 – 2:33)

Mari mulai dari UDP, singkatan dari User Datagram Protocol. UDP adalah protokol connectionless, artinya tidak ada koneksi yang dibangun sebelum data dikirim. Pengirim langsung mengirim data dalam bentuk paket independen yang disebut datagram.

Analogi mudahnya adalah mengirim kartu pos. Kamu menulis alamat, memasukkannya ke kotak pos, lalu pergi. Tidak ada konfirmasi bahwa kartu itu sampai.

Karena itu, UDP tidak menjamin paket tiba, tidak menjamin urutannya, dan tidak melakukan pengiriman ulang. Paket bisa hilang atau tiba dengan urutan berbeda.

Sebagai gantinya, header UDP sangat ringan, hanya delapan byte, sehingga pengiriman menjadi cepat dengan beban yang rendah. Itulah mengapa UDP dipakai pada layanan yang mengutamakan kecepatan, seperti DNS, panggilan suara dan video, siaran langsung, serta game online.

### S05 · TCP – Connection-Oriented (2:33 – 3:48)

Sekarang kita beralih ke TCP, singkatan dari Transmission Control Protocol. TCP adalah protokol connection-oriented, artinya sebuah koneksi harus dibangun lebih dulu sebelum data dikirim.

Analogi mudahnya adalah menelepon. Kamu menghubungi, menunggu diangkat, memastikan lawan bicara siap, baru mulai berbicara.

Di TCP, proses ini disebut three-way handshake. Pertama, klien mengirim SYN. Kedua, server membalas dengan SYN-ACK. Ketiga, klien mengirim ACK. Setelah itu, koneksi terbentuk dan data mulai mengalir.

TCP menjamin keandalan. Setiap segmen diberi nomor urut, dan penerima mengirim ACK sebagai tanda terima. Jika ACK tidak datang dalam waktu tertentu, pengirim akan mengirim ulang segmen tersebut. Nomor urut juga memastikan data tersusun dalam urutan yang benar.

Selain itu, TCP memiliki kendali alur, agar pengirim tidak membanjiri penerima, dan kendali kemacetan, agar jaringan tidak kewalahan. Setelah selesai, koneksi ditutup secara teratur menggunakan sinyal FIN.

Harganya adalah overhead yang lebih besar: header minimal dua puluh byte dan waktu tunggu untuk handshake. Karena keandalannya, TCP dipakai untuk web, email, dan transfer berkas.

### S06 · Perbandingan (3:48 – 4:18)

Mari bandingkan keduanya. UDP bersifat connectionless, sedangkan TCP connection-oriented. UDP tidak menjamin pengiriman, sedangkan TCP menjamin lewat konfirmasi dan pengiriman ulang. UDP tidak menjamin urutan, sedangkan TCP menjaga urutan data. UDP ringan dan cepat, sedangkan TCP lebih berat karena membawa banyak mekanisme kontrol. Maka UDP cocok untuk aplikasi yang peka terhadap waktu dan dapat menoleransi kehilangan sebagian data, sedangkan TCP cocok untuk aplikasi yang tidak boleh kehilangan data.

### S07 · Kesimpulan (4:18 – 4:40)

Dalam sistem terdistribusi, komponen-komponen yang tersebar harus saling bertukar pesan lewat jaringan, dan pilihan protokol transport memengaruhi kinerja serta keandalan sistem. Tidak ada yang selalu lebih baik. Semua tergantung kebutuhan aplikasi. Jika butuh keandalan, pilih TCP. Jika butuh kecepatan dan bisa menoleransi kehilangan data, pilih UDP.

### S08 · Penutup (4:40 – 4:52)

Itulah perbedaan TCP dan UDP: yang satu mengutamakan keandalan, yang lain mengutamakan kecepatan. Terima kasih sudah menyimak.

## 6. Storyboard

Waktu pada tabel bersifat relatif terhadap awal scene. Semua scene memakai chip nama scene di kiri atas dan progress bar di bawah. Total frame dihitung dari `scenes.ts`.

| Scene | Waktu video | Frame | Durasi | File |
| --- | --- | --- | --- | --- |
| S01 Pembuka | 0:00–0:20 | 0–599 | 20 dtk | `S01_Opening.tsx` |
| S02 Pengertian Protokol | 0:20–1:08 | 600–2039 | 48 dtk | `S02_Protocol.tsx` |
| S03 Lapisan Transport dan Port | 1:08–1:38 | 2040–2939 | 30 dtk | `S03_Transport.tsx` |
| S04 UDP | 1:38–2:33 | 2940–4589 | 55 dtk | `S04_UDP.tsx` |
| S05 TCP | 2:33–3:48 | 4590–6839 | 75 dtk | `S05_TCP.tsx` |
| S06 Perbandingan | 3:48–4:18 | 6840–7739 | 30 dtk | `S06_Comparison.tsx` |
| S07 Kesimpulan | 4:18–4:40 | 7740–8399 | 22 dtk | `S07_Conclusion.tsx` |
| S08 Penutup | 4:40–4:52 | 8400–8759 | 12 dtk | `S08_Closing.tsx` |

### S01 · Pembuka

| Waktu | Pemicu narasi | Visual dan animasi |
| --- | --- | --- |
| 0–3 dtk | (awal) | Latar navy dengan grid titik halus dan garis jaringan yang berdenyut pelan. Judul ‘TCP vs UDP’ masuk dengan spring, lalu subjudul ‘Dua Protokol Transport dalam Sistem Terdistribusi’. Nama penyaji hanya tampil jika diisi di `meta.ts`. |
| 3–10 | Setiap kali kamu membuka situs web, mengirim pesan, atau menonton video | Tiga ikon (browser, chat, video) muncul bergantian. Masing-masing memancarkan paket kecil yang meluncur ke simpul globe di tengah lalu ke komputer tujuan. |
| 10–14 | Bagaimana data itu bisa sampai dengan benar? | Satu paket tiba di tujuan, badge ‘?’ berdenyut. |
| 14–20 | Jawabannya ada pada protokol… TCP dan UDP | Zoom-out halus. Badge TCP (biru) masuk dari kiri dan UDP (oranye) dari kanan. Kata ‘Protokol’ ter-highlight di tengah. |

### S02 · Pengertian Protokol

| Waktu | Pemicu narasi | Visual dan animasi |
| --- | --- | --- |
| 0–6 | Apa itu protokol? Protokol adalah sekumpulan aturan | Pertanyaan ‘Apa itu protokol?’ besar di tengah lalu naik ke atas. Kartu definisi: ‘Protokol = aturan dan kesepakatan komunikasi’. |
| 6–15 | format pesan, urutan pengiriman, tindakan | Tiga chip muncul dan menyala bergantian mengikuti kata: Format pesan (ikon amplop berstruktur), Urutan pengiriman (angka 1-2-3), Tindakan saat kirim/terima (panah dua arah). |
| 15–25 | Bayangkan dua orang berbicara | Dua avatar sederhana. Gelembung bicara bergantian kiri-kanan. Ikon ‘bahasa sama’ (dua gelembung dengan simbol identik). Penanda awal (‘Halo’) dan akhir (‘Sampai jumpa’). |
| 25–31 | Komputer pun sama. Tanpa protokol… | Avatar berubah menjadi dua komputer, gelembung menjadi paket. Tanpa protokol: paket berbentuk lingkaran vs persegi tidak cocok, muncul ✕ merah. Dengan protokol: bentuk sama, muncul ✓ hijau. |
| 31–38 | Dalam sistem terdistribusi… fondasi komunikasinya | Zoom-out ke graf 6 simpul yang saling terhubung dengan pulsa pesan. Sebuah garis dasar berlabel ‘Protokol’ menopang semua simpul. |
| 38–44 | HTTP, SMTP, FTP | Tiga ikon aplikasi muncul di simpul: Web (HTTP), Email (SMTP), Berkas (FTP). |
| 44–48 | …mengandalkan protokol lapisan transport… TCP dan UDP | Di bawah ikon aplikasi, pita ‘Lapisan Transport’ menyala. Dua kotak TCP (biru) dan UDP (oranye) muncul di dalamnya. |

### S03 · Lapisan Transport dan Port

| Waktu | Pemicu narasi | Visual dan animasi |
| --- | --- | --- |
| 0–7 | Data melewati beberapa lapisan. Protokol IP bertugas… | `LayerStack` tersusun dari bawah: Akses Jaringan, Internet (IP), Transport, Aplikasi. Lapisan IP menyala. Paket meluncur dari Host A ke Host B melintasi router, dengan label alamat IP (misalnya 192.168.1.10 ke 10.0.0.5). |
| 7–14 | Di dalam satu komputer ada banyak program | Zoom ke Host B. Tiga aplikasi (Web, Email, DNS) berjajar dengan badge port :80, :25, :53. |
| 14–24 | Di sinilah lapisan transport bekerja… nomor port | Paket tiba dengan label ‘IP 10.0.0.5 · Port 80’. Lapisan transport membaca port dan mengarahkan paket ke aplikasi Web. Anotasi: ‘IP → ke komputer’ dan ‘Port → ke aplikasi’. |
| 24–30 | UDP… TCP… | Lapisan transport bercabang menjadi dua pintu (`PortDoors`). Kiri oranye ‘UDP: sederhana dan cepat’ (ikon pesawat kertas). Kanan biru ‘TCP: andal dan terstruktur’ (ikon perisai-centang). |

### S04 · UDP – Connectionless

| Waktu | Pemicu narasi | Visual dan animasi |
| --- | --- | --- |
| 0–6 | Mari mulai dari UDP… | Judul ‘UDP — User Datagram Protocol’ dengan tag ‘Connectionless’. Seluruh scene bernuansa oranye. |
| 6–14 | tidak ada koneksi yang dibangun… datagram | Host A dan Host B dengan garis putus-putus di antaranya. Simbol handshake dicoret ✕. Datagram independen (berisi Src Port dan Dst Port) langsung meluncur tanpa persiapan. |
| 14–26 | Analogi kartu pos | Tangan menulis alamat di kartu pos, memasukkannya ke kotak pos, lalu pergi. Tidak ada panah balik dari tujuan. Badge ‘?’ muncul di atas rumah tujuan. |
| 26–40 | tidak menjamin paket tiba, urutan, pengiriman ulang | Simulasi: pengirim mengirim 5 datagram bernomor. Datagram #3 menghilang di tengah jalur dengan efek merah. Datagram #2 lewat jalur lebih lambat dan tiba setelah #4. Daftar urutan di penerima: 1, 4, 2, 5. Tidak ada panah balik atau pengiriman ulang di pengirim. Tiga label berurutan: ‘Tanpa jaminan sampai’, ‘Tanpa jaminan urutan’, ‘Tanpa pengiriman ulang’. |
| 40–47 | header UDP sangat ringan, delapan byte | `HeaderBar` empat kotak: Source Port, Destination Port, Length, Checksum, dengan kurung berlabel ‘8 byte’. Ikon petir ‘cepat, beban rendah’. |
| 47–55 | DNS, panggilan suara dan video, siaran langsung, game online | Empat ikon kasus penggunaan muncul bergantian dengan mikro-animasi: pencarian domain, telepon video, siaran langsung, gamepad. |

### S05 · TCP

| Waktu | Pemicu narasi | Visual dan animasi |
| --- | --- | --- |
| 0–6 | Sekarang kita beralih ke TCP… | Judul ‘TCP — Transmission Control Protocol’ dengan tag ‘Connection-oriented’. Seluruh scene bernuansa biru. |
| 6–10 | koneksi harus dibangun lebih dulu | Host A dan Host B. Garis penghubung digambar solid. Teks pendek ‘Koneksi dulu, data kemudian’. |
| 10–17 | Analogi menelepon | Ikon telepon: memanggil (bergetar), diangkat (‘Halo?’), baru gelembung percakapan mengalir. |
| 17–32 | three-way handshake: SYN, SYN-ACK, ACK | `SequenceDiagram` dengan lifeline Klien dan Server. Panah ① SYN (kiri ke kanan), ② SYN-ACK (kanan ke kiri), ③ ACK (kiri ke kanan), masing-masing muncul tepat saat disebut. Setelah ACK, kedua lifeline menjadi hijau dengan badge ‘Koneksi terbentuk (ESTABLISHED)’. |
| 32–46 | menjamin keandalan… nomor urut, ACK, kirim ulang | Pengirim mengirim segmen 1–4 bertanda nomor urut. ACK hijau kembali untuk 1 dan 2. Segmen 3 hilang (efek merah), lalu timer melingkar di pengirim berjalan hingga timeout (kuning). Segmen 3 dikirim ulang, ACK kembali. Penerima menyusun strip data 1-2-3-4 berurutan dengan centang. Label: ‘Nomor urut’, ‘ACK’, ‘Kirim ulang’. |
| 46–56 | kendali alur dan kendali kemacetan | Kendali alur: buffer penerima berbentuk tangki. Saat hampir penuh, laju pengirim melambat (label ‘Kendali alur’). Kendali kemacetan: jalur jaringan dengan kepadatan paket. Saat padat, laju pengirim turun (label ‘Kendali kemacetan’). Konsep saja, tanpa detail algoritma. |
| 56–62 | koneksi ditutup dengan sinyal FIN | Diagram sequence singkat: FIN, ACK, FIN, ACK. Kedua lifeline memudar dengan badge ‘Koneksi ditutup’. |
| 62–75 | overhead: header minimal 20 byte, waktu tunggu handshake. Web, email, berkas | `HeaderBar` TCP berukuran 20 byte, dengan siluet header UDP 8 byte di sampingnya sebagai pembanding. Ikon jam untuk waktu tunggu handshake. Lalu tiga ikon kasus penggunaan: browser (web), amplop (email), dokumen (transfer berkas). |

### S06 · Perbandingan

| Waktu | Pemicu narasi | Visual dan animasi |
| --- | --- | --- |
| 0–4 | Mari bandingkan keduanya | Layar terbelah: kolom kiri oranye ‘UDP’, kolom kanan biru ‘TCP’, judul ‘Perbandingan’. |
| 4–26 | tiap pernyataan perbandingan | `ComparisonTable`, baris muncul dan menyala sinkron dengan narasi: **Koneksi** (Connectionless / Connection-oriented), **Pengiriman** (Tanpa jaminan / Dijamin: ACK dan kirim ulang), **Urutan** (Tidak dijamin / Terjaga), **Beban** (Header 8 byte, ringan / Header min. 20 byte, lebih berat), **Cocok untuk** (DNS, suara/video, siaran, game / Web, email, transfer berkas). |
| 26–30 | Maka UDP cocok… TCP cocok… | Dua tag ringkasan: UDP ‘peka waktu, toleran kehilangan data’, TCP ‘tidak boleh kehilangan data’. |

### S07 · Kesimpulan

| Waktu | Pemicu narasi | Visual dan animasi |
| --- | --- | --- |
| 0–8 | Dalam sistem terdistribusi… bertukar pesan | Graf simpul sistem terdistribusi (klien, server aplikasi, database, cache) dengan pesan berjalan di tiap garis. Garis diberi warna biru atau oranye sesuai protokol. |
| 8–14 | Tidak ada yang selalu lebih baik | Timbangan dengan TCP dan UDP. Timbangan miring bergantian lalu seimbang. |
| 14–22 | Jika butuh keandalan… jika butuh kecepatan… | Diagram keputusan sederhana: ‘Butuh keandalan?’ menuju TCP (biru). ‘Butuh kecepatan dan toleran kehilangan data?’ menuju UDP (oranye). |

### S08 · Penutup

| Waktu | Pemicu narasi | Visual dan animasi |
| --- | --- | --- |
| 0–6 | Itulah perbedaan TCP dan UDP… Terima kasih | Badge TCP dan UDP bertemu di tengah dengan tulisan ‘Terima kasih’. |
| 6–12 | (hening, referensi tampil) | Judul ‘Referensi’ dan dua entri. Muncul juga nama mata kuliah dan program studi. |

**Referensi yang tampil di layar:**

1. Andrew Tanenbaum, Maarten van Steen. *Distributed Systems: Principles and Paradigms*, Second Edition. Prentice Hall, 2007.
2. Coulouris, Dollimore, Kindberg. *Distributed Systems: Concepts and Design*, Fifth Edition. Addison-Wesley, 2012. (Tahun pada lembar tugas terpotong; edisi ke-5 terbit 2012, mohon diverifikasi pengguna.)

Catatan: RFC 768 (UDP) dan RFC 9293 (TCP) hanya dipakai agent sebagai pembanding fakta, tidak ditampilkan di layar.

## 7. Struktur Kode dan Urutan Kerja Agent

```
src/
  index.ts, Root.tsx, Main.tsx
  config/   scenes.ts, theme.ts, meta.ts, audio.ts
  components/  SceneFrame, ProgressBar, Host, Packet, PacketFlight,
               SequenceDiagram, LayerStack, PortDoors, HeaderBar,
               ComparisonTable, Avatar, Icons
  scenes/   S01_Opening ... S08_Closing
public/audio/   (kosong, siap diisi voiceover.mp3 dan bgm.mp3)
README.md
```

**Urutan kerja:**

1. **Setup:** inisialisasi proyek Remotion TypeScript, atur script npm, dan buat `config/*` (durasi scene, tema, meta, flag audio).
2. **Komponen dasar:** `SceneFrame`, `ProgressBar`, `Packet`, `Host`, `PacketFlight`, `SequenceDiagram`, `HeaderBar`.
3. **Scene S01–S08** secara berurutan, mengikuti storyboard Bagian 6.
4. **Perakitan:** `Main.tsx` dengan `<Series>`, `Root.tsx` dengan Composition dan total durasi, serta slot audio opsional.
5. **QA:** jalankan `typecheck`. Buka Remotion Studio dan cek frame kunci: 300, 1200, 2500, 3800, 5200, 6000, 7200, 8000, 8600. Isi checklist Bagian 8.
6. **README:** cara menjalankan, cara menyesuaikan durasi setelah voice over, cara mengaktifkan audio, dan cara render (dijalankan pengguna).

## 8. Kriteria Selesai (Definition of Done)

- [ ] `npm run typecheck` lolos tanpa error.
- [ ] Composition `TcpUdpExplainer` tampil di Remotion Studio dengan durasi 8.760 frame (1920×1080, 30 fps).
- [ ] Delapan scene sesuai storyboard dan urutan naskah.
- [ ] Tiga topik wajib (Protokol, UDP, TCP) tercakup, ditambah perbandingan dan kesimpulan.
- [ ] Tidak ada subtitle atau teks narasi di layar.
- [ ] Tidak ada klaim dari daftar terlarang (2.3). Semua istilah satuan data konsisten (datagram, segmen, paket).
- [ ] Biru selalu TCP, oranye selalu UDP.
- [ ] Simulasi UDP menampilkan paket hilang dan tidak berurutan. Simulasi TCP menampilkan handshake, nomor urut, ACK, timeout, dan retransmisi.
- [ ] Tidak ada CSS animation, `setTimeout`, atau `Math.random()`. Animasi sepenuhnya frame-driven.
- [ ] Durasi scene hanya diatur dari `scenes.ts`. Proyek berjalan tanpa file audio.
- [ ] Video tidak dirender oleh agent. Laporan akhir berisi daftar file, asumsi, TODO, dan hasil checklist ini.
