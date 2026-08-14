import { useState, useMemo } from "react"

const PINK = "#E8175D"

const categories = [
  { name: "Tous les Produits", count: 12 },
  { name: "Informatique", count: 3 },
  { name: "Électronique", count: 2 },
  { name: "Jeux Vidéo", count: 1 },
  { name: "Maison & Déco", count: 2 },
  { name: "Bureau", count: 1 },
  { name: "Mode & Accessoires", count: 1 },
  { name: "Alimentation", count: 1 },
  { name: "Sport & Loisirs", count: 1 },
]

const priceRanges = [
  { label: "Moins de 100 DT", value: "lt100", min: 0, max: 100 },
  { label: "100 – 500 DT", value: "100-500", min: 100, max: 500 },
  { label: "500 – 2 000 DT", value: "500-2000", min: 500, max: 2000 },
  { label: "Plus de 2 000 DT", value: "gt2000", min: 2000, max: Infinity },
]

type Product = {
  id: number
  name: string
  category: string
  description: string
  price: number
  priceLabel: string
  image: string
  aiScore: number
  isTopPick: boolean
  reason: { icon: string; label: string; color: string; bg: string }
  rating: number
  reviewCount: number
  supplier: string
  supplierInfo: string
  sku: string
  greenScore: 'A+' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
  specs: { label: string; value: string }[]
  reviews: { author: string; rating: number; comment: string; date: string }[]
}

const products: Product[] = [
  {
    id: 1,
    name: "Casque Sony WH-1000XM5",
    category: "Électronique",
    description:
      "Le casque à réduction de bruit le plus avancé du marché. Grâce à la puce QN1 et aux 8 microphones intégrés, il offre un silence quasi total pour vous concentrer où que vous soyez. La qualité audio est exceptionnelle avec le codec LDAC pour une transmission hi-res sans fil.",
    price: 1360,
    priceLabel: "1 360 DT",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&h=700&fit=crop&auto=format",
    aiScore: 98,
    isTopPick: true,
    reason: {
      icon: "🎯",
      label: "Correspond à votre rôle",
      color: "#0369a1",
      bg: "#f0f9ff",
    },
    rating: 4.8,
    reviewCount: 214,
    supplier: "TechDistrib Tunisie",
    supplierInfo:
      "Distributeur officiel Sony en Tunisie depuis 2012. Garantie constructeur incluse, SAV en 48h, livraison nationale.",
    sku: "SKU-240891",
    greenScore: "B",
    specs: [
      { label: "Réduction de bruit", value: "Oui — puce QN1" },
      { label: "Autonomie", value: "30 heures" },
      { label: "Connexion", value: "Bluetooth 5.2" },
      { label: "Codec", value: "LDAC, AAC, SBC" },
      { label: "Poids", value: "250 g" },
      { label: "Couleurs", value: "Noir, Blanc crème" },
      { label: "Microphones", value: "8 microphones intégrés" },
      { label: "Garantie", value: "24 mois" },
    ],
    reviews: [
      {
        author: "Mehdi B.",
        rating: 5,
        comment:
          "Qualité audio exceptionnelle, réduction de bruit bluffante pour les open-space.",
        date: "Il y a 2 semaines",
      },
      {
        author: "Sara K.",
        rating: 5,
        comment:
          "Confort parfait toute la journée. Mon meilleur achat de l'année.",
        date: "Il y a 1 mois",
      },
      {
        author: "Yassine T.",
        rating: 4,
        comment:
          "Excellent produit, juste un peu cher mais la qualité le justifie.",
        date: "Il y a 2 mois",
      },
    ],
  },
  {
    id: 2,
    name: "MacBook Pro M3",
    category: "Informatique",
    description:
      "Propulsé par la puce M3 d'Apple, ce MacBook Pro redéfinit la performance mobile. 18 heures d'autonomie, écran Liquid Retina XDR, et des performances qui dépassent la plupart des stations de travail desktop. Idéal pour le développement, le design et la créativité.",
    price: 6900,
    priceLabel: "6 900 DT",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&h=700&fit=crop&auto=format",
    aiScore: 95,
    isTopPick: true,
    reason: {
      icon: "🎯",
      label: "Correspond à votre rôle",
      color: "#0369a1",
      bg: "#f0f9ff",
    },
    rating: 4.9,
    reviewCount: 87,
    supplier: "Apple Premium Reseller",
    supplierInfo:
      "Revendeur agréé Apple en Tunisie. Produits 100% authentiques avec garantie Apple internationale, AppleCare disponible.",
    sku: "SKU-192043",
    greenScore: "C",
    specs: [
      { label: "Puce", value: "Apple M3 Pro" },
      { label: "RAM", value: "18 Go unifiée" },
      { label: "Stockage", value: "SSD 512 Go NVMe" },
      { label: "Écran", value: '14" Liquid Retina XDR' },
      { label: "Résolution", value: "3024 × 1964 px" },
      { label: "Autonomie", value: "18 heures" },
      { label: "Ports", value: "3× Thunderbolt 4, HDMI, SD" },
      { label: "Garantie", value: "12 mois constructeur" },
    ],
    reviews: [
      {
        author: "Amine R.",
        rating: 5,
        comment:
          "Performances incroyables pour le dev. Jamais vu un laptop aussi rapide.",
        date: "Il y a 3 semaines",
      },
      {
        author: "Leila M.",
        rating: 5,
        comment:
          "L'écran XDR est magnifique, parfait pour le design graphique.",
        date: "Il y a 1 mois",
      },
    ],
  },
  {
    id: 3,
    name: "Chaise Ergonomique Herman",
    category: "Bureau",
    description:
      "Conçue pour les longues journées de travail, cette chaise ergonomique s'adapte à votre morphologie. Assise en maille respirante 8Z Pellicle, soutien lombaire dynamique PostureFit SL et accoudoirs 4D entièrement réglables. Certifiée pour 8h de confort quotidien.",
    price: 3480,
    priceLabel: "3 480 DT",
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=900&h=700&fit=crop&auto=format",
    aiScore: 91,
    isTopPick: true,
    reason: {
      icon: "🔁",
      label: "Déjà commandé 3 fois par votre équipe",
      color: "#047857",
      bg: "#ecfdf5",
    },
    rating: 4.6,
    reviewCount: 52,
    supplier: "Office Solutions Pro",
    supplierInfo:
      "Spécialiste du mobilier de bureau haut de gamme depuis 2008. Livraison et montage inclus, garantie pièces 12 ans.",
    sku: "SKU-083712",
    greenScore: "A",
    specs: [
      { label: "Assise", value: "Maille 8Z Pellicle" },
      { label: "Soutien lombaire", value: "PostureFit SL dynamique" },
      { label: "Accoudoirs", value: "4D entièrement réglables" },
      { label: "Charge max", value: "136 kg" },
      { label: "Hauteur assise", value: "38 – 50 cm" },
      { label: "Certification", value: "BIFMA, Greenguard" },
      { label: "Garantie", value: "12 ans toutes pièces" },
    ],
    reviews: [
      {
        author: "Karim B.",
        rating: 5,
        comment:
          "Investissement qui vaut chaque dinar. Dos en parfaite santé après 6 mois.",
        date: "Il y a 1 mois",
      },
      {
        author: "Nadia S.",
        rating: 4,
        comment:
          "Très confortable, montage un peu complexe mais le résultat est top.",
        date: "Il y a 2 mois",
      },
    ],
  },
  {
    id: 4,
    name: "Robot Aspirateur Xiaomi",
    category: "Maison & Déco",
    description:
      "Navigation laser LiDAR de précision, cartographie multi-pièces intelligente, vidage automatique de la corbeille. Contrôlable depuis l'application Mi Home. Puissance d'aspiration de 4000 Pa pour une propreté parfaite.",
    price: 1285,
    priceLabel: "1 285 DT",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=440&fit=crop&auto=format",
    aiScore: 0,
    isTopPick: false,
    reason: {
      icon: "👥",
      label: "Populaire dans votre entreprise",
      color: "#c2410c",
      bg: "#fff7ed",
    },
    rating: 4.3,
    reviewCount: 128,
    supplier: "SmartHome Tunisie",
    supplierInfo:
      "Importateur agréé Xiaomi en Tunisie. Stock permanent, livraison 24-48h, SAV certifié.",
    sku: "SKU-310055",
    greenScore: "A+",
    specs: [
      { label: "Navigation", value: "LiDAR laser" },
      { label: "Aspiration", value: "4000 Pa" },
      { label: "Autonomie", value: "150 min" },
      { label: "Surface max", value: "250 m²" },
      { label: "Niveau sonore", value: "67 dB" },
      { label: "Application", value: "Mi Home (iOS/Android)" },
    ],
    reviews: [
      {
        author: "Hana F.",
        rating: 5,
        comment: "Impressionnant. Il cartographie l'appartement en 10 minutes.",
        date: "Il y a 3 semaines",
      },
      {
        author: "Sami L.",
        rating: 4,
        comment: "Très efficace, juste un peu bruyant en mode turbo.",
        date: "Il y a 1 mois",
      },
    ],
  },
  {
    id: 5,
    name: "Machine à Café Nespresso",
    category: "Maison & Déco",
    description:
      "Design compact et élégant, extraction en 25 secondes, compatible avec toutes les capsules Nespresso. Pression 19 bars pour un espresso parfait. Le compagnon idéal des pauses café en entreprise.",
    price: 632,
    priceLabel: "632,5 DT",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=440&fit=crop&auto=format",
    aiScore: 0,
    isTopPick: false,
    reason: {
      icon: "⭐",
      label: "Vous lui avez donné 5★ lors d'un précédent achat",
      color: "#92400e",
      bg: "#fffbeb",
    },
    rating: 4.7,
    reviewCount: 341,
    supplier: "Nespresso Officiel",
    supplierInfo:
      "Boutique officielle Nespresso Tunisie. Programme de recyclage des capsules, abonnement café disponible.",
    sku: "SKU-447821",
    greenScore: "B",
    specs: [
      { label: "Pression", value: "19 bars" },
      { label: "Réservoir", value: "1,7 L" },
      { label: "Préchauffage", value: "25 secondes" },
      { label: "Capsules", value: "Nespresso Original" },
      { label: "Puissance", value: "1700 W" },
      { label: "Dimensions", value: "12 × 32 × 22 cm" },
    ],
    reviews: [
      {
        author: "Rim A.",
        rating: 5,
        comment: "Café parfait à chaque fois. Indispensable au bureau.",
        date: "Il y a 2 semaines",
      },
      {
        author: "Omar K.",
        rating: 5,
        comment: "Simple, rapide et délicieux. On ne peut plus s'en passer.",
        date: "Il y a 1 mois",
      },
    ],
  },
  {
    id: 6,
    name: "PlayStation 5 Slim",
    category: "Jeux Vidéo",
    description:
      "La console nouvelle génération en format compact. Ray-tracing temps réel, SSD ultra-rapide et 1 To de stockage. Expérience de jeu immersive avec la manette DualSense et ses retours haptiques.",
    price: 2530,
    priceLabel: "2 530 DT",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&h=440&fit=crop&auto=format",
    aiScore: 0,
    isTopPick: false,
    reason: {
      icon: "🏢",
      label: "Acheté par 8 collègues de l'entreprise",
      color: "#1d4ed8",
      bg: "#eff6ff",
    },
    rating: 4.5,
    reviewCount: 96,
    supplier: "Gaming Zone TN",
    supplierInfo:
      "Revendeur spécialisé gaming depuis 2015. Import officiel Sony, garantie constructeur, accessoires disponibles.",
    sku: "SKU-290134",
    greenScore: "D",
    specs: [
      { label: "CPU", value: "AMD Zen 2, 8 cœurs" },
      { label: "GPU", value: "AMD RDNA 2, 10.28 TF" },
      { label: "Stockage", value: "SSD NVMe 1 To" },
      { label: "Résolution", value: "Jusqu'à 8K" },
      { label: "FPS", value: "Jusqu'à 120 FPS" },
      { label: "Manette", value: "DualSense incluse" },
    ],
    reviews: [
      {
        author: "Tarek M.",
        rating: 5,
        comment:
          "Graphismes époustouflants, les retours haptiques changent tout.",
        date: "Il y a 2 semaines",
      },
      {
        author: "Yasmine B.",
        rating: 4,
        comment:
          "Super console, bibliothèque de jeux encore limitée mais ça vient.",
        date: "Il y a 3 semaines",
      },
    ],
  },
  {
    id: 7,
    name: "iPhone 15 Pro",
    category: "Informatique",
    description:
      "Boîtier en titane aéronautique ultra-résistant, puce A17 Pro gravée en 3 nm, et système photo révolutionnaire avec zoom optique 5x et mode cinématique 4K 60fps.",
    price: 4990,
    priceLabel: "4 990 DT",
    image:
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=440&fit=crop&auto=format",
    aiScore: 0,
    isTopPick: false,
    reason: {
      icon: "💰",
      label: "Dans votre budget restant",
      color: "#15803d",
      bg: "#f0fdf4",
    },
    rating: 4.8,
    reviewCount: 512,
    supplier: "Apple Premium Reseller",
    supplierInfo:
      "Revendeur agréé Apple en Tunisie. Produits 100% authentiques, garantie Apple internationale.",
    sku: "SKU-551289",
    greenScore: "C",
    specs: [
      { label: "Puce", value: "A17 Pro (3 nm)" },
      { label: "Écran", value: '6,1" Super Retina XDR' },
      { label: "Appareil photo", value: "48 MP ProRAW + 12 MP" },
      { label: "Zoom", value: "Optique 5x" },
      { label: "Stockage", value: "256 Go" },
      { label: "Port", value: "USB-C 3.0" },
    ],
    reviews: [
      {
        author: "Fatma Z.",
        rating: 5,
        comment:
          "Photos bluffantes, design premium. Le meilleur iPhone à ce jour.",
        date: "Il y a 1 semaine",
      },
      {
        author: "Bilel R.",
        rating: 5,
        comment:
          "Performance imbattable, batterie améliorée par rapport au 14 Pro.",
        date: "Il y a 1 mois",
      },
    ],
  },
  {
    id: 8,
    name: "Apple Watch Ultra 2",
    category: "Mode & Accessoires",
    description:
      "La montre connectée la plus robuste et la plus précise d'Apple. GPS double fréquence pour randonnée et navigation précise, résistance 100 m, boîtier titane et 60h d'autonomie en mode basse consommation.",
    price: 3800,
    priceLabel: "3 800 DT",
    image:
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&h=440&fit=crop&auto=format",
    aiScore: 0,
    isTopPick: false,
    reason: {
      icon: "✨",
      label: "Nouveau dans cette catégorie",
      color: "#7c3aed",
      bg: "#f5f3ff",
    },
    rating: 4.6,
    reviewCount: 73,
    supplier: "Apple Premium Reseller",
    supplierInfo:
      "Revendeur agréé Apple en Tunisie. Produits 100% authentiques, garantie Apple internationale.",
    sku: "SKU-672341",
    greenScore: "B",
    specs: [
      { label: "Boîtier", value: "Titane 49 mm" },
      { label: "Résistance eau", value: "100 m (WR100)" },
      { label: "GPS", value: "Double fréquence L1+L5" },
      { label: "Autonomie", value: "36h normal / 60h basse conso" },
      { label: "Puce", value: "S9 SiP 64 bits" },
      { label: "Bracelet", value: "Alpine Loop inclus" },
    ],
    reviews: [
      {
        author: "Nour H.",
        rating: 5,
        comment:
          "Pour les sportifs, c'est la référence absolue. GPS ultra-précis.",
        date: "Il y a 3 semaines",
      },
      {
        author: "Wael S.",
        rating: 4,
        comment: "Excellent produit, juste le prix qui pique un peu.",
        date: "Il y a 2 mois",
      },
    ],
  },
  {
    id: 9,
    name: 'Dell UltraSharp 27"',
    category: "Informatique",
    description:
      "Écran 4K IPS avec couverture 99% sRGB, idéal pour le design, la photo et la productivité professionnelle. Port USB-C 90W pour charger votre laptop simultanément. Réglable en hauteur, pivot et rotation.",
    price: 2100,
    priceLabel: "2 100 DT",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=440&fit=crop&auto=format",
    aiScore: 0,
    isTopPick: false,
    reason: {
      icon: "🆕",
      label: "Ajouté récemment par ce fournisseur",
      color: "#0f766e",
      bg: "#f0fdfa",
    },
    rating: 4.4,
    reviewCount: 167,
    supplier: "TechDistrib Tunisie",
    supplierInfo:
      "Distributeur officiel Dell en Tunisie. Garantie on-site 3 ans, remplacement écran garanti.",
    sku: "SKU-489023",
    greenScore: "F",
    specs: [
      { label: "Résolution", value: "4K UHD (3840×2160)" },
      { label: "Dalle", value: "IPS, 60 Hz" },
      { label: "Couleurs", value: "99% sRGB, 95% DCI-P3" },
      { label: "HDR", value: "HDR400" },
      { label: "Ports", value: "USB-C 90W, 2× HDMI, DP" },
      { label: "Ergonomie", value: "Pivot, hauteur, rotation" },
    ],
    reviews: [
      {
        author: "Ines B.",
        rating: 5,
        comment: "Couleurs fidèles, parfait pour le design graphique.",
        date: "Il y a 1 mois",
      },
      {
        author: "Mounir A.",
        rating: 4,
        comment:
          "Très bonne qualité, le USB-C qui charge le laptop est un vrai plus.",
        date: "Il y a 6 semaines",
      },
    ],
  },
]

const sortOptions = [
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "newest", label: "Nouveautés" },
]

// ── Green Score Badge ─────────────────────────────────────────────────────────
const GRADE_CONFIG = [
  { grade: 'A+', color: '#1a7f3c', width: 26 },
  { grade: 'A',  color: '#2da44e', width: 38 },
  { grade: 'B',  color: '#6cc04a', width: 52 },
  { grade: 'C',  color: '#c9b800', width: 64 },
  { grade: 'D',  color: '#e07c00', width: 76 },
  { grade: 'E',  color: '#d44f00', width: 88 },
  { grade: 'F',  color: '#b80000', width: 100 },
] as const

type Grade = typeof GRADE_CONFIG[number]['grade']

function GreenScoreBadge({ score }: { score: Grade }) {
  const active = GRADE_CONFIG.find(g => g.grade === score)!

  return (
    <div style={{
      background: '#fff',
      borderRadius: 14,
      border: '1px solid #e8e6e0',
      padding: '14px 16px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill={active.color} stroke="none">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 1.5-10.5 3.5S11 12.5 11 12.5c0-4 3-5.5 6-5.5"/>
          </svg>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#777', letterSpacing: '0.09em', textTransform: 'uppercase' }}>
            Éco-score environnemental
          </span>
        </div>
        {/* Grade square badge */}
        <div style={{
          width: 30,
          height: 30,
          borderRadius: 7,
          background: active.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 2px 8px ${active.color}44`,
        }}>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 12, letterSpacing: '-0.01em', lineHeight: 1 }}>
            {score}
          </span>
        </div>
      </div>

      {/* Bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {GRADE_CONFIG.map(g => {
          const isActive = g.grade === score
          return (
            <div key={g.grade} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{
                width: 18,
                fontSize: 10,
                fontWeight: 800,
                color: isActive ? g.color : '#bbb',
                textAlign: 'right',
                flexShrink: 0,
                lineHeight: 1,
              }}>
                {g.grade}
              </span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <div style={{
                  height: isActive ? 18 : 11,
                  width: `${g.width}%`,
                  background: isActive ? g.color : `${g.color}40`,
                  borderRadius: 4,
                  outline: isActive ? `1.5px solid ${g.color}` : 'none',
                  outlineOffset: 2,
                  transition: 'height 0.2s',
                }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ratingRemark(r: number) {
  if (r >= 4.8) return "Exceptionnel"
  if (r >= 4.5) return "Très apprécié"
  if (r >= 4.0) return "Bien noté"
  return "Satisfaisant"
}

function StarRating({ value, size = 14 }: { value: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const full = i <= Math.floor(value)
        const half = !full && i - 0.5 <= value
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`h${i}`}>
                <stop offset="50%" stopColor={PINK} />
                <stop offset="50%" stopColor="#e0deda" />
              </linearGradient>
            </defs>
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill={full ? PINK : half ? `url(#h${i})` : "#e0deda"}
            />
          </svg>
        )
      })}
    </span>
  )
}

function HeartIcon({ filled, size = 16 }: { filled: boolean; size?: number }) {
  return filled ? (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={PINK}
      stroke={PINK}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ) : (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

// ── Product Detail Page ───────────────────────────────────────────────────────
function ProductDetail({
  product,
  favorites,
  cartItems,
  isConnected,
  onBack,
  onToggleFav,
  onToggleCart,
  onSelect,
}: {
  product: Product
  favorites: Set<number>
  cartItems: Set<number>
  isConnected: boolean
  onBack: () => void
  onToggleFav: (id: number) => void
  onToggleCart: (id: number) => void
  onSelect: (p: Product) => void
}) {
  const [activeTab, setActiveTab] =
    useState<"description" | "specs" | "reviews">("description")
  const [activeThumb, setActiveThumb] = useState(0)
  const [hoverStar, setHoverStar] = useState(0)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewComment, setReviewComment] = useState("")
  const [localReviews, setLocalReviews] = useState(product.reviews)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmitReview = () => {
    if (!reviewRating) return
    setLocalReviews(prev => [
      {
        author: "Vous",
        rating: reviewRating,
        comment: reviewComment.trim(),
        date: "À l'instant",
      },
      ...prev,
    ])
    setReviewRating(0)
    setReviewComment("")
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }
  const isFav = favorites.has(product.id)
  const inCart = cartItems.has(product.id)

  const thumbVariants = [
    product.image,
    product.image.replace("w=900&h=700", "w=900&h=700&sat=-30"),
    product.image.replace("fit=crop", "fit=crop&flip=h"),
    product.image.replace("w=900&h=700", "w=900&h=700&blur=2"),
  ]

  const related = products
    .filter(
      (p) =>
        p.id !== product.id && (p.category === product.category || p.isTopPick),
    )
    .slice(0, 4)

  const tabs = [
    { key: "description", label: "Description" },
    { key: "specs", label: "Caractéristiques" },
    { key: "reviews", label: `Avis (${product.reviewCount})` },
  ] as const

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f4f0",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "22px 32px 0",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            color: "#888",
            padding: 0,
            fontWeight: 400,
          }}
        >
          Mon Catalogue
        </button>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ccc"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span style={{ fontSize: 13, color: "#888" }}>{product.category}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ccc"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span style={{ fontSize: 13, color: "#444", fontWeight: 500 }}>
          {product.name}
        </span>
      </div>

      {/* ── Main product block ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px 32px 0",
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: 32,
        }}
      >
        {/* Left — image + thumbs */}
        <div>
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              backgroundColor: "#eae8e3",
              aspectRatio: "4/3",
              position: "relative",
            }}
          >
            <img
              src={thumbVariants[activeThumb]}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <button
              onClick={() => onToggleFav(product.id)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: 38,
                height: 38,
                borderRadius: "50%",
                backgroundColor: "#fff",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
                color: isFav ? PINK : "#ccc",
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <HeartIcon filled={isFav} size={18} />
            </button>
          </div>
          {/* Thumbnails */}
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            {thumbVariants.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 10,
                  overflow: "hidden",
                  border: `2px solid ${
                    activeThumb === i ? PINK : "transparent"
                  }`,
                  cursor: "pointer",
                  padding: 0,
                  backgroundColor: "#eae8e3",
                  transition: "border-color 0.15s",
                  flexShrink: 0,
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right — product info */}
        <div
          style={{ display: "flex", flexDirection: "column", paddingTop: 4 }}
        >
          {/* Category + AI badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.13em",
                color: PINK,
                textTransform: "uppercase",
              }}
            >
              {product.category}
            </span>
            {product.isTopPick && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: PINK,
                  backgroundColor: "#fff0f5",
                  border: `1px solid ${PINK}22`,
                  borderRadius: 20,
                  padding: "2px 9px",
                  letterSpacing: "0.04em",
                }}
              >
                ✦ Recommandé IA
              </span>
            )}
          </div>

          <h1
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: "#111",
              letterSpacing: "-0.6px",
              lineHeight: 1.2,
              margin: "0 0 6px",
            }}
          >
            {product.name}
          </h1>

          {/* Supplier name */}
          <p style={{ fontSize: 12, color: "#aaa", margin: "0 0 12px", fontWeight: 500 }}>
            {product.supplier}
          </p>

          {/* Rating row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 6,
            }}
          >
            <StarRating value={product.rating} size={16} />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>
              {product.rating.toFixed(1)}
            </span>
            <span style={{ fontSize: 13, color: "#aaa" }}>
              ({product.reviewCount} avis)
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: PINK,
                backgroundColor: "#fff0f5",
                padding: "2px 9px",
                borderRadius: 20,
              }}
            >
              {ratingRemark(product.rating)}
            </span>
          </div>

          {/* SKU */}
          <p
            style={{
              fontSize: 12,
              color: "#bbb",
              margin: "0 0 20px",
              fontWeight: 500,
              letterSpacing: "0.04em",
            }}
          >
            {product.sku}
          </p>

          {/* Green Score */}
          <div style={{ marginBottom: 20 }}>
            <GreenScoreBadge score={product.greenScore} />
          </div>

          {/* Divider */}
          <div
            style={{ height: 1, backgroundColor: "#ebe9e4", marginBottom: 20 }}
          />

          {/* Price */}
          <div style={{ marginBottom: 24 }}>
            <span
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "#111",
                letterSpacing: "-0.8px",
              }}
            >
              {product.priceLabel}
            </span>
            <span
              style={{
                fontSize: 14,
                color: "#aaa",
                marginLeft: 8,
                fontWeight: 400,
              }}
            >
            </span>
          </div>

          {/* Add to cart */}
          <button
            onClick={() => onToggleCart(product.id)}
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 11,
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 700,
              backgroundColor: inCart ? "#16a34a" : PINK,
              color: "#fff",
              transition: "background 0.2s, transform 0.1s",
              letterSpacing: "0.02em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.98)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {inCart ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Ajouté au panier
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Ajouter au panier
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ maxWidth: 1200, margin: "36px auto 0", padding: "0 32px" }}>
        {/* Tab buttons — 3 separate blocks */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
            marginBottom: 0,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "13px 0",
                border: "none",
                borderRadius: "10px 10px 0 0",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: activeTab === tab.key ? 700 : 500,
                backgroundColor: activeTab === tab.key ? "#fff" : "#eae8e3",
                color: activeTab === tab.key ? PINK : "#888",
                transition: "all 0.15s",
                borderBottom:
                  activeTab === tab.key
                    ? `2px solid ${PINK}`
                    : "2px solid transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "0 0 14px 14px",
            padding: "28px 32px",
            marginBottom: 48,
          }}
        >
          {activeTab === "description" && (
            <p
              style={{
                fontSize: 14,
                color: "#555",
                lineHeight: 1.75,
                margin: 0,
                maxWidth: 700,
              }}
            >
              {product.description}
            </p>
          )}

          {activeTab === "specs" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                maxWidth: 600,
              }}
            >
              {product.specs.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 0",
                    borderBottom:
                      i < product.specs.length - 1
                        ? "1px solid #f0eeea"
                        : "none",
                  }}
                >
                  <span style={{ fontSize: 13, color: PINK, fontWeight: 600 }}>
                    {s.label}
                  </span>
                  <span
                    style={{ fontSize: 13, color: "#333", fontWeight: 500 }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              {/* Summary */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  marginBottom: 28,
                  paddingBottom: 24,
                  borderBottom: "1px solid #f0eeea",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: 48,
                      fontWeight: 800,
                      color: "#111",
                      margin: 0,
                      letterSpacing: "-2px",
                      lineHeight: 1,
                    }}
                  >
                    {product.rating.toFixed(1)}
                  </p>
                  <StarRating value={product.rating} size={18} />
                  <p style={{ fontSize: 12, color: "#aaa", margin: "6px 0 0" }}>
                    {product.reviewCount} avis
                  </p>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct =
                      star === 5
                        ? 72
                        : star === 4
                          ? 18
                          : star === 3
                            ? 6
                            : star === 2
                              ? 3
                              : 1
                    return (
                      <div
                        key={star}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            color: "#888",
                            width: 12,
                            textAlign: "right",
                          }}
                        >
                          {star}
                        </span>
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill={PINK}
                          stroke="none"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <div
                          style={{
                            flex: 1,
                            height: 5,
                            backgroundColor: "#f0eeea",
                            borderRadius: 99,
                          }}
                        >
                          <div
                            style={{
                              width: `${pct}%`,
                              height: "100%",
                              backgroundColor: PINK,
                              borderRadius: 99,
                            }}
                          />
                        </div>
                        <span
                          style={{ fontSize: 11, color: "#bbb", width: 28 }}
                        >
                          {pct}%
                        </span>
                      </div>
                    )
                  })}
                </div>
                <div
                  style={{
                    backgroundColor: "#fff0f5",
                    borderRadius: 12,
                    padding: "14px 20px",
                    textAlign: "center",
                    flexShrink: 0,
                  }}
                >
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: PINK,
                      margin: 0,
                    }}
                  >
                    {ratingRemark(product.rating)}
                  </p>
                  <p style={{ fontSize: 11, color: "#aaa", margin: "4px 0 0" }}>
                    Note globale
                  </p>
                </div>
              </div>
              {/* Add review form */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: 0 }}>
                    Laisser un avis
                  </p>
                  {!isConnected && (
                    <span style={{ fontSize: 11, color: "#aaa" }}>Connexion requise</span>
                  )}
                </div>

                <div style={{
                  backgroundColor: "#fafaf8",
                  borderRadius: 12,
                  padding: "18px 20px",
                  border: `1px solid ${isConnected ? "#ebe9e4" : "#f0eeea"}`,
                  opacity: isConnected ? 1 : 0.55,
                }}>
                  {/* Star picker */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                    <span style={{ fontSize: 12, color: "#888", marginRight: 4 }}>Note</span>
                    {[1, 2, 3, 4, 5].map(s => (
                      <button
                        key={s}
                        disabled={!isConnected}
                        onMouseEnter={() => isConnected && setHoverStar(s)}
                        onMouseLeave={() => isConnected && setHoverStar(0)}
                        onClick={() => isConnected && setReviewRating(s)}
                        style={{ background: "none", border: "none", padding: 2, cursor: isConnected ? "pointer" : "not-allowed", transition: "transform 0.1s", transform: (hoverStar >= s || reviewRating >= s) ? "scale(1.2)" : "scale(1)" }}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24">
                          <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                            fill={(hoverStar >= s || reviewRating >= s) ? PINK : "#e0deda"}
                            stroke="none"
                          />
                        </svg>
                      </button>
                    ))}
                    {reviewRating > 0 && (
                      <span style={{ fontSize: 12, fontWeight: 600, color: PINK, marginLeft: 4 }}>
                        {["", "Mauvais", "Passable", "Bien", "Très bien", "Excellent"][reviewRating]}
                      </span>
                    )}
                  </div>

                  {/* Comment */}
                  <textarea
                    disabled={!isConnected}
                    value={reviewComment}
                    onChange={e => setReviewComment(e.target.value)}
                    placeholder="Commentaire optionnel…"
                    rows={3}
                    style={{
                      width: "100%",
                      border: "1px solid #e0deda",
                      borderRadius: 8,
                      padding: "10px 12px",
                      fontSize: 13,
                      color: "#333",
                      backgroundColor: "#fff",
                      resize: "none",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "'Inter', sans-serif",
                      cursor: isConnected ? "text" : "not-allowed",
                      transition: "border-color 0.15s",
                    }}
                    onFocus={e => isConnected && (e.target.style.borderColor = PINK)}
                    onBlur={e => (e.target.style.borderColor = "#e0deda")}
                  />

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
                    {submitted ? (
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#16a34a" }}>✓ Avis publié</span>
                    ) : (
                      <span style={{ fontSize: 11, color: "#bbb" }}>
                        {isConnected ? (reviewRating === 0 ? "Sélectionnez une note" : "") : "Connectez-vous pour publier un avis"}
                      </span>
                    )}
                    <button
                      disabled={!isConnected || reviewRating === 0}
                      onClick={handleSubmitReview}
                      style={{
                        padding: "8px 20px",
                        borderRadius: 8,
                        border: "none",
                        cursor: isConnected && reviewRating > 0 ? "pointer" : "not-allowed",
                        fontSize: 12,
                        fontWeight: 700,
                        backgroundColor: isConnected && reviewRating > 0 ? PINK : "#e0deda",
                        color: isConnected && reviewRating > 0 ? "#fff" : "#aaa",
                        transition: "all 0.15s",
                      }}
                    >
                      Publier
                    </button>
                  </div>
                </div>
              </div>

              {/* Review list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {localReviews.map((r, i) => (
                  <div key={i} style={{ padding: "14px 16px", backgroundColor: "#fafaf8", borderRadius: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: r.comment ? 8 : 0 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", backgroundColor: r.author === "Vous" ? PINK : "#e8e6e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: r.author === "Vous" ? "#fff" : "#666", flexShrink: 0 }}>
                        {r.author.charAt(0)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: 0 }}>{r.author}</p>
                          {r.author === "Vous" && (
                            <span style={{ fontSize: 10, fontWeight: 600, color: PINK, backgroundColor: "#fff0f5", padding: "1px 7px", borderRadius: 20 }}>Votre avis</span>
                          )}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                          <StarRating value={r.rating} size={12} />
                          <span style={{ fontSize: 11, color: "#ccc" }}>{r.date}</span>
                        </div>
                      </div>
                    </div>
                    {r.comment && (
                      <p style={{ fontSize: 13, color: "#555", margin: 0, lineHeight: 1.6, paddingLeft: 40 }}>{r.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Related products ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px 60px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: PINK,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            ✦ Vous aimerez aussi
          </span>
          <div style={{ flex: 1, height: 1, backgroundColor: "#e8e6e0" }} />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
          }}
        >
          {related.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelect(p)}
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #ececec",
                cursor: "pointer",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.boxShadow = "0 6px 24px rgba(0,0,0,0.08)"
                el.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.boxShadow = "none"
                el.style.transform = "translateY(0)"
              }}
            >
              <div
                style={{
                  height: 150,
                  overflow: "hidden",
                  backgroundColor: "#f0eeea",
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "12px 14px 14px" }}>
                <p
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: PINK,
                    textTransform: "uppercase",
                    margin: "0 0 4px",
                  }}
                >
                  {p.category}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#111",
                    margin: "0 0 8px",
                    lineHeight: 1.3,
                  }}
                >
                  {p.name}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{ fontSize: 14, fontWeight: 800, color: "#111" }}
                  >
                    {p.priceLabel}
                  </span>
                  <StarRating value={p.rating} size={11} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Catalog Page ──────────────────────────────────────────────────────────────
export default function App() {
  const [activeCategory, setActiveCategory] = useState("Tous les Produits")
  const [activePrices, setActivePrices] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("ia")
  const [sortOpen, setSortOpen] = useState(false)
  const [cartItems, setCartItems] = useState<Set<number>>(new Set())
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [lang, setLang] = useState("FR")
  const [isConnected, setIsConnected] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const togglePrice = (val: string) =>
    setActivePrices((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    )
  const toggleCart = (id: number) =>
    setCartItems((prev) => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  const toggleFav = (id: number) =>
    setFavorites((prev) => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })

  const filtered = useMemo(() => {
    let list = [...products]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      )
    }
    if (activeCategory !== "Tous les Produits")
      list = list.filter((p) => p.category === activeCategory)
    if (activePrices.length > 0)
      list = list.filter((p) =>
        activePrices.some((v) => {
          const r = priceRanges.find((r) => r.value === v)!
          return p.price >= r.min && p.price < r.max
        }),
      )
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price)
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price)
    else list.sort((a, b) => b.aiScore - a.aiScore)
    return list
  }, [search, activeCategory, activePrices, sort])

  const topPicks = filtered.filter((p) => p.isTopPick)
  const others = filtered.filter((p) => !p.isTopPick)
  const hasFilters =
    activeCategory !== "Tous les Produits" ||
    activePrices.length > 0 ||
    search.trim()
  const favCount = favorites.size

  const FavBtn = ({ product }: { product: Product }) => {
    const isFav = favorites.has(product.id)
    return (
      <button
        onClick={(e) => {
          e.stopPropagation()
          toggleFav(product.id)
        }}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: "#fff",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          color: isFav ? PINK : "#bbb",
          transition: "transform 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <HeartIcon filled={isFav} size={15} />
      </button>
    )
  }

  // ── Detail page view ──
  if (selectedProduct) {
    return (
      <>
        {/* Header stays */}
        <header
          style={{
            backgroundColor: "#0f0f0f",
            position: "sticky",
            top: 0,
            zIndex: 50,
            borderBottom: "1px solid #1c1c1c",
          }}
        >
          <div
            style={{
              maxWidth: 1360,
              margin: "0 auto",
              padding: "0 32px",
              height: 58,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: PINK,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#fff", fontWeight: 800, fontSize: 11 }}>
                  AG
                </span>
              </div>
              <span
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: "-0.3px",
                }}
              >
                Amana<span style={{ color: PINK }}>Go</span>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  display: "flex",
                  gap: 1,
                  backgroundColor: "#1c1c1c",
                  borderRadius: 7,
                  padding: 3,
                }}
              >
                {["FR", "EN", "AR"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{
                      padding: "3px 10px",
                      borderRadius: 5,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                      border: "none",
                      backgroundColor: lang === l ? "#fff" : "transparent",
                      color: lang === l ? "#111" : "rgba(255,255,255,0.35)",
                      transition: "all 0.15s",
                    }}
                  >
                    {l}
                  </button>
                ))}
              </div>
              {favCount > 0 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    border: `1.5px solid ${PINK}55`,
                    borderRadius: 20,
                    padding: "4px 12px",
                  }}
                >
                  <HeartIcon filled size={13} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: PINK }}>
                    {favCount} favori{favCount > 1 ? "s" : ""}
                  </span>
                </div>
              )}
              <button
                style={{
                  position: "relative",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.65)",
                  padding: 4,
                }}
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {cartItems.size > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: -2,
                      right: -4,
                      width: 15,
                      height: 15,
                      backgroundColor: PINK,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 8,
                      fontWeight: 800,
                      color: "#fff",
                    }}
                  >
                    {cartItems.size}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsConnected(v => !v)}
                style={{
                  padding: "6px 16px",
                  borderRadius: 7,
                  fontSize: 12,
                  fontWeight: 600,
                  border: `1.5px solid ${isConnected ? "rgba(22,163,74,0.5)" : "rgba(232,23,93,0.45)"}`,
                  color: isConnected ? "#16a34a" : PINK,
                  backgroundColor: isConnected ? "rgba(22,163,74,0.08)" : "transparent",
                  cursor: "pointer",
                }}
              >
                {isConnected ? "✓ Connecté" : "Connexion"}
              </button>
            </div>
          </div>
        </header>
        <ProductDetail
          product={selectedProduct}
          favorites={favorites}
          cartItems={cartItems}
          isConnected={isConnected}
          onBack={() => setSelectedProduct(null)}
          onToggleFav={toggleFav}
          onToggleCart={toggleCart}
          onSelect={setSelectedProduct}
        />
      </>
    )
  }

  // ── Catalog view ──
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f4f0",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <header
        style={{
          backgroundColor: "#0f0f0f",
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid #1c1c1c",
        }}
      >
        <div
          style={{
            maxWidth: 1360,
            margin: "0 auto",
            padding: "0 32px",
            height: 58,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: PINK,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 11 }}>
                AG
              </span>
            </div>
            <span
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: "-0.3px",
              }}
            >
              Amana<span style={{ color: PINK }}>Go</span>
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                gap: 1,
                backgroundColor: "#1c1c1c",
                borderRadius: 7,
                padding: 3,
              }}
            >
              {["FR", "EN", "AR"].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  style={{
                    padding: "3px 10px",
                    borderRadius: 5,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    border: "none",
                    backgroundColor: lang === l ? "#fff" : "transparent",
                    color: lang === l ? "#111" : "rgba(255,255,255,0.35)",
                    transition: "all 0.15s",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
            {favCount > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  border: `1.5px solid ${PINK}55`,
                  borderRadius: 20,
                  padding: "4px 12px",
                  cursor: "pointer",
                }}
              >
                <HeartIcon filled size={13} />
                <span style={{ fontSize: 12, fontWeight: 600, color: PINK }}>
                  {favCount} favori{favCount > 1 ? "s" : ""}
                </span>
              </div>
            )}
            <button
              style={{
                position: "relative",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.65)",
                padding: 4,
              }}
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartItems.size > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -4,
                    width: 15,
                    height: 15,
                    backgroundColor: PINK,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 8,
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  {cartItems.size}
                </span>
              )}
            </button>
            <button
              style={{
                padding: "6px 16px",
                borderRadius: 7,
                fontSize: 12,
                fontWeight: 600,
                border: `1.5px solid ${isConnected ? "rgba(22,163,74,0.5)" : "rgba(232,23,93,0.45)"}`,
                color: isConnected ? "#16a34a" : PINK,
                backgroundColor: isConnected ? "rgba(22,163,74,0.08)" : "transparent",
                cursor: "pointer",
              }}
              onClick={() => setIsConnected(v => !v)}
            >
              {isConnected ? "✓ Connecté" : "Connexion"}
            </button>
          </div>
        </div>
      </header>

      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "32px",
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: 32,
        }}
      >
        {/* Sidebar */}
        <aside style={{ position: "sticky", top: 78, alignSelf: "start" }}>
          <div style={{ marginBottom: 30 }}>
            <label
              style={{
                display: "block",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "#b0afa9",
                marginBottom: 8,
                textTransform: "uppercase",
              }}
            >
              Recherche
            </label>
            <div style={{ position: "relative" }}>
              <svg
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#c5c3bc",
                  pointerEvents: "none",
                }}
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher..."
                style={{
                  width: "100%",
                  paddingLeft: 30,
                  paddingRight: search ? 28 : 10,
                  paddingTop: 8,
                  paddingBottom: 8,
                  fontSize: 13,
                  border: "1px solid #e0deda",
                  borderRadius: 8,
                  backgroundColor: "#fff",
                  outline: "none",
                  color: "#222",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => (e.target.style.borderColor = PINK)}
                onBlur={(e) => (e.target.style.borderColor = "#e0deda")}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{
                    position: "absolute",
                    right: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#bbb",
                    display: "flex",
                    padding: 2,
                  }}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <div style={{ marginBottom: 30 }}>
            <label
              style={{
                display: "block",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "#b0afa9",
                marginBottom: 10,
                textTransform: "uppercase",
              }}
            >
              Catégories
            </label>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {categories.map((cat) => {
                const active = activeCategory === cat.name
                return (
                  <li key={cat.name}>
                    <button
                      onClick={() => setActiveCategory(cat.name)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        background: active ? "#fff" : "none",
                        border: "none",
                        padding: "7px 8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderRadius: 7,
                        color: active ? PINK : "#555",
                        fontWeight: active ? 600 : 400,
                        fontSize: 13,
                        transition: "all 0.12s",
                      }}
                    >
                      <span>{cat.name}</span>
                      <span
                        style={{
                          fontSize: 11,
                          color: active ? PINK : "#ccc",
                          fontWeight: 500,
                        }}
                      >
                        {cat.count}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <label
              style={{
                display: "block",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "#b0afa9",
                marginBottom: 10,
                textTransform: "uppercase",
              }}
            >
              Prix
            </label>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 9,
              }}
            >
              {priceRanges.map((pr) => {
                const checked = activePrices.includes(pr.value)
                return (
                  <li key={pr.value}>
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        cursor: "pointer",
                        fontSize: 13,
                      }}
                      onClick={() => togglePrice(pr.value)}
                    >
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 4,
                          border: `1.5px solid ${checked ? PINK : "#d5d3cc"}`,
                          backgroundColor: checked ? PINK : "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          transition: "all 0.15s",
                        }}
                      >
                        {checked && (
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      <span
                        style={{
                          color: checked ? "#222" : "#666",
                          fontWeight: checked ? 500 : 400,
                        }}
                      >
                        {pr.label}
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
          {hasFilters && (
            <button
              onClick={() => {
                setActiveCategory("Tous les Produits")
                setActivePrices([])
                setSearch("")
              }}
              style={{
                marginTop: 22,
                width: "100%",
                padding: "8px 0",
                borderRadius: 8,
                border: "1px solid #e0deda",
                backgroundColor: "transparent",
                fontSize: 12,
                color: "#999",
                cursor: "pointer",
                fontWeight: 500,
              }}
              onMouseEnter={(e) => {
                const b = e.currentTarget
                b.style.borderColor = PINK
                b.style.color = PINK
              }}
              onMouseLeave={(e) => {
                const b = e.currentTarget
                b.style.borderColor = "#e0deda"
                b.style.color = "#999"
              }}
            >
              Réinitialiser
            </button>
          )}
        </aside>

        {/* Main */}
        <main>
          <div style={{ marginBottom: 26 }}>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#111",
                letterSpacing: "-0.5px",
                margin: "0 0 3px",
              }}
            >
              Mon Catalogue
            </h1>
            <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>
              {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
              {search && (
                <>
                  {" "}
                  · <span style={{ color: "#777" }}>"{search}"</span>
                </>
              )}
            </p>
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontSize: 32, margin: "0 0 12px" }}>🔍</p>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#444",
                  margin: "0 0 6px",
                }}
              >
                Aucun produit trouvé
              </p>
              <p style={{ fontSize: 13, color: "#aaa", margin: 0 }}>
                Modifiez vos filtres ou votre recherche.
              </p>
            </div>
          )}

          {topPicks.length > 0 && (
            <section style={{ marginBottom: 36 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: PINK,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  ✦ Sélectionnés pour vous · IA
                </span>
                <div
                  style={{ flex: 1, height: "1px", backgroundColor: "#e8e6e0" }}
                />
                <span
                  style={{ fontSize: 11, color: "#ccc", whiteSpace: "nowrap" }}
                >
                  {topPicks.length} recommandations
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 14,
                }}
              >
                {topPicks.map((p, idx) => {
                  const inCart = cartItems.has(p.id)
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: 12,
                        overflow: "hidden",
                        border: "1px solid #ececec",
                        transition: "box-shadow 0.2s, transform 0.2s",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.09)"
                        el.style.transform = "translateY(-2px)"
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLDivElement
                        el.style.boxShadow = "none"
                        el.style.transform = "translateY(0)"
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          height: 200,
                          overflow: "hidden",
                          backgroundColor: "#f0eeea",
                        }}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            backdropFilter: "blur(8px)",
                            borderRadius: 20,
                            padding: "3px 10px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 700,
                              color: "#fff",
                            }}
                          >
                            {idx === 0 ? "" : idx === 1 ? "" : ""} #{idx + 1}
                          </span>
                        </div>
                        <FavBtn product={p} />
                      </div>
                      <div style={{ padding: "14px 16px 16px" }}>
                        <p
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            color: PINK,
                            textTransform: "uppercase",
                            margin: "0 0 5px",
                          }}
                        >
                          {p.category}
                        </p>
                        <h3
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#111",
                            margin: "0 0 14px",
                            letterSpacing: "-0.2px",
                            lineHeight: 1.3,
                          }}
                        >
                          {p.name}
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 17,
                              fontWeight: 800,
                              color: "#111",
                              letterSpacing: "-0.4px",
                            }}
                          >
                            {p.priceLabel}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleCart(p.id)
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                              padding: "8px 14px",
                              borderRadius: 8,
                              border: "none",
                              cursor: "pointer",
                              fontSize: 12,
                              fontWeight: 600,
                              backgroundColor: inCart ? "#16a34a" : PINK,
                              color: "#fff",
                              transition: "background 0.2s",
                            }}
                          >
                            {inCart ? (
                              <>
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Ajouté
                              </>
                            ) : (
                              <>
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <circle cx="9" cy="21" r="1" />
                                  <circle cx="20" cy="21" r="1" />
                                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                                Panier
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {others.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 20,
              }}
            >
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "#e8e6e0" }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#ccc",
                  whiteSpace: "nowrap",
                }}
              >
                Autres produits
              </span>
              <div
                style={{ flex: 1, height: "1px", backgroundColor: "#e8e6e0" }}
              />
              <div style={{ position: "relative", flexShrink: 0 }}>
                <button
                  onClick={() => setSortOpen((v) => !v)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "7px 12px",
                    border: "1px solid #e0deda",
                    borderRadius: 8,
                    backgroundColor: "#fff",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#444",
                    cursor: "pointer",
                  }}
                >
                  {sort === "ia" && (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: PINK,
                      }}
                    />
                  )}
                  <span>
                    Trier · {sortOptions.find((o) => o.value === sort)?.label}
                  </span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: sortOpen ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {sortOpen && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "calc(100% + 6px)",
                      zIndex: 100,
                      backgroundColor: "#fff",
                      border: "1px solid #e8e6e0",
                      borderRadius: 10,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                      minWidth: 175,
                      overflow: "hidden",
                    }}
                  >
                    {sortOptions.map((opt, i) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSort(opt.value)
                          setSortOpen(false)
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          width: "100%",
                          padding: "9px 14px",
                          fontSize: 12,
                          fontWeight: opt.value === sort ? 600 : 400,
                          backgroundColor:
                            opt.value === sort ? "#fff8fa" : "transparent",
                          color: opt.value === sort ? PINK : "#444",
                          border: "none",
                          cursor: "pointer",
                          borderBottom:
                            i < sortOptions.length - 1
                              ? "1px solid #f5f4f0"
                              : "none",
                          textAlign: "left",
                        }}
                      >
                        <span style={{ fontSize: 13 }}>
                          {opt.value === "ia"
                            ? ""
                            : opt.value === "price-asc"
                              ? "↑"
                              : opt.value === "price-desc"
                                ? "↓"
                                : ""}
                        </span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {others.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 14,
              }}
            >
              {others.map((p) => {
                const inCart = cartItems.has(p.id)
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 12,
                      overflow: "hidden",
                      border: "1px solid #ececec",
                      transition: "box-shadow 0.2s, transform 0.2s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.boxShadow = "0 6px 24px rgba(0,0,0,0.07)"
                      el.style.transform = "translateY(-2px)"
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement
                      el.style.boxShadow = "none"
                      el.style.transform = "translateY(0)"
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        height: 170,
                        overflow: "hidden",
                        backgroundColor: "#f0eeea",
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <FavBtn product={p} />
                    </div>
                    <div style={{ padding: "12px 14px 14px" }}>
                      <p
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          color: PINK,
                          textTransform: "uppercase",
                          margin: "0 0 4px",
                        }}
                      >
                        {p.category}
                      </p>
                      <h3
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#111",
                          margin: "0 0 8px",
                          letterSpacing: "-0.2px",
                          lineHeight: 1.3,
                        }}
                      >
                        {p.name}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 15,
                            fontWeight: 800,
                            color: "#111",
                            letterSpacing: "-0.3px",
                          }}
                        >
                          {p.priceLabel}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleCart(p.id)
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "7px 12px",
                            borderRadius: 7,
                            border: "none",
                            cursor: "pointer",
                            fontSize: 12,
                            fontWeight: 600,
                            backgroundColor: inCart ? "#16a34a" : PINK,
                            color: "#fff",
                            transition: "background 0.2s",
                          }}
                        >
                          {inCart ? (
                            <>
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              Ajouté
                            </>
                          ) : (
                            <>
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                              </svg>
                              Panier
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          {filtered.length > 0 && (
            <p
              style={{
                textAlign: "center",
                fontSize: 11,
                color: "#d0cec8",
                marginTop: 48,
              }}
            >
              Recommandations actualisées en temps réel · AmanaGo IA
            </p>
          )}
        </main>
      </div>
      {sortOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 99 }}
          onClick={() => setSortOpen(false)}
        />
      )}
    </div>
  )
}
