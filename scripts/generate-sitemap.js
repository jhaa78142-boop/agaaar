import fs from 'fs';

// Manually defining data for the standalone script to avoid ESM import issues with .ts files
const CITIES = [
  { id: "mumbai", name: "Mumbai" }, { id: "andheri", name: "Andheri" }, { id: "borivali", name: "Borivali" },
  { id: "malad", name: "Malad" }, { id: "kandivali", name: "Kandivali" }, { id: "goregaon", name: "Goregaon" },
  { id: "dadar", name: "Dadar" }, { id: "bandra", name: "Bandra" }, { id: "kurla", name: "Kurla" },
  { id: "chembur", name: "Chembur" }, { id: "ghatkopar", name: "Ghatkopar" }, { id: "mulund", name: "Mulund" },
  { id: "worli", name: "Worli" }, { id: "powai", name: "Powai" }, { id: "vikhroli", name: "Vikhroli" },
  { id: "thane", name: "Thane" }, { id: "kalyan", name: "Kalyan" }, { id: "dombivli", name: "Dombivli" },
  { id: "ulhasnagar", name: "Ulhasnagar" }, { id: "ambernath", name: "Ambernath" }, { id: "badlapur", name: "Badlapur" },
  { id: "bhiwandi", name: "Bhiwandi" }, { id: "mira-road", name: "Mira Road" }, { id: "vasai", name: "Vasai" },
  { id: "virar", name: "Virar" }, { id: "palghar", name: "Palghar" }, { id: "dahanu", name: "Dahanu" },
  { id: "navi-mumbai", name: "Navi Mumbai" }, { id: "panvel", name: "Panvel" }, { id: "vashi", name: "Vashi" },
  { id: "kharghar", name: "Kharghar" }, { id: "nerul", name: "Nerul" }, { id: "alibaug", name: "Alibaug" },
  { id: "pune", name: "Pune" }, { id: "nashik", name: "Nashik" }, { id: "aurangabad", name: "Aurangabad" },
  { id: "nagpur", name: "Nagpur" }, { id: "amravati", name: "Amravati" }, { id: "akola", name: "Akola" },
  { id: "kolhapur", name: "Kolhapur" }, { id: "solapur", name: "Solapur" }, { id: "satara", name: "Satara" },
  { id: "sangli", name: "Sangli" }, { id: "ahmednagar", name: "Ahmednagar" }, { id: "latur", name: "Latur" },
  { id: "nanded", name: "Nanded" }, { id: "osmanabad", name: "Osmanabad" }, { id: "jalgaon", name: "Jalgaon" },
  { id: "ratnagiri", name: "Ratnagiri" },
];

const KEYWORDS = [
  "agarbatti", "incense sticks", "agarbatti online", "buy agarbatti", "best agarbatti",
  "incense sticks online", "premium agarbatti", "natural incense sticks", "indian agarbatti",
  "fragrance agarbatti", "buy agarbatti online india", "best agarbatti brand in india",
  "premium incense sticks online", "long lasting agarbatti", "organic agarbatti buy online",
  "herbal incense sticks india", "sandalwood agarbatti online", "rose incense sticks buy",
  "jasmine agarbatti online", "cheap agarbatti bulk order", "best agarbatti for pooja at home",
  "which agarbatti is best for meditation", "long lasting incense sticks for home",
  "natural agarbatti without chemicals", "handmade agarbatti online india", "eco friendly incense sticks",
  "agarbatti for temple use", "incense sticks for relaxation and stress relief",
  "best fragrance agarbatti for daily use", "agarbatti for positive energy", "charcoal free agarbatti",
  "masala agarbatti india", "dhoop sticks online", "bamboo less incense sticks", "ayurvedic agarbatti",
  "luxury incense sticks india", "export quality agarbatti", "black agarbatti premium",
  "floral incense sticks", "meditation incense sticks", "agarbatti manufacturers in india",
  "agarbatti suppliers near me", "wholesale agarbatti india", "agarbatti distributors india",
  "incense sticks manufacturer maharashtra", "bulk incense sticks supplier", "agarbatti shop near me",
  "local agarbatti brand india", "best incense sticks in mumbai", "agarbatti wholesale market india",
];

const PRODUCTS = [
  { id: "rose-gold" }, { id: "black-oudh" }, { id: "camphor-jasmine" },
  { id: "chandan-natural" }, { id: "chafa-green" }
];

const BASE = 'https://whitestoneagarbatti.com';
const today = new Date().toISOString().split('T')[0];

const urls = [
  { loc: '/', priority: '1.0', freq: 'weekly' },
  { loc: '/products', priority: '0.9', freq: 'weekly' },
  { loc: '/about', priority: '0.7', freq: 'monthly' },
  { loc: '/wholesale', priority: '0.8', freq: 'monthly' },
  { loc: '/blog', priority: '0.8', freq: 'weekly' },
  { loc: '/contact', priority: '0.6', freq: 'monthly' },
  ...PRODUCTS.map(p => ({ loc: `/product/${p.id}`, priority: '0.9', freq: 'monthly' })),
  ...CITIES.map(c => ({ loc: `/city/${c.id}`, priority: '0.8', freq: 'monthly' })),
  ...CITIES.flatMap(c => KEYWORDS.map(kw => ({ 
    loc: `/city/${c.id}/${kw.toLowerCase().replace(/\s+/g, '-')}`, 
    priority: '0.6', 
    freq: 'monthly' 
  }))),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${BASE}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', xml);
console.log(`Comprehensive Sitemap generated: ${urls.length} URLs`);
