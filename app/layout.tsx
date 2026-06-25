import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import MobileStickyCta from "@/components/MobileStickyCta";
import ConsentBanner from "@/components/ConsentBanner";
import AnalyticsListeners from "@/components/AnalyticsListeners";
import { site, absoluteUrl } from "@/lib/site";
import {
  getGa4Id,
  getGtmId,
  GOOGLE_ADS_ID,
  TRACKING_ALLOWED_HOSTS,
} from "@/lib/tracking";

const GTM_ID = getGtmId();
const GA4_ID = getGa4Id();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — LG Appliances from RM45/month, no upfront cost`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "LG Subscribe Malaysia",
    "LG subscription",
    "LG appliance rental Malaysia",
    "LG PuriCare",
    "LG aircond subscription",
    "LG water purifier Malaysia",
    "home appliance subscription Malaysia",
    "LG Malaysia",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
    languages: {
      "en-MY": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: absoluteUrl("/"),
    siteName: site.name,
    title: `${site.name} — LG Appliances from RM45/month, no upfront cost`,
    description: site.description,
    images: [
      {
        url: "/uploads/site/hero-water-purifier.jpg",
        width: 1600,
        height: 1062,
        alt: "LG Subscribe Malaysia — premium home appliances",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — LG Appliances from RM45/month, no upfront cost`,
    description: site.description,
    images: [
      "/uploads/site/hero-water-purifier.jpg",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#A50034",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-MY">
      <head>
        <script
          id="consent-default"
          dangerouslySetInnerHTML={{
            __html: `window.__lgTrackingAllowed=${JSON.stringify(TRACKING_ALLOWED_HOSTS)}.indexOf(window.location.hostname)!==-1;window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;if(window.__lgTrackingAllowed){var c='denied';try{var r=JSON.parse(localStorage.getItem('lg-consent-v1')||'null');if(r&&r.analytics_storage==='granted')c='granted';}catch(e){}gtag('consent','default',{ad_storage:c,ad_user_data:c,ad_personalization:c,analytics_storage:c,functionality_storage:'granted',security_storage:'granted',wait_for_update:500});gtag('set','url_passthrough',true);gtag('set','ads_data_redaction',c==='denied');}`,
          }}
        />
        <script
          id="gtm-init"
          dangerouslySetInnerHTML={{
            __html: `if(window.__lgTrackingAllowed){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');}`,
          }}
        />
        <script
          id="ga4-loader"
          dangerouslySetInnerHTML={{
            __html: `if(window.__lgTrackingAllowed){var g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id=${GA4_ID}';document.head.appendChild(g);}`,
          }}
        />
        <script
          id="ga4-init"
          dangerouslySetInnerHTML={{
            __html: `if(window.__lgTrackingAllowed){gtag('js', new Date());gtag('config', '${GA4_ID}');gtag('config', '${GOOGLE_ADS_ID}');}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var l=localStorage.getItem('lang');if(l==='ms')document.documentElement.lang='ms';}catch(e){}`,
          }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
        <MobileStickyCta />
        <ConsentBanner />
        <AnalyticsListeners />
      </body>
    </html>
  );
}
