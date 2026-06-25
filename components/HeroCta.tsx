"use client";

import Link from "next/link";
import { whatsappLink } from "@/lib/site";
import { fireHeroCtaClick, fireWhatsAppConversion, logWhatsAppClick } from "@/lib/tracking";
import T from "@/components/T";

const WHATSAPP_HREF = whatsappLink(
  "Hi, I'd like a WhatsApp quote for LG Subscribe plans.",
  { source: "homepage", ctaLocation: "hero" }
);

export default function HeroCta() {
  const onWhatsApp = () => {
    fireWhatsAppConversion();
    logWhatsAppClick({ source: "anchor" });
    fireHeroCtaClick("hero_whatsapp");
  };
  const onBrowse = () => fireHeroCtaClick("hero_browse");

  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noreferrer"
        onClick={onWhatsApp}
        className="inline-flex h-12 items-center gap-2 rounded-full bg-lg-red px-7 text-[15px] font-semibold text-white transition hover:bg-lg-red/90"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 22a9.95 9.95 0 0 1-4.95-1.318l-5.49 1.44 1.467-5.36A9.95 9.95 0 1 1 12.05 22z" />
        </svg>
        <T en="Get WhatsApp quote" ms="Sebut harga WhatsApp" />
      </a>
      <Link
        href="/products"
        onClick={onBrowse}
        className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[15px] font-medium text-lg-ink transition hover:bg-white/90"
      >
        <T en="Browse products" ms="Lihat produk" />
      </Link>
    </div>
  );
}
