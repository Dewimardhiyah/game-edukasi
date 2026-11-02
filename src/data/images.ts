import atapTenda from '../assets/atap_tenda.png';
import bolaSepak from '../assets/bola_sepak.png';
import bukuTulis from '../assets/buku_tulis.png';
import jamDinding from '../assets/jam_dinding.png';
import koin from '../assets/koin.png';
import lingkaran from '../assets/lingkaran.png';
import oval from '../assets/oval.png';
import papanTulis from '../assets/papan_tulis.png';
import penggarisSegitiga from '../assets/penggaris_segitiga.png';
import persegi from '../assets/persegi.png';
import persegiPanjang from '../assets/persegi_panjang.png';
import pintu from '../assets/pintu.png';
import pizzaSlice from '../assets/pizza_slice.png';
import rubik from '../assets/rubik.png';
import rumah from '../assets/rumah_sederhana.png';
import segitiga from '../assets/segitiga.png';
import setengahLingkaran from '../assets/setengah_lingkaran.png';

export interface ObjectImage {
  src: string;
  label: string; // label default saat dipakai sebagai pilihan jawaban
}

/**
 * Semua gambar benda untuk soal. Tambah aset baru cukup di sini,
 * lalu pakai kuncinya di data/pulau1.ts.
 */
export const OBJ = {
  tenda: { src: atapTenda, label: 'Tenda' },
  bola: { src: bolaSepak, label: 'Bola sepak' },
  buku: { src: bukuTulis, label: 'Buku' },
  jam: { src: jamDinding, label: 'Jam dinding' },
  koin: { src: koin, label: 'Koin' },
  lingkaran: { src: lingkaran, label: 'Lingkaran' },
  oval: { src: oval, label: 'Oval' },
  papanTulis: { src: papanTulis, label: 'Papan tulis' },
  penggaris: { src: penggarisSegitiga, label: 'Penggaris segitiga' },
  persegi: { src: persegi, label: 'Persegi' },
  persegiPanjang: { src: persegiPanjang, label: 'Persegi panjang' },
  pintu: { src: pintu, label: 'Pintu' },
  pizza: { src: pizzaSlice, label: 'Pizza' },
  rubik: { src: rubik, label: 'Rubik' },
  rumah: { src: rumah, label: 'Rumah' },
  segitiga: { src: segitiga, label: 'Segitiga' },
  setengahLingkaran: { src: setengahLingkaran, label: 'Setengah lingkaran' },
} as const satisfies Record<string, ObjectImage>;

export type ObjKey = keyof typeof OBJ;
