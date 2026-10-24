# TCP vs UDP — motion graphic Remotion

Proyek React + TypeScript strict berdasarkan **PRD Video Motion Graphic TCP vs UDP (Remotion).md**. Composition: **`TcpUdpExplainer` · 1920×1080 · 30 fps · 8.760 frame · 04:52**.

## Menjalankan

Node.js 22 disarankan (versi yang digunakan untuk verifikasi: 22.13.1).

```sh
npm ci
npm run typecheck
npm run dev
```

Buka alamat yang dicetak Remotion Studio, lalu pilih `TcpUdpExplainer`. Delapan scene sudah terpasang dalam timeline. Preview awal tanpa suara adalah normal: kedua flag audio default `false`.

### Render oleh pengguna

```sh
npm run render
```

Script tersebut menjalankan `remotion render TcpUdpExplainer out/tcp-udp.mp4`; ekstensi MP4 menggunakan codec H.264 default Remotion. File hasil berada di `out/tcp-udp.mp4`. **Agent tidak menjalankan render dan tidak menghasilkan video.**

## Menyesuaikan voice over

1. Rekam naskah di [`docs/NARASI.md`](docs/NARASI.md), salinan verbatim Bagian 5 PRD.
2. Ubah `durationSeconds` scene yang relevan di [`src/config/scenes.ts`](src/config/scenes.ts).
3. Durasi beat otomatis diskalakan proporsional. Untuk menyesuaikan jeda antarkalimat, ubah bobot `seconds` beat di file yang sama. Total durasi scene tetap mengikuti `durationSeconds`.
4. `Root.tsx`, `<Series>`, progress bar, dan semua awal scene menghitung ulang dari konfigurasi tersebut. Tidak perlu mengubah durasi di file scene.
5. Fade-in dan fade-out 10 frame berada di dalam slot scene. Fade antarbeat 8 frame juga berada di dalam slot. Tidak ada overlap antarscene.

Waktu peristiwa kecil (misalnya datagram tiba dan timeout) menggunakan progres relatif 0–1, sehingga ikut menyesuaikan durasi beat.

### Audio opsional

Letakkan file milik Anda di:

```text
public/audio/voiceover.mp3
public/audio/bgm.mp3
```

Lalu ubah `enabled` menjadi `true` untuk audio yang tersedia di [`src/config/audio.ts`](src/config/audio.ts). Voice over mulai pada frame 0. Musik diulang sepanjang composition dengan volume **0.1**. Flag masing-masing independen; tidak ada elemen `<Audio>` atau permintaan file MP3 ketika flag `false`.

### Identitas

Isi `meta.presenter` di [`src/config/meta.ts`](src/config/meta.ts). Jika kosong, nama penyaji tidak tampil. Mata kuliah, program studi, pertemuan, dan referensi juga berada di file tersebut.

## Pemetaan scene

Semua path pada tabel relatif terhadap `src/scenes/`. Komentar sebelum setiap beat menunjuk kalimat naskah yang mendasarinya.

| Scene | Frame awal–akhir | Durasi | File | Ilustrasi utama |
|---|---:|---:|---|---|
| S01 | 0–599 | 20 dtk | `S01_Opening.tsx` | Web/pesan/video, jaringan, dua protokol |
| S02 | 600–2039 | 48 dtk | `S02_Protocol.tsx` | Aturan, percakapan, kompatibilitas, HTTP/SMTP/FTP |
| S03 | 2040–2939 | 30 dtk | `S03_Transport.tsx` | Lapisan, IP ke host, port ke aplikasi |
| S04 | 2940–4589 | 55 dtk | `S04_UDP.tsx` | Connectionless, kartu pos, kehilangan/urutan, header, penggunaan |
| S05 | 4590–6839 | 75 dtk | `S05_TCP.tsx` | Telepon, handshake, ACK/timeout/retransmisi, kendali, FIN, overhead |
| S06 | 6840–7739 | 30 dtk | `S06_Comparison.tsx` | Lima baris perbandingan |
| S07 | 7740–8399 | 22 dtk | `S07_Conclusion.tsx` | Sistem terdistribusi, timbangan, keputusan |
| S08 | 8400–8759 | 12 dtk | `S08_Closing.tsx` | Terima kasih dan referensi |

## Daftar file

```text
package.json, package-lock.json, tsconfig.json, .gitignore
README.md
PRD Video Motion Graphic TCP vs UDP (Remotion).md   # sumber asli
docs/
  NARASI.md                                      # naskah siap rekam
  QA.md                                          # hasil verifikasi & checklist
scripts/
  prepare-fonts.mjs                               # setup font lokal saja
  studio-qa.js                                    # pemeriksaan browser Studio
public/
  audio/.gitkeep                                  # slot file audio opsional
  fonts/
    Inter-{400,600,700}-latin.woff2
    JetBrainsMono-{400,600}-latin.woff2
    Inter-OFL.txt, JetBrainsMono-OFL.txt
src/
  index.ts, Root.tsx, Main.tsx
  config/
    scenes.ts, theme.ts, meta.ts, audio.ts, fonts.ts
  lib/
    motion.ts
  components/
    SceneFrame.tsx, ProgressBar.tsx, Beat.tsx, Primitives.tsx
    Host.tsx, Packet.tsx, PacketFlight.tsx, SequenceDiagram.tsx
    LayerStack.tsx, PortDoors.tsx, HeaderBar.tsx, ComparisonTable.tsx
    Avatar.tsx, Icons.tsx, NetworkGraph.tsx
    TransportSimulation.tsx, TransportControls.tsx
  scenes/
    S01_Opening.tsx, S02_Protocol.tsx, S03_Transport.tsx, S04_UDP.tsx
    S05_TCP.tsx, S06_Comparison.tsx, S07_Conclusion.tsx, S08_Closing.tsx
```

## Font dan aset offline

Semua ilustrasi dibuat dengan SVG/HTML/CSS lokal. Inter dan JetBrains Mono memakai metadata dan loader resmi **`@remotion/google-fonts`**, dengan URL diganti ke WOFF2 dalam `public/fonts/`. Font dan lisensinya sudah disertakan. Tidak ada unduhan Google Fonts dalam preview atau render.

Jika file font terhapus, jalankan `npm run fonts:prepare` **saat setup dengan internet**. Script ini tidak dipanggil oleh `dev` atau `render`. Instalasi paket npm dan penyediaan browser Remotion pertama kali dapat memerlukan internet; konten composition tidak mengakses layanan eksternal.

## Asumsi dan TODO

- **Font:** kewajiban Google Fonts dipenuhi lewat font yang disimpan lokal. “Tanpa aset eksternal” diterapkan pada ilustrasi dan seluruh akses jaringan eksternal saat playback/render.
- **Timing:** sinkronisasi saat ini mengikuti slot storyboard karena rekaman belum tersedia. Bobot beat dan durasi dapat disesuaikan tanpa mengubah naskah.
- **Nomor datagram UDP 1–5** adalah penanda ilustrasi, bukan field nomor urut UDP. Datagram 3 hilang, dan urutan penerima adalah **1, 4, 2, 5**. Tidak ada ACK atau pengiriman ulang.
- **Nomor segmen TCP 1–4** menyederhanakan urutan potongan data sesuai storyboard. Tidak memodelkan sequence number per byte atau nilai ACK numerik. Segmen 4 menunggu segmen 3 yang dikirim ulang sebelum strip data lengkap.
- **Perisai-centang** pada pilihan TCP bermakna keandalan sesuai storyboard; tidak menyatakan keamanan atau enkripsi.
- **Graf kesimpulan** adalah ilustrasi pertukaran pesan, bukan rekomendasi protokol tertentu untuk database/cache.
- **TODO(verify):** pengguna memverifikasi tahun **2012** pada referensi Coulouris karena tahun lembar tugas terpotong. Teks dipertahankan sesuai PRD di `src/config/meta.ts`.
- Nama penyaji sengaja kosong; kedua audio default nonaktif. Tidak ada fakta tambahan di luar PRD.

## Verifikasi

Hasil pemeriksaan dan seluruh checklist Bagian 8 ada di [`docs/QA.md`](docs/QA.md). Untuk seek manual di Studio, klik angka waktu/frame pada timeline, masukkan nomor frame (misalnya `5200`), lalu Enter.

`scripts/studio-qa.js` adalah alat inspeksi browser opsional untuk `playwright-cli`; Playwright bukan dependency proyek. Script memeriksa frame kunci, batas teks, ukuran label, font, dan audio tanpa menjalankan renderer. Screenshot browser lokal tersimpan di `qa/screenshots/` (diabaikan Git).
