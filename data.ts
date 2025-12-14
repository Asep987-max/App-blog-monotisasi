import { Article } from './types';

export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'pemilu-2024-update-terkini',
    title: "Pemilu 2024: Update Terkini Perhitungan Suara Real Count",
    category: "Politik",
    author: "Budi Santoso",
    publishedAt: "2023-10-27T08:30:00Z",
    imageUrl: "https://picsum.photos/800/450?random=1",
    excerpt: "Komisi Pemilihan Umum (KPU) terus memperbarui data perhitungan suara dari seluruh TPS di Indonesia.",
    content: `
      <p class="mb-4">Jakarta - Komisi Pemilihan Umum (KPU) terus memperbarui data perhitungan suara dari seluruh TPS di Indonesia. Masyarakat dihimbau untuk tetap tenang menunggu hasil resmi.</p>
      <p class="mb-4">Hingga saat ini, persaingan antar paslon terlihat sangat ketat di beberapa provinsi kunci khususnya di Pulau Jawa. Tim pemenangan masing-masing kandidat mengklaim kemenangan berdasarkan quick count lembaga survei.</p>
      <p class="mb-4">Namun, Ketua KPU menegaskan bahwa hasil resmi adalah hasil rekapitulasi berjenjang yang dilakukan secara manual mulai dari tingkat kecamatan hingga nasional.</p>
      <h2 class="text-2xl font-serif font-bold mt-6 mb-4">Dinamika Politik Daerah</h2>
      <p class="mb-4">Di Jawa Barat, suara pemilih milenial menjadi penentu yang sangat signifikan. Berdasarkan data demografi, pemilih muda mendominasi hingga 54% dari total DPT.</p>
      <p class="mb-4">Para analis politik menyarankan agar para kandidat lebih memfokuskan kampanye mereka pada isu-isu ekonomi digital dan lapangan pekerjaan yang relevan bagi anak muda.</p>
      <p class="mb-4">Sementara itu di luar Jawa, isu pembangunan infrastruktur masih menjadi topik utama yang diperbincangkan warga.</p>
    `,
    views: 12500,
    isBreaking: true
  },
  {
    id: '2',
    slug: 'banjir-bandang-sumatera',
    title: "Banjir Bandang Terjang Tiga Kabupaten di Sumatera",
    category: "Eco",
    author: "Siti Aminah",
    publishedAt: "2023-10-26T14:15:00Z",
    imageUrl: "https://picsum.photos/800/450?random=2",
    excerpt: "Hujan deras yang mengguyur sejak semalam menyebabkan sungai meluap dan merendam ratusan rumah.",
    content: "<p>Bencana hidrometeorologi kembali terjadi. Ratusan warga terpaksa mengungsi ke dataran yang lebih tinggi.</p>",
    views: 8400,
    isBreaking: false
  },
  {
    id: '3',
    slug: 'timnas-indonesia-menang',
    title: "Timnas Indonesia Menang Dramatis Lawan Vietnam",
    category: "Sport",
    author: "Rizky Ramadhan",
    publishedAt: "2023-10-25T20:00:00Z",
    imageUrl: "https://picsum.photos/800/450?random=3",
    excerpt: "Gol tunggal di menit akhir memastikan kemenangan Skuad Garuda di kualifikasi Piala Dunia.",
    content: "<p>Stadion Gelora Bung Karno bergemuruh menyambut kemenangan ini.</p>",
    views: 45000,
    isBreaking: false
  },
  {
    id: '4',
    slug: 'kenaikan-harga-beras',
    title: "Harga Beras Melonjak, Pemerintah Gelar Operasi Pasar",
    category: "Ekonomi",
    author: "Dewi Lestari",
    publishedAt: "2023-10-24T09:00:00Z",
    imageUrl: "https://picsum.photos/800/450?random=4",
    excerpt: "Operasi pasar dilakukan serentak di 50 titik pasar tradisional untuk menstabilkan harga.",
    content: "<p>Masyarakat antusias menyambut beras murah yang disediakan Bulog.</p>",
    views: 6200,
    isBreaking: false
  },
  {
    id: '5',
    slug: 'teknologi-ai-terbaru',
    title: "Perkembangan AI: Ancaman atau Peluang bagi Pekerja Kreatif?",
    category: "Tekno",
    author: "Andi Wijaya",
    publishedAt: "2023-10-23T11:45:00Z",
    imageUrl: "https://picsum.photos/800/450?random=5",
    excerpt: "Diskusi panel membahas dampak kecerdasan buatan terhadap industri kreatif di masa depan.",
    content: "<p>Para ahli sepakat bahwa AI adalah alat bantu, bukan pengganti total manusia.</p>",
    views: 15300,
    isBreaking: false
  },
  {
    id: '6',
    slug: 'wisata-bali-pulih',
    title: "Kunjungan Wisatawan ke Bali Tembus Rekor Baru",
    category: "Lifestyle",
    author: "Made Bagus",
    publishedAt: "2023-10-22T16:20:00Z",
    imageUrl: "https://picsum.photos/800/450?random=6",
    excerpt: "Pasca pandemi, sektor pariwisata Pulau Dewata kembali menggeliat dengan kedatangan turis mancanegara.",
    content: "<p>Hotel dan restoran mulai penuh dipesan hingga akhir tahun.</p>",
    views: 9800,
    isBreaking: false
  },
   {
    id: '7',
    slug: 'investasi-hijau-indonesia',
    title: "Indonesia Targetkan Investasi Hijau Rp 500 Triliun",
    category: "Eco",
    author: "Fajar Nugraha",
    publishedAt: "2023-10-21T10:00:00Z",
    imageUrl: "https://picsum.photos/800/450?random=7",
    excerpt: "Pemerintah fokus pada pengembangan energi terbarukan seperti panel surya dan geotermal.",
    content: "<p>Investor asing mulai melirik potensi energi baru terbarukan di nusantara.</p>",
    views: 4100,
    isBreaking: false
  }
];

export const CATEGORIES = ["Politik", "Eco", "Sport", "Ekonomi", "Tekno", "Lifestyle"];