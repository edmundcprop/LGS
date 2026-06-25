"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { whatsappLink } from "@/lib/site";
import { fireHeroCtaClick, fireWhatsAppConversion, logWhatsAppClick } from "@/lib/tracking";

const WHATSAPP_HREF = whatsappLink(
  "Hi, I'd like to know more about LG Subscribe plans.",
  { source: "homepage", ctaLocation: "mobile_sticky" }
);

export default function MobileStickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleWhatsApp = () => {
    fireWhatsAppConversion();
    logWhatsAppClick({ source: "anchor" });
    fireHeroCtaClick("mobile_sticky_whatsapp");
  };

  const handleBrowse = () => fireHeroCtaClick("mobile_sticky_browse");

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 lg:hidden ${show ? "translate-y-0" : "translate-y-full"} transition-transform duration-300`}
      aria-hidden={!show}
    >
      <div className="border-t border-black/[0.06] bg-white/95 backdrop-blur-sm shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-stretch gap-2 px-4 py-3 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer"
            onClick={handleWhatsApp}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-[14px] font-semibold text-white"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 22a9.95 9.95 0 0 1-4.95-1.318l-5.49 1.44 1.467-5.36A9.95 9.95 0 1 1 12.05 22z" />
            </svg>
            WhatsApp Quote
          </a>
          <Link
            href="/products"
            onClick={handleBrowse}
            className="flex items-center justify-center rounded-full border border-black/10 px-5 py-3 text-[14px] font-semibold text-lg-ink"
          >
            Browse
          </Link>
        </div>
      </div>
    </div>
  );
}
