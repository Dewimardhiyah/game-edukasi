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
  "7": "Mengenal Sisi dan Sudut Segi Empat",
  "8": "Persegi dan Persegi Panjang",
  "9": "Ciri-ciri Persegi",
  "10": "Ciri-ciri Persegi Panjang",
  "11": "Keliling Persegi",
  "12": "Keliling Persegi Panjang",
  "13": "Mengenal Segitiga",
  "14": "Ciri-ciri Segitiga",
  "15": "Sudut Siku-Siku di Sekitar Kita",
  "16": "Keliling Segitiga",
  "17": "Menghitung Keliling Segitiga",
  "18": "Soal Cerita Keliling Segitiga",
  "19": "Mengenal Lingkaran",
  "20": "Titik Pusat, Jari-jari, dan Diameter",
  "21": "Ciri-ciri Lingkaran",
  "22": "Lingkaran di Sekitar Kita",
  "23": "Mengenal Luas dengan Petak",
  "24": "Menghitung Luas Persegi dan Persegi Panjang",
  "25": "Luas Persegi",
  "26": "Luas Persegi Panjang",
  "27": "Menghitung Luas dengan Petak",
  "28": "Menggabungkan Bangun dengan Petak",
  "29": "Mengulang Keliling dan Luas",
  "30": "Tantangan Geometri Akhir"
};

export const BANK: Record<number, BankItem[]> = {
  4: [
    [1, "Berapa sisi yang dimiliki persegi?", "4 sisi", ["3 sisi", "5 sisi", "6 sisi"]],
    [2, "Berapa titik sudut yang dimiliki persegi panjang?", "4 titik sudut", ["2 titik sudut", "3 titik sudut", "5 titik sudut"]],
    [3, "Bentuk bangun datar yang memiliki 4 sisi disebut...", "Segi empat", ["Segitiga", "Lingkaran", "Segi lima"]],
    [4, "Bangun datar apa yang memiliki 4 sisi sama panjang?", "Persegi", ["Persegi panjang", "Segitiga", "Lingkaran"]],
    [5, "Berapa sisi persegi panjang yang panjangnya sama?", "Dua pasang sisi", ["Satu sisi", "Tiga sisi", "Semua sisi melengkung"]],
  ],
  5: [
    [6, "Benda berbentuk persegi panjang adalah...", "Pintu", ["Koin", "Bola", "Roda"]],
    [7, "Benda berbentuk persegi adalah...", "Ubin berbentuk kotak", ["Piring bundar", "Penggaris segitiga", "Roda sepeda"]],
    [8, "Persegi memiliki sisi yang...", "Sama panjang", ["Semuanya melengkung", "Berbeda semua", "Hanya memiliki 3 sisi"]],
    [9, "Persegi panjang memiliki sisi yang sama panjang pada...", "Sisi yang berhadapan", ["Semua sisi", "Satu sisi saja", "Tidak ada sisi"]],
    [10, "Bangun datar yang memiliki dua sisi panjang dan dua sisi pendek adalah...", "Persegi panjang", ["Segitiga", "Lingkaran", "Oval"]],
  ],
  6: [
    [11, "Keliling adalah panjang garis yang mengelilingi...", "Bangun datar", ["Bagian tengah bangun", "Satu titik", "Garis di dalam bangun"]],
    [12, "Persegi memiliki 4 sisi. Jika setiap sisi 3 cm, kelilingnya adalah...", "12 cm", ["7 cm", "9 cm", "15 cm"]],
    [13, "Panjang satu sisi persegi adalah 5 cm. Berapa keliling persegi itu?", "20 cm", ["5 cm", "16 cm", "24 cm"]],
    [14, "Persegi panjang memiliki sisi 5 cm dan 3 cm. Kelilingnya adalah...", "16 cm", ["8 cm", "15 cm", "20 cm"]],
    [15, "Kita ingin memasang pita di sekeliling bingkai. Yang perlu dihitung adalah...", "Keliling bingkai", ["Warna bingkai", "Luas bagian tengah", "Jumlah sudut"]],
  ],
  7: [
    [16, "Berapa sisi yang dimiliki segitiga?", "3 sisi", ["2 sisi", "4 sisi", "5 sisi"]],
    [17, "Berapa titik sudut pada segitiga?", "3 titik sudut", ["2 titik sudut", "4 titik sudut", "5 titik sudut"]],
    [18, "Bangun datar yang memiliki 3 sisi disebut...", "Segitiga", ["Persegi", "Lingkaran", "Persegi panjang"]],
    [19, "Atap rumah pada gambar sederhana sering berbentuk...", "Segitiga", ["Lingkaran", "Persegi panjang", "Oval"]],
    [20, "Segitiga memiliki berapa sisi lurus?", "3 sisi", ["1 sisi", "2 sisi", "4 sisi"]],
  ],
  8: [
    [21, "Segitiga yang memiliki tiga sisi sama panjang disebut...", "Segitiga sama sisi", ["Segitiga sama kaki", "Segitiga siku-siku", "Persegi"]],
    [22, "Segitiga yang memiliki dua sisi sama panjang disebut...", "Segitiga sama kaki", ["Segitiga sama sisi", "Lingkaran", "Persegi panjang"]],
    [23, "Sudut seperti pojok buku disebut sudut...", "Siku-siku", ["Lengkung", "Bulat", "Miring"]],
    [24, "Penggaris segitiga siku-siku memiliki satu sudut...", "Siku-siku", ["Bulat", "Lengkung", "Lurus"]],
    [25, "Bentuk potongan pizza biasanya menyerupai...", "Segitiga", ["Persegi", "Lingkaran penuh", "Persegi panjang"]],
  ],
  9: [
    [26, "Untuk mencari keliling segitiga, kita menjumlahkan...", "Panjang ketiga sisinya", ["Dua titik sudutnya", "Warna setiap sisinya", "Panjang satu sisi saja"]],
    [27, "Segitiga memiliki sisi 3 cm, 4 cm, dan 5 cm. Kelilingnya adalah...", "12 cm", ["9 cm", "10 cm", "15 cm"]],
    [28, "Segitiga sama sisi memiliki sisi 4 cm. Kelilingnya adalah...", "12 cm", ["8 cm", "10 cm", "16 cm"]],
    [29, "Panjang sisi-sisi segitiga adalah 2 cm, 3 cm, dan 4 cm. Kelilingnya adalah...", "9 cm", ["7 cm", "8 cm", "10 cm"]],
    [30, "Sebuah taman segitiga memiliki sisi 5 m, 5 m, dan 4 m. Pagar yang dibutuhkan adalah...", "14 m", ["9 m", "10 m", "15 m"]],
  ],
  10: [
    [31, "Bentuk koin jika dilihat dari atas adalah...", "Lingkaran", ["Segitiga", "Persegi", "Persegi panjang"]],
    [32, "Lingkaran memiliki berapa titik sudut?", "Tidak memiliki titik sudut", ["1 titik sudut", "2 titik sudut", "4 titik sudut"]],
    [33, "Titik yang tepat di tengah lingkaran disebut...", "Titik pusat", ["Titik sudut", "Garis tepi", "Sisi"]],
    [34, "Garis dari titik pusat ke tepi lingkaran disebut...", "Jari-jari", ["Sisi", "Titik sudut", "Keliling persegi"]],
    [35, "Roda sepeda memiliki bentuk seperti...", "Lingkaran", ["Segitiga", "Persegi panjang", "Segi lima"]],
  ],
  11: [
    [36, "Garis dari satu tepi lingkaran ke tepi seberangnya melalui titik pusat disebut...", "Diameter", ["Jari-jari", "Titik sudut", "Sisi"]],
    [37, "Diameter lingkaran panjangnya 8 cm. Jari-jarinya adalah...", "4 cm", ["2 cm", "8 cm", "16 cm"]],
    [38, "Jari-jari lingkaran panjangnya 3 cm. Diameternya adalah...", "6 cm", ["3 cm", "5 cm", "9 cm"]],
    [39, "Bagian tepi lingkaran berbentuk garis...", "Lengkung", ["Lurus", "Segitiga", "Persegi"]],
    [40, "Jika sebuah lingkaran dilipat tepat melalui titik pusatnya, kedua bagiannya...", "Sama besar", ["Berbeda warna", "Menjadi segitiga", "Hilang"]],
  ],
  12: [
    [41, "Manakah benda yang berbentuk lingkaran?", "Piring", ["Buku tulis", "Pintu", "Penggaris"]],
    [42, "Lingkaran memiliki tepi yang...", "Melengkung", ["Terdiri dari 4 garis lurus", "Memiliki 3 sudut", "Berbentuk zig-zag"]],
    [43, "Bagian tengah jam dinding biasanya berbentuk...", "Lingkaran", ["Segitiga", "Persegi panjang", "Segi lima"]],
    [44, "Benda berbentuk lingkaran yang dapat menggelinding adalah...", "Roda", ["Buku", "Kotak", "Papan tulis"]],
    [45, "Bangun datar manakah yang tidak memiliki sisi lurus?", "Lingkaran", ["Persegi", "Segitiga", "Persegi panjang"]],
  ],
  13: [
    [46, "Kotak kecil yang menutupi permukaan gambar dapat membantu kita menghitung...", "Luas", ["Warna", "Titik sudut", "Panjang satu sisi"]],
    [47, "Satu baris berisi 4 kotak satuan. Luasnya adalah...", "4 kotak satuan", ["2 kotak satuan", "3 kotak satuan", "5 kotak satuan"]],
    [48, "Sebuah gambar terdiri dari 2 baris, masing-masing 3 kotak. Jumlah kotaknya adalah...", "6 kotak", ["5 kotak", "8 kotak", "9 kotak"]],
    [49, "Luas menunjukkan banyaknya kotak yang menutupi bagian...", "Dalam bangun", ["Di luar bangun", "Titik sudut", "Garis tepi saja"]],
    [50, "Satuan yang cocok untuk menyebut luas permukaan meja adalah...", "Kotak satuan", ["Titik sudut", "Sisi", "Garis lengkung"]],
  ],
  14: [
    [51, "Persegi memiliki 3 baris kotak, setiap baris berisi 3 kotak. Jumlah seluruh kotak adalah...", "9 kotak", ["6 kotak", "8 kotak", "12 kotak"]],
    [52, "Persegi panjang terdiri dari 2 baris, masing-masing 5 kotak. Luasnya adalah...", "10 kotak satuan", ["7 kotak satuan", "5 kotak satuan", "12 kotak satuan"]],
    [53, "Bangun yang menutupi lebih banyak kotak satuan memiliki...", "Luas lebih besar", ["Keliling lebih kecil", "Lebih sedikit sisi", "Lebih banyak warna"]],
    [54, "Satu baris memiliki 4 kotak dan ada 2 baris. Jumlah semua kotak adalah...", "8 kotak", ["6 kotak", "10 kotak", "12 kotak"]],
    [55, "Untuk membandingkan luas dua gambar, kita dapat menghitung...", "Jumlah kotak satuannya", ["Jumlah warnanya", "Nama gambarnya", "Jumlah pensil"]],
  ],
  15: [
    [56, "Bangun datar yang memiliki 4 sisi sama panjang adalah...", "Persegi", ["Segitiga", "Lingkaran", "Persegi panjang"]],
    [57, "Keliling persegi dengan sisi 2 cm adalah...", "8 cm", ["4 cm", "6 cm", "10 cm"]],
    [58, "Berapa titik sudut yang dimiliki segitiga?", "3 titik sudut", ["2 titik sudut", "4 titik sudut", "5 titik sudut"]],
    [59, "Sebuah gambar terdiri dari 3 baris, masing-masing 2 kotak. Jumlah kotaknya adalah...", "6 kotak", ["5 kotak", "8 kotak", "9 kotak"]],
    [60, "Benda berbentuk lingkaran adalah...", "Roda", ["Pintu", "Buku", "Ubin persegi"]],
  ],
};
