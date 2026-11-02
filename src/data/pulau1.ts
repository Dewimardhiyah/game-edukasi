/**
 * PULAU 1 - PULAU BENTUK (Level 1-6)
 * Soal dibuat sesuai 4 jenis di storyboard:
 *   1. Identifikasi bentuk      -> grid, pilih 1 gambar benda
 *   2. Klasifikasi bentuk       -> grid, pilih semua yang cocok (multi)
 *   3. Ciri-ciri bentuk         -> list jawaban teks
 *   4. Penerapan dalam kehidupan-> gambar benda + pilih nama bentuk
 */
import type { ChoiceOption, QuizQuestion } from './levels';
import { OBJ } from './images';
import type { ObjKey } from './images';
import { SHAPE_META } from './shapes';
import type { ShapeKind } from './shapes';

const ID = 'abcd';

/** Jenis 1 & 2: pilihan berupa gambar benda. [kunci gambar, benar?] */
function grid(
  id: string,
  type: 'single' | 'multi',
  prompt: string,
  items: [ObjKey, boolean][],
  explanation: string,
): QuizQuestion {
  return {
    id,
    type,
    layout: 'grid',
    prompt,
    options: items.map(([key, correct], i) => ({
      id: ID[i],
      label: OBJ[key].label,
      image: OBJ[key].src,
      correct,
    })),
    explanation,
  };
}

/** Jenis 3: pilihan teks biasa. Item pertama = [label, benar?]. */
function text(
  id: string,
  prompt: string,
  items: [string, boolean][],
  explanation: string,
  visual?: QuizQuestion['visual'],
): QuizQuestion {
  return {
    id,
    type: 'single',
    layout: 'list',
    prompt,
    visual,
    options: items.map(([label, correct], i) => ({ id: ID[i], label, correct })),
    explanation,
  };
}

/** Jenis 4: pilihan nama bentuk (dengan ikon). `answer` = bentuk yang benar. */
function shapes(
  id: string,
  prompt: string,
  kinds: ShapeKind[],
  answer: ShapeKind,
  explanation: string,
  visual?: QuizQuestion['visual'],
): QuizQuestion {
  const options: ChoiceOption[] = kinds.map((k, i) => ({
    id: ID[i],
    label: SHAPE_META[k].label,
    shape: k,
    correct: k === answer,
  }));
  return { id, type: 'single', layout: 'list', prompt, visual, options, explanation };
}

const ALL: ShapeKind[] = ['lingkaran', 'persegi', 'segitiga', 'persegi-panjang'];
const img = (k: ObjKey) => ({ image: OBJ[k].src });

export const PULAU1_QUESTIONS: Record<number, QuizQuestion[]> = {
  /* Level 1 - Mengenal Lingkaran dan Persegi */
  1: [
    grid('1-1', 'single', 'Manakah benda yang berbentuk lingkaran?',
      [['jam', true], ['tenda', false], ['buku', false], ['pintu', false]],
      'Lingkaran itu bulat penuh, tanpa sudut dan tanpa sisi lurus. Jam dinding bentuknya bundar.'),
    grid('1-2', 'multi', 'Pilih semua benda yang berbentuk lingkaran!',
      [['bola', true], ['koin', true], ['papanTulis', false], ['pintu', false]],
      'Bola dan koin bundar. Papan tulis dan pintu punya sudut di pojoknya, jadi bukan lingkaran.'),
    shapes('1-3', 'Permukaan Rubik jika dilihat dari satu sisi berbentuk apa?', ALL, 'persegi',
      'Setiap sisi Rubik punya 4 sisi sama panjang dan 4 sudut siku-siku. Itu ciri persegi.', img('rubik')),
    shapes('1-4', 'Uang logam ini berbentuk apa?', ALL, 'lingkaran',
      'Uang logam itu bulat, tidak punya sudut sama sekali. Jadi bentuknya lingkaran.', img('koin')),
    shapes('1-5', 'Ubin lantai yang keempat sisinya sama panjang berbentuk apa?', ALL, 'persegi',
      'Empat sisi sama panjang dan empat sudut siku-siku adalah ciri persegi.', img('persegi')),
  ],

  /* Level 2 - Mengenal Segitiga dan Persegi Panjang */
  2: [
    grid('2-1', 'single', 'Manakah benda yang berbentuk segitiga?',
      [['pizza', true], ['bola', false], ['jam', false], ['koin', false]],
      'Potongan pizza punya 3 sisi lurus dan 3 sudut. Itu segitiga.'),
    grid('2-2', 'multi', 'Pilih semua benda yang berbentuk persegi panjang!',
      [['pintu', true], ['buku', true], ['papanTulis', true], ['jam', false]],
      'Pintu, buku, dan papan tulis punya 4 sisi dan 4 sudut siku-siku. Jam dinding bundar, jadi bukan.'),
    shapes('2-3', 'Bagian depan tenda pramuka ini berbentuk apa?', ALL, 'segitiga',
      'Tenda pramuka meruncing ke atas dengan 3 sisi lurus: bentuknya segitiga.', img('tenda')),
    shapes('2-4', 'Papan tulis di kelas berbentuk apa?', ALL, 'persegi-panjang',
      'Papan tulis lebih lebar daripada tingginya, dengan 4 sudut siku-siku: persegi panjang.', img('papanTulis')),
    text('2-5', 'Berapa banyak sisi yang dimiliki oleh segitiga?',
      [['3', true], ['4', false], ['5', false], ['6', false]],
      'Nama "segitiga" sudah jadi petunjuk: ada tiga sisi lurus dan tiga sudut.', { shape: 'segitiga' }),
  ],

  /* Level 3 - Identifikasi Gambar dan Objek */
  3: [
    grid('3-1', 'single', 'Benda mana yang permukaannya berbentuk persegi panjang?',
      [['papanTulis', true], ['bola', false], ['koin', false], ['pizza', false]],
      'Papan tulis punya 4 sisi dengan sudut siku-siku. Dua sisi yang berhadapan sama panjang.'),
    text('3-2', 'Manakah kelompok benda yang seluruhnya berbentuk lingkaran?',
      [['Koin, piring, CD musik', true], ['Buku, meja, papan tulis', false],
        ['Penggaris, tenda, topi', false], ['Pintu, jendela, lemari', false]],
      'Koin, piring, dan CD sama-sama bundar. Kelompok lain berisi benda yang punya sudut.'),
    grid('3-3', 'single', 'Benda mana yang berbentuk dasar segitiga?',
      [['penggaris', true], ['jam', false], ['pintu', false], ['bola', false]],
      'Penggaris segitiga punya 3 sisi lurus dan 3 sudut, salah satunya sudut siku-siku.'),
    shapes('3-4', 'Atap rumah ini berbentuk apa?', ALL, 'segitiga',
      'Atap rumah meruncing dengan 3 sisi lurus. Itu bentuk segitiga.', img('rumah')),
    shapes('3-5', 'Papan catur terdiri dari kotak-kotak berbentuk apa?', ALL, 'persegi',
      'Setiap kotak papan catur punya 4 sisi sama panjang: persegi.'),
  ],

  /* Level 4 - Pengelompokan & Pembagian Bentuk */
  4: [
    shapes('4-1', 'Jika sebuah persegi dipotong miring dari pojok ke pojok, kamu mendapat 2 buah...',
      ['segitiga', 'lingkaran', 'persegi-panjang', 'persegi'], 'segitiga',
      'Potongan miring dari pojok ke pojok membuat dua bangun dengan 3 sisi lurus: segitiga.', img('persegi')),
    shapes('4-2', 'Dua persegi yang sama ukurannya ditempel berdampingan. Hasilnya berbentuk...',
      ['segitiga', 'lingkaran', 'persegi-panjang', 'persegi'], 'persegi-panjang',
      'Dua persegi berdampingan membentuk bangun yang dua kali lebih panjang: persegi panjang.'),
    grid('4-3', 'multi', 'Pilih semua bangun yang tidak punya sisi lurus!',
      [['lingkaran', true], ['oval', true], ['persegi', false], ['segitiga', false]],
      'Lingkaran dan oval hanya punya garis lengkung. Persegi dan segitiga punya sisi lurus.'),
    shapes('4-4', 'Bangun yang punya tepat 3 sisi lurus adalah...',
      ['segitiga', 'persegi', 'lingkaran', 'persegi-panjang'], 'segitiga',
      'Segitiga punya 3 sisi lurus. Persegi dan persegi panjang punya 4, lingkaran tidak punya sisi lurus.'),
    shapes('4-5', 'Sapu tangan persegi dilipat dua secara mendatar. Bentuknya menjadi...',
      ['segitiga', 'lingkaran', 'persegi-panjang', 'persegi'], 'persegi-panjang',
      'Setelah dilipat dua, sisi yang satu jadi setengahnya sehingga bentuknya memanjang: persegi panjang.'),
  ],

  /* Level 5 - Membedakan Sisi Lurus & Lengkung */
  5: [
    shapes('5-1', 'Bangun yang dibatasi satu garis lengkung tertutup adalah...', ALL, 'lingkaran',
      'Lingkaran hanya punya satu garis lengkung yang menutup, tanpa sudut.'),
    grid('5-2', 'single', 'Manakah benda yang permukaannya TIDAK punya sisi lurus?',
      [['bola', true], ['buku', false], ['pintu', false], ['papanTulis', false]],
      'Bola itu bulat di semua sisi. Buku, pintu, dan papan tulis punya tepi yang lurus.'),
    grid('5-3', 'single', 'Bangun mana yang punya satu sisi lurus dan satu sisi lengkung?',
      [['setengahLingkaran', true], ['segitiga', false], ['lingkaran', false], ['persegiPanjang', false]],
      'Setengah lingkaran punya sisi lurus di bawah dan garis lengkung di atas.'),
    shapes('5-4', 'Rumah sederhana terdiri dari dinding persegi panjang dan atap berbentuk...', ALL, 'segitiga',
      'Atap yang meruncing ke atas berbentuk segitiga.', img('rumah')),
    text('5-5', 'Roda mobil dibuat berbentuk lingkaran agar...',
      [['Mudah menggelinding', true], ['Punya sudut tajam', false],
        ['Berhenti sendiri', false], ['Tidak bisa bergerak', false]],
      'Lingkaran tidak punya sudut, jadi roda bisa menggelinding mulus.', img('koin')),
  ],

  /* Level 6 - Evaluasi Dasar Pulau Bentuk */
  6: [
    text('6-1', 'Urutkan dari jumlah sisi paling sedikit: Lingkaran, Segitiga, Persegi!',
      [['Lingkaran (1 lengkung), Segitiga (3), Persegi (4)', true],
        ['Persegi, Segitiga, Lingkaran', false], ['Segitiga, Persegi, Lingkaran', false], ['Semuanya sama', false]],
      'Lingkaran punya 1 sisi lengkung, segitiga 3 sisi, persegi 4 sisi.'),
    shapes('6-2', 'Bangun datar yang keempat sisinya sama panjang dinamakan...', ALL, 'persegi',
      'Persegi punya 4 sisi sama panjang. Persegi panjang hanya sisi berhadapannya yang sama.'),
    grid('6-3', 'multi', 'Pilih semua benda yang berbentuk lingkaran!',
      [['jam', true], ['bola', true], ['koin', true], ['pizza', false]],
      'Jam, bola, dan koin bundar. Potongan pizza berbentuk segitiga.'),
    shapes('6-4', 'Bangun yang punya 2 pasang sisi sejajar dan sama panjang adalah...', ALL, 'persegi-panjang',
      'Pada persegi panjang, sisi yang berhadapan sejajar dan sama panjang.'),
    text('6-5', 'Selamat! Berapa bentuk dasar utama yang kamu pelajari di Pulau Bentuk?',
      [['4 (Persegi, Persegi Panjang, Segitiga, Lingkaran)', true], ['2', false], ['10', false], ['1', false]],
      'Ada 4 bentuk dasar: persegi, persegi panjang, segitiga, dan lingkaran.'),
  ],
};

/** Teks detail level (Scene 2) untuk Level 1-6. */
export const PULAU1_META: Record<number, { subtitle: string; goal: string }> = {
  1: { subtitle: 'Gerbang Pulau Bentuk', goal: 'Mengenali lingkaran dan persegi pada benda di sekitarmu.' },
  2: { subtitle: 'Jembatan Sudut Siku', goal: 'Mengenali segitiga dan persegi panjang pada benda sehari-hari.' },
  3: { subtitle: 'Lembah Benda Sekitar', goal: 'Mengidentifikasi bentuk dari gambar dan benda nyata.' },
  4: { subtitle: 'Bukit Potong & Gabung', goal: 'Mengelompokkan, memotong, dan menggabungkan bentuk dasar.' },
  5: { subtitle: 'Sungai Lurus & Lengkung', goal: 'Membedakan sisi lurus dan sisi lengkung.' },
  6: { subtitle: 'Menara Ujian Pulau', goal: 'Mengulang semua bentuk dasar sebelum ke Hutan Segi Empat.' },
};
