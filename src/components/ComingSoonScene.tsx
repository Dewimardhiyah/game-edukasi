interface ComingSoonSceneProps {
  title: string;
}

/** Penampung untuk tab yang belum dibuat (Prestasi, Materi, Profil). */
export default function ComingSoonScene({ title }: ComingSoonSceneProps) {
  return (
    <section className="coming-soon" aria-label={title}>
      <div className="coming-soon__card">
        <h1>{title}</h1>
        <p>Halaman ini sedang disiapkan. Lanjutkan petualanganmu di peta dulu ya!</p>
      </div>
    </section>
  );
}
