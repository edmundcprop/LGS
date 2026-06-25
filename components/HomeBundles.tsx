"use client";

import { whatsappLink } from "@/lib/site";
import { fireBundleQuoteClick, fireWhatsAppConversion, logWhatsAppClick } from "@/lib/tracking";
import T from "@/components/T";

type Bundle = {
  slug: string;
  titleEn: string;
  titleMs: string;
  audienceEn: string;
  audienceMs: string;
  categories: { en: string; ms: string }[];
  fromMonthly: number;
};

const BUNDLES: Bundle[] = [
  {
    slug: "new-condo-starter",
    titleEn: "New Condo Starter",
    titleMs: "Pakej Kondo Baharu",
    audienceEn: "Just moved in — get the essentials ready.",
    audienceMs: "Baru berpindah — sediakan keperluan asas.",
    categories: [
      { en: "Water Purifier", ms: "Penulen Air" },
      { en: "Air Conditioner", ms: "Penyaman Udara" },
      { en: "Washer", ms: "Mesin Basuh" },
      { en: "Refrigerator", ms: "Peti Sejuk" },
    ],
    fromMonthly: 305,
  },
  {
    slug: "family-comfort",
    titleEn: "Family Comfort Bundle",
    titleMs: "Pakej Keluarga Selesa",
    audienceEn: "Healthier living for parents and kids.",
    audienceMs: "Kehidupan lebih sihat untuk ibu bapa dan anak-anak.",
    categories: [
      { en: "Water Purifier", ms: "Penulen Air" },
      { en: "Air Purifier", ms: "Penulen Udara" },
      { en: "Refrigerator", ms: "Peti Sejuk" },
      { en: "Washer", ms: "Mesin Basuh" },
      { en: "TV", ms: "TV" },
    ],
    fromMonthly: 380,
  },
  {
    slug: "landlord-rental",
    titleEn: "Landlord Rental Bundle",
    titleMs: "Pakej Sewa Tuan Rumah",
    audienceEn: "Furnish your unit, charge premium rent.",
    audienceMs: "Lengkapkan unit, caj sewa premium.",
    categories: [
      { en: "Air Conditioner", ms: "Penyaman Udara" },
      { en: "Refrigerator", ms: "Peti Sejuk" },
      { en: "Washer", ms: "Mesin Basuh" },
      { en: "TV", ms: "TV" },
      { en: "Microwave", ms: "Ketuhar Gelombang Mikro" },
    ],
    fromMonthly: 415,
  },
  {
    slug: "pet-owner",
    titleEn: "Pet Owner Bundle",
    titleMs: "Pakej Pemilik Haiwan",
    audienceEn: "Cleaner air, cleaner floors, cleaner clothes.",
    audienceMs: "Udara, lantai dan pakaian yang lebih bersih.",
    categories: [
      { en: "Air Purifier", ms: "Penulen Udara" },
      { en: "Vacuum Cleaner", ms: "Pembersih Hampagas" },
      { en: "Washer/Dryer", ms: "Mesin Basuh/Pengering" },
    ],
    fromMonthly: 260,
  },
  {
    slug: "entertainment",
    titleEn: "Home Entertainment Bundle",
    titleMs: "Pakej Hiburan Rumah",
    audienceEn: "Cinema and concert sound, every night.",
    audienceMs: "Bunyi pawagam dan konsert, setiap malam.",
    categories: [
      { en: "TV", ms: "TV" },
      { en: "Soundbar", ms: "Soundbar" },
    ],
    fromMonthly: 170,
  },
];

export default function HomeBundles() {
  const handleClick = (b: Bundle) => () => {
    fireBundleQuoteClick({
      bundleSlug: b.slug,
      bundleName: b.titleEn,
      categorySlugs: b.categories.map((c) => c.en.toLowerCase()),
    });
    fireWhatsAppConversion();
    logWhatsAppClick({ source: "anchor", message: `bundle:${b.slug}` });
  };

  const messageFor = (b: Bundle) =>
    `Hi, I'd like a quote for the ${b.titleEn} (${b.categories.map((c) => c.en).join(", ")}).`;

  return (
    <section className="section bg-white">
      <div className="container-xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="eyebrow">
            <T en="Home bundles" ms="Pakej rumah" />
          </div>
          <h2 className="headline mt-5 text-balance">
            <T
              en="Not sure where to start? Pick a bundle."
              ms="Tidak pasti mula dari mana? Pilih pakej."
            />
          </h2>
          <p className="lede mt-6 text-balance text-lg-stone">
            <T
              en="One enquiry. We tailor the plan to your home."
              ms="Satu pertanyaan. Kami sesuaikan pelan untuk rumah anda."
            />
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BUNDLES.map((b) => (
            <div
              key={b.slug}
              className="flex flex-col rounded-[28px] border border-black/[0.06] bg-lg-mist p-8 transition hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-lg-red">
                <T en={`From RM${b.fromMonthly}/mo`} ms={`Dari RM${b.fromMonthly}/bln`} />
              </div>
              <h3 className="mt-3 text-xl font-semibold text-lg-ink">
                <T en={b.titleEn} ms={b.titleMs} />
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-lg-stone">
                <T en={b.audienceEn} ms={b.audienceMs} />
              </p>
              <ul className="mt-5 space-y-1.5">
                {b.categories.map((c) => (
                  <li key={c.en} className="flex items-center gap-2 text-[14px] text-lg-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-lg-red" aria-hidden />
                    <T en={c.en} ms={c.ms} />
                  </li>
                ))}
              </ul>
              <div className="mt-7 pt-7 border-t border-black/[0.06]">
                <a
                  href={whatsappLink(messageFor(b), {
                    source: "homepage",
                    ctaLocation: `bundle_${b.slug}`,
                  })}
                  target="_blank"
                  rel="noreferrer"
                  onClick={handleClick(b)}
                  className="inline-flex h-11 w-full items-center justify-center rounded-full bg-lg-ink text-[14px] font-semibold text-white transition hover:bg-lg-ink/90"
                >
                  <T en="Ask for bundle quote" ms="Minta sebut harga pakej" />
                </a>
                <p className="mt-3 text-center text-[11px] text-lg-stone">
                  <T
                    en="Final price confirmed via WhatsApp"
                    ms="Harga akhir disahkan melalui WhatsApp"
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
