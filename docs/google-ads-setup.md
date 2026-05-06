# Google Ads Setup

This site is prepared for Google Ads through Google Tag Manager (GTM).

## What is already in the site

- GTM is loaded from `NEXT_PUBLIC_GTM_ID` with a fallback to `GTM-K7G8ZKWJ`.
- Consent Mode defaults to denied until the visitor accepts cookies.
- The enquiry form pushes a `generate_lead` event to `dataLayer` before opening WhatsApp.

## Environment variable

Set the GTM container ID in your environment:

```bash
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

For local development, add it to `.env.local`. For production, add it in the hosting provider's environment settings.

## Lead event payload

When a visitor submits the enquiry form, the site pushes:

```ts
{
  event: "generate_lead",
  lead_method: "whatsapp",
  lead_destination: "whatsapp",
  currency: "MYR",
  value: number,
  value_monthly: number,
  value_outright: number,
  item_count: number,
  items: [...],
  has_email: boolean,
  has_location: boolean
}
```

Use `event = generate_lead` as the conversion trigger in GTM.

## Recommended GTM tags

1. Add a `Conversion Linker` tag and fire it on all pages.
2. Add a `Google Ads Conversion Tracking` tag for leads.
3. Set the lead tag trigger to a `Custom Event` where the event name equals `generate_lead`.
4. Map the conversion value to the data layer variable `value`.
5. Map the conversion currency to the data layer variable `currency`.

## Recommended GTM variables

Create these Data Layer Variables in GTM:

- `value`
- `currency`
- `value_monthly`
- `value_outright`
- `item_count`
- `lead_method`
- `lead_destination`
- `has_email`
- `has_location`

## Google Ads checklist

1. Create a lead conversion action in Google Ads.
2. Copy the `Conversion ID` and `Conversion Label` into the GTM Google Ads conversion tag.
3. Publish the GTM container.
4. Test the enquiry flow in GTM Preview mode.
5. Confirm the conversion appears in Google Ads diagnostics.
