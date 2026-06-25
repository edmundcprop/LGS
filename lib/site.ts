import siteData from "../data/site.json";

export const site = siteData;

type WhatsAppSource = {
  source?: string;
  ctaLocation?: string;
};

export const whatsappLink = (message: string, src?: WhatsAppSource): string => {
  const finalMessage = src?.ctaLocation
    ? `${message}\n\n(ref: ${src.source ?? "homepage"}/${src.ctaLocation})`
    : message;
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(finalMessage)}`;
};

export const absoluteUrl = (path = "") => {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${clean === "/" ? "" : clean}`;
};
