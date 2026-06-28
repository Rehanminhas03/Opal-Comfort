/**
 * Opal Comfort — shared enquiry pipeline.
 *
 * There is NO backend and no business email yet (BUSINESS.email is null), so
 * every product CTA and form delivers the lead the way the client actually
 * works: a pre-filled WhatsApp message. Keep all wa.me URL building here so no
 * component forks the logic.
 */

import { BUSINESS, BedModel, BaseType, STYLE_BASE_AVAILABILITY } from "./catalogue";

export const WA_NUMBER = BUSINESS.whatsapp; // "447831213807"

/**
 * Build a WhatsApp deep link from labelled lines. Empty values are dropped so
 * optional fields don't leave blank lines in the message.
 */
export function buildWhatsAppUrl(lines: Record<string, string | undefined>): string {
  const body = Object.entries(lines)
    .filter(([, value]) => value != null && String(value).trim() !== "")
    .map(([label, value]) => `${label}: ${String(value).trim()}`)
    .join("\n");
  const text = body ? `Hi Opal Comfort,\n\n${body}` : "Hi Opal Comfort,";
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Open the pre-filled WhatsApp chat in a new tab (client-side only). */
export function openWhatsApp(lines: Record<string, string | undefined>): void {
  if (typeof window === "undefined") return;
  window.open(buildWhatsAppUrl(lines), "_blank", "noopener,noreferrer");
}

/**
 * The full set of base types a bed style is offered on. Styles pictured on
 * multiple bases are recorded in STYLE_BASE_AVAILABILITY (merge by name);
 * everything else falls back to the model's own list.
 */
export function resolveBaseTypes(bed: Pick<BedModel, "slug" | "baseTypes">): BaseType[] {
  return STYLE_BASE_AVAILABILITY[bed.slug] ?? bed.baseTypes;
}

/**
 * Link to the /contact page with the enquiry form pre-filled via query params.
 * The /contact page reads `product` and `message` and passes them to EnquiryForm.
 */
export function buildQuoteHref(params: { product?: string; message?: string }): string {
  const qs = new URLSearchParams();
  if (params.product) qs.set("product", params.product);
  if (params.message) qs.set("message", params.message);
  const query = qs.toString();
  return query ? `/contact?${query}` : "/contact";
}
