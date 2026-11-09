/**
 * PULAU 1 - PULAU BENTUK (Level 1-6)
 * Soal dibuat sesuai 4 jenis di storyboard:
 *   1. Identifikasi bentuk      -> grid, pilih 1 gambar benda
 *   2. Klasifikasi bentuk       -> grid, pilih semua yang cocok (multi)
 *   3. Ciri-ciri bentuk         -> list jawaban teks
 *   4. Penerapan dalam kehidupan-> gambar benda + pilih nama bentuk
 */
import type { ChoiceOption, QuizQuestion } from './levels';
import atapRumah from '../assets/atap.png';
import { OBJ } from './images';
import type { ObjKey } from './images';
import { SHAPE_META } from './shapes';
import type { ShapeKind } from './shapes';
import door from '../assets/pintu.png';
import bicycleWheel from '../assets/rodasepeda.jfif';
import tile from '../assets/ubin.png';

const ID = 'abcd';

/** Jenis 1 & 2: pilihan berupa gambar benda. [kunci gambar, benar?] */
function grid(
  id: string,
  type: 'single' | 'multi',
  prompt: string,
  items: [ObjKey, boolean][],
  explanation: string,
  visual?: QuizQuestion['visual'],
): QuizQuestion {
  return {
    id,
    type,
    layout: 'grid',
    prompt,
    visual,
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
const BASIC_SHAPES: ShapeKind[] = ['segitiga', 'persegi', 'lingkaran'];
const img = (k: ObjKey) => ({ image: OBJ[k].src });

export const PULAU1_QUESTIONS: Record<number, QuizQuestion[]> = {
  /* Level 1 - Mengenal Lingkaran dan Persegi */
  1: [
    shapes('1-1', 'Manakah gambar yang berbentuk segitiga?', BASIC_SHAPES, 'segitiga',
      'Segitiga memiliki tiga sisi lurus dan tiga sudut.'),
    shapes('1-2', 'Bangun datar manakah yang berbentuk bulat?', BASIC_SHAPES, 'lingkaran',
      'Lingkaran berbentuk bulat dan tidak memiliki sudut.'),
    {
      ...shapes('1-3', 'Pilih gambar yang merupakan persegi.', BASIC_SHAPES, 'persegi',
        'Persegi memiliki empat sisi sama panjang dan empat sudut siku-siku.'),
      optionsImageOnly: true,
    },
    shapes('1-4', 'Bentuk apa yang memiliki tiga sisi?', BASIC_SHAPES, 'segitiga',
      'Segitiga memiliki tiga sisi.'),
    shapes('1-5', 'Bangun datar apa yang memiliki empat sisi sama panjang?',
      ['persegi', 'persegi-panjang', 'segitiga'], 'persegi',
      'Persegi memiliki empat sisi yang sama panjang.'),
  ],

  /* Level 2 - Mengenal Segitiga dan Persegi Panjang */
  2: [
    text('2-1', 'Berapa jumlah sisi pada segitiga?',
      [['3', true], ['4', false], ['0', false]],
      'Segitiga memiliki tiga sisi lurus.', { shape: 'segitiga' }),
    text('2-2', 'Berapa jumlah titik sudut pada persegi?',
      [['4', true], ['3', false], ['0', false]],
      'Persegi memiliki empat titik sudut.', { shape: 'persegi' }),
    text('2-3', 'Berapa jumlah titik sudut pada lingkaran?',
      [['0', true], ['1', false], ['4', false]],
      'Lingkaran tidak memiliki titik sudut.', { shape: 'lingkaran' }),
    shapes('2-4', 'Bangun datar apa yang memiliki empat sisi?',
      ['persegi', 'segitiga', 'lingkaran'], 'persegi',
      'Persegi memiliki empat sisi.'),
    shapes('2-5', 'Bangun datar apa yang tidak memiliki titik sudut?',
      ['lingkaran', 'segitiga', 'persegi'], 'lingkaran',
      'Lingkaran tidak memiliki titik sudut.'),
  ],

  /* Level 3 - Penerapan: menemukan bentuk di sekitar kita */
  3: [
    grid('3-1', 'single', 'Jam dinding berbentuk bulat menyerupai bangun datar apa?',
      [['lingkaran', true], ['segitiga', false], ['persegi', false]],
      'Jam dinding berbentuk bulat seperti lingkaran.', img('jam')),
    grid('3-2', 'single', 'Atap rumah pada gambar menyerupai bentuk apa?',
      [['segitiga', true], ['persegiPanjang', false], ['lingkaran', false]],
      'Atap rumah berbentuk segitiga.', { image: atapRumah }),
    grid('3-3', 'single', 'Ubin dengan empat sisi sama panjang menyerupai apa?',
      [['persegi', true], ['persegiPanjang', false], ['lingkaran', false]],
      'Persegi memiliki empat sisi yang sama panjang.', { image: tile }),
    text('3-4', 'Pintu berbentuk persegi panjang memiliki berapa sisi?',
      [['4', true], ['3', false], ['0', false]],
      'Persegi panjang memiliki empat sisi.', { image: door }),
    grid('3-5', 'single', 'Roda sepeda jika dilihat dari samping berbentuk apa?',
      [['lingkaran', true], ['segitiga', false], ['persegi', false]],
      'Roda sepeda berbentuk lingkaran.', { image: bicycleWheel }),
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
  3: {
    subtitle: 'Hutan Bentuk',
    goal: 'Cari objek di hutan: jam, atap rumah, dan ubin dengan bentuk yang sesuai.',
  },
  4: { subtitle: 'Bukit Potong & Gabung', goal: 'Mengelompokkan, memotong, dan menggabungkan bentuk dasar.' },
  5: { subtitle: 'Sungai Lurus & Lengkung', goal: 'Membedakan sisi lurus dan sisi lengkung.' },
  6: { subtitle: 'Menara Ujian Pulau', goal: 'Mengulang semua bentuk dasar sebelum ke Hutan Segi Empat.' },
};
