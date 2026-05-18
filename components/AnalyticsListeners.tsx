"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { pushEvent } from "@/lib/analytics";
import {
  fireGa4PageView,
  fireWhatsAppConversion,
  logWhatsAppClick,
} from "@/lib/tracking";

// Delegated click tracking for WhatsApp links and Enquire CTAs.
// Mounted once in the root layout — fires on any descendant <a> click,
// including links rendered in server components.
export default function AnalyticsListeners() {
  const pathname = usePathname();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    fireGa4PageView({
      pagePath: `${pathname}${window.location.search}`,
      pageLocation: window.location.href,
      pageTitle: document.title,
    });
  }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      const label = (anchor.textContent ?? "").trim().slice(0, 80);

      if (href.startsWith("https://wa.me/") || href.includes("api.whatsapp.com")) {
        pushEvent({
          event: "whatsapp_click",
          link_url: href,
          link_text: label,
          link_location: anchor.getAttribute("aria-label") ?? "link",
        });
        fireWhatsAppConversion();
        let prefilled = "";
        try {
          prefilled = new URL(href).searchParams.get("text") ?? "";
        } catch {
          // malformed href — log without message
        }
        logWhatsAppClick({
          source: "anchor",
          message: prefilled,
          productName:
            document.querySelector("h1")?.textContent?.trim() || undefined,
        });
        return;
      }

      if (href.startsWith("tel:")) {
        pushEvent({
          event: "phone_click",
          link_url: href,
          link_text: label,
          link_location: anchor.getAttribute("aria-label") ?? "link",
        });
        return;
      }

      if (href === "/enquire" || href.startsWith("/enquire?") || href.startsWith("/enquire#")) {
        pushEvent({
          event: "enquire_click",
          link_url: href,
          link_text: label,
        });
      }
    };

    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
