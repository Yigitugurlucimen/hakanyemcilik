import { enrichedProducts } from "./productUtils";

const campaignDefinitions = [
  {
    slug: "performans-seti",
    name: "Performans Seti",
    shortDescription:
      "Yaris oncesi kondisyon, ucus istegi ve kas desteğini birlikte yoneten paket.",
    goal: "Kusun ucus motivasyonunu ve efor kalitesini dengeli sekilde yuksek tutmak.",
    usageWindow: "Yaris sezonu ve yuksek antrenman donemi",
    focusTags: ["performans", "yaris", "enerji", "kondisyon"],
    benefits: [
      "Enerji metabolizmasini destekler",
      "Kas fonksiyonu ve toparlanma surecine katki verir",
      "Yaris haftasi planlamasini kolaylastirir"
    ],
    productSlugs: [
      "roehnfried-carni-speed",
      "roehnfried-ro-200-ready",
      "roehnfried-kk-protein-3000",
      "roehnfried-rotosal"
    ]
  },
  {
    slug: "tuy-seti",
    name: "Tuy Seti",
    shortDescription:
      "Tuy degisim doneminde kondisyon dususunu azaltmaya yonelik bakim seti.",
    goal: "Tuy degisiminde metabolik yuklenmeyi dengeleyip genel canliligi korumak.",
    usageWindow: "Tuy donemi ve mevsim gecisleri",
    focusTags: ["tuy donemi", "vitamin", "toparlanma", "metabolizma"],
    benefits: [
      "Vitamin-mineral dengesini destekler",
      "Tuy yenileme doneminde kondisyonu korumaya yardimci olur",
      "Donem gecislerinde stres yonetimine katki verir"
    ],
    productSlugs: [
      "roehnfried-gervit-w",
      "roehnfried-sedochol",
      "roehnfried-moorgold",
      "roehnfried-pavifac"
    ]
  },
  {
    slug: "karaciger-seti",
    name: "Karaciger Seti",
    shortDescription:
      "Tedavi sonrasi ve metabolik yuk donemleri icin karaciger odakli destek paketi.",
    goal: "Karaciger ve sindirim ekseninde toparlanmayi hizlandirmak.",
    usageWindow: "Tedavi sonrasi, tuy donemi ve yogun performans arasi",
    focusTags: ["karaciger", "detoks", "sindirim", "toparlanma"],
    benefits: [
      "Karaciger metabolizmasini destekler",
      "Sindirim dengesini duzene sokmaya yardimci olur",
      "Donemsel yuklenmeler sonrasi toparlanma plani sunar"
    ],
    productSlugs: [
      "roehnfried-sedochol",
      "vitaturka-carnichol",
      "meng-vit-hepachol",
      "roehnfried-moorgold"
    ]
  },
  {
    slug: "yaris-seti",
    name: "Yaris Seti",
    shortDescription:
      "Yaris oncesi hazirliktan yaris sonrasi rejenerasyona kadar butunsel kampanya.",
    goal: "Yaris haftasini tek planla yonetip performans kaybini azaltmak.",
    usageWindow: "Yaris haftasi (oncesi + sonrasi)",
    focusTags: ["yaris", "elektrolit", "aminoasit", "toparlanma"],
    benefits: [
      "Yaris oncesi hazirlik surecini netlestirir",
      "Yaris sonrasi su-elektrolit dengesine destek verir",
      "Aminoasit ve vitamin destegiyle toparlanma rutini saglar"
    ],
    productSlugs: [
      "roehnfried-elektrolyt-3plus",
      "roehnfried-bt-amin-forte",
      "roehnfried-flight-dragees",
      "roehnfried-rotosal"
    ]
  }
];

export const campaigns = campaignDefinitions.map((campaign) => {
  const campaignProducts = campaign.productSlugs
    .map((slug) => enrichedProducts.find((product) => product.slug === slug))
    .filter(Boolean);

  return {
    ...campaign,
    products: campaignProducts
  };
});

export const getCampaignBySlug = (slug) =>
  campaigns.find((campaign) => campaign.slug === slug);

export const blogPosts = [
  {
    slug: "performans-seti-yaris-oncesi-program",
    campaignSlug: "performans-seti",
    title: "Performans Seti ile Yaris Oncesi Program Nasil Kurulur?",
    excerpt:
      "Performans setinin haftalik kullanim plani, urun eslestirmesi ve dozaj dengesini adim adim anlatiyoruz.",
    readTime: "7 dk",
    keywords: ["performans seti", "yaris oncesi", "kondisyon plani"],
    sections: [
      {
        heading: "Neden set mantigi daha verimli?",
        paragraphs: [
          "Tek urun odakli yaklasimlarda donemsel ihtiyaclarin bir kismi eksik kalabilir. Performans seti, metabolizma, enerji ve kas destek adimlarini birbirine baglayarak daha stabil bir sonuc hedefler.",
          "Ozellikle yaris doneminde su tuketimi, antrenman yogunlugu ve toparlanma hizi birlikte degistigi icin urunlerin birlikte planlanmasi karar surecini kolaylastirir."
        ],
        bullets: [
          "Yaris haftasinda kararsizligi azaltir",
          "Asiri urun yuklenmesini engellemeye yardimci olur",
          "Ayni hedefe hizmet eden urunleri tek planda birlestirir"
        ]
      },
      {
        heading: "Haftalik kullanim iskeleti",
        paragraphs: [
          "Setin omurgasini yaris oncesi kondisyon, yaris gunu oncesi son dokunus ve yaris sonrasi toparlanma adimlari olusturur. Bu nedenle haftayi sabit gunlere baglamak takip kolayligi saglar."
        ],
        bullets: [
          "Antrenman gunleri: metabolizma ve kas destegi",
          "Yaris yaklastikca: performans urunlerinin hafif artisi",
          "Yaris sonrasi ilk suklarda: toparlanma odakli urunler"
        ]
      }
    ]
  },
  {
    slug: "tuy-seti-ile-donemsel-bakim-rehberi",
    campaignSlug: "tuy-seti",
    title: "Tuy Seti ile Donemsel Bakim Rehberi",
    excerpt:
      "Tuy doneminde kondisyon kaybini azaltmak icin vitamin, metabolizma ve sindirim destegini birlikte yonetin.",
    readTime: "8 dk",
    keywords: ["tuy donemi", "vitamin destegi", "bakim plani"],
    sections: [
      {
        heading: "Tuy doneminde en sik yapilan hatalar",
        paragraphs: [
          "Donem basinda plansiz urun degisikligi yapmak veya ayni etkide cok urunu ust uste kullanmak, beklenen faydayi dusurebilir.",
          "Bu donemde asil ihtiyac, vucudun yenilenme surecine duzenli ama olculu destek vermektir."
        ],
        bullets: [
          "Duzensiz kullanim takvimi",
          "Asiri doz ile hizli sonuc beklemek",
          "Sindirim destegini ihmal etmek"
        ]
      },
      {
        heading: "Tuy setinde kombinasyon mantigi",
        paragraphs: [
          "Vitamin destek urunleri genel dengeyi saglarken, karaciger ve sindirim odakli urunler vucudun yukunu hafifletmeye yardimci olur.",
          "Bu nedenle set icindeki urunleri doneme gore bolerek kullanmak daha dengeli bir yaklasimdir."
        ],
        bullets: [
          "Haftanin belirli gunlerinde vitamin odagi",
          "Ara gunlerde metabolizma ve sindirim odagi",
          "Taze su ve hijyen rutiniyle birlikte uygulama"
        ]
      }
    ]
  },
  {
    slug: "karaciger-seti-toparlanma-stratejisi",
    campaignSlug: "karaciger-seti",
    title: "Karaciger Seti ile Toparlanma Stratejisi",
    excerpt:
      "Tedavi sonrasi ve yuksek stres donemlerinde karaciger destek kampanyasini nasil konumlandirmaniz gerektigini anlatiyoruz.",
    readTime: "6 dk",
    keywords: ["karaciger destegi", "toparlanma", "detoks plani"],
    sections: [
      {
        heading: "Karaciger neden merkezde olmali?",
        paragraphs: [
          "Yogun performans, ilaclama veya mevsim gecisleri sonrasinda metabolik yuk artis gosterebilir. Bu donemde karaciger odakli planlama, genel toparlanma hizina dogrudan etki eder.",
          "Set mantigi, tek urunle sinirli kalmadan sindirim ve su dengesi adimlarini da dahil eder."
        ],
        bullets: [
          "Metabolik yuklenme sonrasi destek",
          "Sindirim dengesini korumaya yardim",
          "Donemsel kullanimla planli toparlanma"
        ]
      },
      {
        heading: "Kampanya donusumu icin icerik dili",
        paragraphs: [
          "Karaciger seti kampanyasinda teknik ve sade bir dil daha iyi sonuc verir. Kullaniciya hangi durumda hangi urun grubuna gecmesi gerektigi acik sekilde anlatilmalidir.",
          "Blog iceriginde tablo, adim adim plan ve soru-cevap bolumu kullanmak karar verme suresini kisaltir."
        ],
        bullets: [
          "Belirtiye gore urun secim mantigi",
          "Kisa ve net kullanim senaryolari",
          "Siparis hattina yonlendiren net CTA"
        ]
      }
    ]
  },
  {
    slug: "yaris-seti-kampanya-kurulumu",
    campaignSlug: "yaris-seti",
    title: "Yaris Seti Kampanyasi Nasil Kurgulanir?",
    excerpt:
      "Yaris haftasina ozel set kampanyasi olustururken urun secimi, mesaj dili ve satisa donusturen blog yapisi.",
    readTime: "9 dk",
    keywords: ["yaris seti", "kampanya", "güvercin takviye"],
    sections: [
      {
        heading: "Kampanya catisini netlestirme",
        paragraphs: [
          "Yaris seti kampanyasinda ana mesaj, hazirlik + yaristan sonra toparlanma dengesini tek paketle cozmektir.",
          "Kullanici bu kampanyada urun adindan cok sonuc odagina bakar; bu nedenle kampanya basligi problem-cozum seklinde kurulmalidir."
        ],
        bullets: [
          "Yaris oncesi hazirlik odagi",
          "Yaris sonrasi toparlanma adimi",
          "Sete ozel fiyat/avantaj mesaji"
        ]
      },
      {
        heading: "Blog icerigi ile kampanya performansi artirma",
        paragraphs: [
          "Blog icerigi kampanya sayfasini destekleyen bir rehber gibi kurgulanmalidir. Kullanici once neden bu sete ihtiyac duydugunu anlamali, sonra da set icerigindeki urunlerin rollerini gormelidir.",
          "Icerigin sonunda siparis hattina gecis butonu ve set ozet kutusu kullanmak, aksiyona gecis oranini artirir."
        ],
        bullets: [
          "Setteki urunlerin gorev tablosu",
          "Ornek haftalik kullanim senaryosu",
          "Sik sorulan sorularla tereddut azaltma"
        ]
      }
    ]
  }
];

export const getBlogBySlug = (slug) =>
  blogPosts.find((post) => post.slug === slug);

export const getBlogsByCampaign = (campaignSlug) =>
  blogPosts.filter((post) => post.campaignSlug === campaignSlug);
