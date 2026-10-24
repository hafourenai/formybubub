# Naskah voice over

Salinan narasi final Bagian 5 PRD, tanpa perubahan kalimat. Dokumen ini tidak diimpor ke video.

Saran pelafalan: TCP (te-ce-pe), UDP (u-de-pe), IP (ai-pi), DNS (de-en-es), SYN (sin), ACK (ek), FIN (fin).

## S01 · Pembuka (0:00 – 0:20)

Setiap kali kamu membuka situs web, mengirim pesan, atau menonton video, ada data yang berpindah dari satu komputer ke komputer lain. Tapi, bagaimana data itu bisa sampai dengan benar? Jawabannya ada pada protokol. Di video ini, kita akan membahas dua protokol penting: TCP dan UDP.

## S02 · Pengertian Protokol (0:20 – 1:08)

Apa itu protokol? Protokol adalah sekumpulan aturan dan kesepakatan yang mengatur bagaimana dua pihak berkomunikasi. Aturan ini menentukan format pesan, urutan pengiriman, dan tindakan yang harus dilakukan ketika pesan dikirim atau diterima.

Bayangkan dua orang yang sedang berbicara. Mereka harus memakai bahasa yang sama, bergantian bicara, dan tahu kapan percakapan dimulai dan diakhiri. Komputer pun sama. Tanpa protokol, perangkat yang berbeda tidak akan saling mengerti.

Dalam sistem terdistribusi, tempat banyak komputer bekerja sama lewat jaringan, protokol adalah fondasi komunikasinya. Contohnya HTTP untuk web, SMTP untuk email, dan FTP untuk transfer berkas. Protokol-protokol aplikasi ini mengandalkan protokol lapisan transport untuk mengantarkan data, dan dua yang paling terkenal adalah TCP dan UDP.

## S03 · Lapisan Transport dan Port (1:08 – 1:38)

Di jaringan, data melewati beberapa lapisan. Protokol IP bertugas mengantarkan paket dari satu komputer ke komputer lain berdasarkan alamat IP. Namun, di dalam satu komputer ada banyak program yang berjalan bersamaan. Di sinilah lapisan transport bekerja. Dengan bantuan nomor port, data diantarkan ke proses atau aplikasi yang tepat. Lapisan ini menyediakan dua pilihan utama: UDP yang sederhana dan cepat, serta TCP yang andal dan terstruktur.

## S04 · UDP – Connectionless (1:38 – 2:33)

Mari mulai dari UDP, singkatan dari User Datagram Protocol. UDP adalah protokol connectionless, artinya tidak ada koneksi yang dibangun sebelum data dikirim. Pengirim langsung mengirim data dalam bentuk paket independen yang disebut datagram.

Analogi mudahnya adalah mengirim kartu pos. Kamu menulis alamat, memasukkannya ke kotak pos, lalu pergi. Tidak ada konfirmasi bahwa kartu itu sampai.

Karena itu, UDP tidak menjamin paket tiba, tidak menjamin urutannya, dan tidak melakukan pengiriman ulang. Paket bisa hilang atau tiba dengan urutan berbeda.

Sebagai gantinya, header UDP sangat ringan, hanya delapan byte, sehingga pengiriman menjadi cepat dengan beban yang rendah. Itulah mengapa UDP dipakai pada layanan yang mengutamakan kecepatan, seperti DNS, panggilan suara dan video, siaran langsung, serta game online.

## S05 · TCP – Connection-Oriented (2:33 – 3:48)

Sekarang kita beralih ke TCP, singkatan dari Transmission Control Protocol. TCP adalah protokol connection-oriented, artinya sebuah koneksi harus dibangun lebih dulu sebelum data dikirim.

Analogi mudahnya adalah menelepon. Kamu menghubungi, menunggu diangkat, memastikan lawan bicara siap, baru mulai berbicara.

Di TCP, proses ini disebut three-way handshake. Pertama, klien mengirim SYN. Kedua, server membalas dengan SYN-ACK. Ketiga, klien mengirim ACK. Setelah itu, koneksi terbentuk dan data mulai mengalir.

TCP menjamin keandalan. Setiap segmen diberi nomor urut, dan penerima mengirim ACK sebagai tanda terima. Jika ACK tidak datang dalam waktu tertentu, pengirim akan mengirim ulang segmen tersebut. Nomor urut juga memastikan data tersusun dalam urutan yang benar.

Selain itu, TCP memiliki kendali alur, agar pengirim tidak membanjiri penerima, dan kendali kemacetan, agar jaringan tidak kewalahan. Setelah selesai, koneksi ditutup secara teratur menggunakan sinyal FIN.

Harganya adalah overhead yang lebih besar: header minimal dua puluh byte dan waktu tunggu untuk handshake. Karena keandalannya, TCP dipakai untuk web, email, dan transfer berkas.

## S06 · Perbandingan (3:48 – 4:18)

Mari bandingkan keduanya. UDP bersifat connectionless, sedangkan TCP connection-oriented. UDP tidak menjamin pengiriman, sedangkan TCP menjamin lewat konfirmasi dan pengiriman ulang. UDP tidak menjamin urutan, sedangkan TCP menjaga urutan data. UDP ringan dan cepat, sedangkan TCP lebih berat karena membawa banyak mekanisme kontrol. Maka UDP cocok untuk aplikasi yang peka terhadap waktu dan dapat menoleransi kehilangan sebagian data, sedangkan TCP cocok untuk aplikasi yang tidak boleh kehilangan data.

## S07 · Kesimpulan (4:18 – 4:40)

Dalam sistem terdistribusi, komponen-komponen yang tersebar harus saling bertukar pesan lewat jaringan, dan pilihan protokol transport memengaruhi kinerja serta keandalan sistem. Tidak ada yang selalu lebih baik. Semua tergantung kebutuhan aplikasi. Jika butuh keandalan, pilih TCP. Jika butuh kecepatan dan bisa menoleransi kehilangan data, pilih UDP.

## S08 · Penutup (4:40 – 4:52)

Itulah perbedaan TCP dan UDP: yang satu mengutamakan keandalan, yang lain mengutamakan kecepatan. Terima kasih sudah menyimak.
