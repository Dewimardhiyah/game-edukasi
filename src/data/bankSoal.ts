/**
* Bank soal Level 4-15, masing-masing berisi 5 soal untuk siswa kelas 2-3 SD.
* Format tiap soal: [nomor, pertanyaan, jawaban benar, [3 pengecoh]].
* Urutan pilihan diacak otomatis di levels.ts.
*/
export type BankItem = [number, string, string, [string, string, string]];

export const LEVEL_TITLES: Record<number, string> = {
  "1": "Mengenal Lingkaran dan Persegi",
  "2": "Mengenal Segitiga dan Persegi Panjang",
  "3": "Identifikasi Gambar dan Objek",
  "4": "Pengelompokan & Pembagian Bentuk",
  "5": "Membedakan Sisi Lurus & Lengkung",
  "6": "Evaluasi Dasar Pulau Bentuk",
  "7": "Mengenal Bangun Segi Empat",
  "8": "Persegi dan Persegi Panjang",
  "9": "Ciri-ciri Persegi",
  "10": "Ciri-ciri Persegi Panjang",
  "11": "Sisi dan Sudut Persegi",
  "12": "Benda Berbentuk Segi Empat",
  "13": "Mengenal Segitiga",
  "14": "Ciri-ciri Segitiga",
  "15": "Jenis Segitiga",
  "16": "Segitiga di Sekitar Kita",
  "17": "Mengamati Bentuk Segitiga",
  "18": "Sisi dan Sudut Segitiga",
  "19": "Mengenal Lingkaran",
  "20": "Ciri-ciri Lingkaran",
  "21": "Lingkaran dan Bentuk Lain",
  "22": "Benda Berbentuk Lingkaran",
  "23": "Benda Berbentuk Lingkaran",
  "24": "Membedakan Lingkaran dan Bangun Lain",
  "25": "Mengenal Berbagai Bangun Datar",
  "26": "Ciri-ciri Bangun Datar",
  "27": "Bangun Datar di Sekitar Kita",
  "28": "Mengelompokkan Bangun Datar",
  "29": "Memilih Bentuk yang Sesuai",
  "30": "Tantangan Bentuk dan Benda"
};

export const BANK: Record<number, BankItem[]> = {
  4: [
    [1, "Bangun datar yang memiliki empat sisi disebut...", "Segi empat", ["Segitiga", "Lingkaran", "Segi lima"]],
    [2, "Bangun segi empat memiliki berapa titik sudut?", "4 titik sudut", ["2 titik sudut", "3 titik sudut", "5 titik sudut"]],
    [3, "Manakah yang termasuk bangun segi empat?", "Persegi", ["Segitiga", "Lingkaran", "Bulan sabit"]],
    [4, "Bentuk permukaan papan tulis biasanya menyerupai...", "Persegi panjang", ["Lingkaran", "Segitiga", "Oval"]],
    [5, "Ubin berbentuk kotak biasanya menyerupai...", "Persegi", ["Segitiga", "Lingkaran", "Persegi panjang"]],
  ],
  5: [
    [6, "Persegi memiliki empat sisi yang...", "Sama panjang", ["Melengkung", "Semua berbeda panjang", "Hanya dua sisi"]],
    [7, "Persegi panjang memiliki sisi yang sama panjang pada sisi...", "Yang berhadapan", ["Yang berdekatan saja", "Yang melengkung", "Semua berbeda panjang"]],
    [8, "Bangun datar yang semua sisinya sama panjang dan memiliki empat sudut siku-siku adalah...", "Persegi", ["Segitiga", "Lingkaran", "Persegi panjang"]],
    [9, "Bentuk buku tulis jika dilihat dari depan biasanya berupa...", "Persegi panjang", ["Lingkaran", "Segitiga", "Oval"]],
    [10, "Bentuk permukaan sapu tangan kotak biasanya menyerupai...", "Persegi", ["Lingkaran", "Segitiga", "Persegi panjang"]],
  ],
  6: [
    [11, "Pada persegi, jumlah sisi dan jumlah titik sudutnya adalah...", "Sama banyak", ["Sisi lebih banyak", "Titik sudut lebih banyak", "Tidak memiliki sisi"]],
    [12, "Sudut pada pojok persegi berbentuk...", "Sudut siku-siku", ["Sudut bulat", "Garis lengkung", "Tidak memiliki sudut"]],
    [13, "Bangun datar yang memiliki empat sisi lurus adalah...", "Persegi panjang", ["Lingkaran", "Setengah lingkaran", "Oval"]],
    [14, "Bentuk jendela yang memiliki empat sisi dan empat pojok biasanya...", "Persegi panjang", ["Lingkaran", "Segitiga", "Bulan sabit"]],
    [15, "Manakah pernyataan yang benar tentang persegi?", "Memiliki empat sisi sama panjang", ["Memiliki tiga sisi", "Tidak memiliki pojok", "Memiliki sisi melengkung"]],
  ],
  7: [
    [16, "Segitiga memiliki berapa sisi lurus?", "3 sisi", ["2 sisi", "4 sisi", "5 sisi"]],
    [17, "Berapa titik sudut yang dimiliki segitiga?", "3 titik sudut", ["1 titik sudut", "2 titik sudut", "4 titik sudut"]],
    [18, "Bangun datar yang memiliki tiga sisi disebut...", "Segitiga", ["Persegi", "Lingkaran", "Persegi panjang"]],
    [19, "Bendera kecil berbentuk segitiga memiliki berapa pojok?", "3 pojok", ["1 pojok", "2 pojok", "4 pojok"]],
    [20, "Sisi-sisi pada segitiga berupa garis...", "Lurus", ["Lengkung", "Bergelombang", "Melingkar"]],
  ],
  8: [
    [21, "Segitiga yang ketiga sisinya sama panjang disebut...", "Segitiga sama sisi", ["Segitiga sama kaki", "Segitiga berbeda sisi", "Persegi"]],
    [22, "Segitiga yang memiliki dua sisi sama panjang disebut...", "Segitiga sama kaki", ["Segitiga sama sisi", "Lingkaran", "Persegi panjang"]],
    [23, "Pada segitiga sama sisi, semua sisinya...", "Sama panjang", ["Berbentuk lengkung", "Berbeda semua", "Hanya dua"]],
    [24, "Pada segitiga sama kaki, ada berapa sisi yang sama panjang?", "Dua sisi", ["Satu sisi", "Tiga sisi", "Tidak ada sisi"]],
    [25, "Segitiga yang panjang ketiga sisinya berbeda disebut...", "Segitiga sembarang", ["Segitiga sama sisi", "Segitiga sama kaki", "Persegi"]],
  ],
  9: [
    [26, "Rambu lalu lintas peringatan sering memiliki bentuk...", "Segitiga", ["Lingkaran", "Persegi panjang", "Oval"]],
    [27, "Potongan semangka berbentuk irisan sering menyerupai...", "Segitiga", ["Persegi", "Persegi panjang", "Lingkaran"]],
    [28, "Bentuk atap rumah sederhana jika dilihat dari depan sering menyerupai...", "Segitiga", ["Lingkaran", "Oval", "Persegi"]],
    [29, "Alat musik triangle memiliki bentuk seperti...", "Segitiga", ["Persegi panjang", "Lingkaran", "Persegi"]],
    [30, "Bentuk manakah yang dapat digunakan sebagai gambar atap runcing?", "Segitiga", ["Lingkaran", "Persegi panjang", "Oval"]],
  ],
  10: [
    [31, "Koin jika dilihat dari atas memiliki bentuk...", "Lingkaran", ["Segitiga", "Persegi", "Persegi panjang"]],
    [32, "Lingkaran memiliki berapa titik sudut?", "Tidak memiliki titik sudut", ["1 titik sudut", "3 titik sudut", "4 titik sudut"]],
    [33, "Garis tepi lingkaran berbentuk...", "Lengkung", ["Lurus", "Berbentuk sudut", "Zig-zag"]],
    [34, "Manakah bangun datar yang tidak memiliki sisi lurus?", "Lingkaran", ["Persegi", "Segitiga", "Persegi panjang"]],
    [35, "Piring bundar jika dilihat dari atas menyerupai...", "Lingkaran", ["Segitiga", "Persegi", "Persegi panjang"]],
  ],
  11: [
    [36, "Lingkaran berbeda dari persegi karena lingkaran...", "Tidak memiliki pojok", ["Memiliki empat pojok", "Memiliki tiga sisi lurus", "Berbentuk kotak"]],
    [37, "Benda yang memiliki bentuk dasar lingkaran adalah...", "Jam dinding bundar", ["Buku tulis", "Pintu", "Penggaris segitiga"]],
    [38, "Roda dibuat berbentuk lingkaran agar mudah...", "Berputar", ["Memiliki pojok", "Dilipat menjadi persegi", "Berdiri seperti pintu"]],
    [39, "Manakah yang memiliki tepi melengkung?", "Piring bundar", ["Ubin persegi", "Buku tulis", "Papan tulis"]],
    [40, "Lingkaran memiliki sisi yang...", "Melengkung", ["Semuanya lurus", "Berjumlah tiga", "Berjumlah empat"]],
  ],
  12: [
    [41, "Benda yang permukaannya berbentuk lingkaran adalah...", "Tutup stoples bundar", ["Sampul buku", "Pintu kelas", "Ubin kotak"]],
    [42, "Bagian muka jam dinding bundar menyerupai bangun...", "Lingkaran", ["Segitiga", "Persegi panjang", "Persegi"]],
    [43, "Benda berbentuk lingkaran yang terdapat pada sepeda adalah...", "Roda", ["Setang", "Tempat duduk", "Rangka"]],
    [44, "Bentuk dasar sebuah kancing bundar adalah...", "Lingkaran", ["Segitiga", "Persegi panjang", "Segi lima"]],
    [45, "Manakah kelompok benda yang berbentuk lingkaran?", "Koin dan piring bundar", ["Buku dan pintu", "Atap dan penggaris segitiga", "Kotak dan papan tulis"]],
  ],
  13: [
    [46, "Bangun datar yang memiliki tiga sisi adalah...", "Segitiga", ["Lingkaran", "Persegi", "Persegi panjang"]],
    [47, "Bangun datar yang memiliki empat sisi sama panjang adalah...", "Persegi", ["Segitiga", "Lingkaran", "Persegi panjang"]],
    [48, "Bangun datar yang memiliki empat sisi dan sisi berhadapan sama panjang adalah...", "Persegi panjang", ["Segitiga", "Lingkaran", "Bulan sabit"]],
    [49, "Bangun datar yang seluruh tepinya melengkung adalah...", "Lingkaran", ["Persegi", "Segitiga", "Persegi panjang"]],
    [50, "Bangun datar yang tidak memiliki titik sudut adalah...", "Lingkaran", ["Persegi", "Segitiga", "Persegi panjang"]],
  ],
  14: [
    [51, "Bentuk permukaan meja biasanya menyerupai...", "Persegi panjang", ["Lingkaran", "Segitiga", "Oval"]],
    [52, "Bentuk sisi depan dadu biasanya menyerupai...", "Persegi", ["Lingkaran", "Segitiga", "Persegi panjang"]],
    [53, "Bentuk sepotong pizza yang diambil dari tengah ke pinggir menyerupai...", "Segitiga", ["Persegi", "Persegi panjang", "Lingkaran penuh"]],
    [54, "Bentuk mulut gelas jika dilihat dari atas biasanya menyerupai...", "Lingkaran", ["Segitiga", "Persegi", "Persegi panjang"]],
    [55, "Bentuk permukaan buku gambar biasanya menyerupai...", "Persegi panjang", ["Lingkaran", "Segitiga", "Oval"]],
  ],
  15: [
    [56, "Bentuk benda yang memiliki tiga sisi lurus dan tiga pojok adalah...", "Segitiga", ["Lingkaran", "Persegi", "Persegi panjang"]],
    [57, "Bentuk benda yang memiliki empat sisi sama panjang dan empat pojok adalah...", "Persegi", ["Segitiga", "Lingkaran", "Oval"]],
    [58, "Bentuk benda yang memiliki dua sisi panjang dan dua sisi pendek adalah...", "Persegi panjang", ["Lingkaran", "Segitiga", "Bulan sabit"]],
    [59, "Bentuk benda yang tidak memiliki pojok dan tepinya melengkung adalah...", "Lingkaran", ["Persegi", "Segitiga", "Persegi panjang"]],
    [60, "Manakah pasangan benda dan bentuk yang cocok?", "Roda - lingkaran", ["Pintu - segitiga", "Piring bundar - persegi", "Buku tulis - lingkaran"]],
  ],
};
