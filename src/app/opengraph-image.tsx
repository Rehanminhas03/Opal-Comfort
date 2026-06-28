import { ImageResponse } from 'next/og';
import { BUSINESS } from '@/lib/catalogue';

// Site-wide default Open Graph / social-share image, generated from the brand
// palette so no static asset is needed. 1200×630 is the standard OG size.
export const alt = 'Opal Comfort — Handmade Bespoke Beds & Sofas';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2C4A3E',
          color: '#FAF7F2',
          fontFamily: 'serif',
          padding: '80px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 30,
            letterSpacing: 12,
            textTransform: 'uppercase',
            color: '#B8935A',
          }}
        >
          Est. West Yorkshire
        </div>
        <div style={{ fontSize: 110, fontWeight: 700, marginTop: 24 }}>
          {BUSINESS.name}
        </div>
        <div style={{ fontSize: 40, fontStyle: 'italic', color: '#FAF7F2', marginTop: 12 }}>
          {BUSINESS.tagline}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 26,
            color: '#FAF7F2',
            opacity: 0.8,
            fontFamily: 'sans-serif',
          }}
        >
          Handmade Bespoke Beds &amp; Sofas · Delivered across the UK
        </div>
      </div>
    ),
    { ...size },
  );
}
