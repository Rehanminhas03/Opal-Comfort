'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import {
  BedModel,
  BASE_TYPES,
  BaseType,
  SIZE_CHARTS,
  EXTRA_SIZES,
  HEADBOARD,
} from '@/lib/catalogue';
import { resolveBaseTypes, openWhatsApp, buildQuoteHref } from '@/lib/enquiry';
import FabricPicker, { SelectedFabric } from './catalogue/FabricPicker';

// Special size choices appended after the chosen base's chart.
const EMPEROR_KEY = '__emperor__';
const CUSTOM_KEY = '__custom__';

const HEADBOARD_HEIGHTS: number[] = [];
for (let h = HEADBOARD.minHeightIn; h <= HEADBOARD.maxHeightIn; h += 5) {
  HEADBOARD_HEIGHTS.push(h);
}

export default function Configurator({ bed }: { bed: BedModel }) {
  const bases = resolveBaseTypes(bed);
  const [base, setBase] = useState<BaseType>(bases[0]);
  const chartKey = bed.sizeChartByBase[base] ?? BASE_TYPES[base].sizeChart;
  const chart = SIZE_CHARTS[chartKey];

  const [sizeKey, setSizeKey] = useState<string>(chart.rows[0]?.name ?? '');
  const [customSize, setCustomSize] = useState('');
  const [headboard, setHeadboard] = useState(HEADBOARD.standardHeightIn);
  const [split, setSplit] = useState(false);
  const [fabric, setFabric] = useState<SelectedFabric | null>(null);

  const changeBase = (next: BaseType) => {
    setBase(next);
    const nextChartKey = bed.sizeChartByBase[next] ?? BASE_TYPES[next].sizeChart;
    setSizeKey(SIZE_CHARTS[nextChartKey].rows[0]?.name ?? '');
  };

  // Human-readable size string for the enquiry message.
  const sizeText = (() => {
    if (sizeKey === CUSTOM_KEY)
      return `Custom / made to measure${customSize ? ` — ${customSize}` : ''}`;
    if (sizeKey === EMPEROR_KEY)
      return `${EXTRA_SIZES.emperor.name} (confirm exact dimensions)`;
    const row = chart.rows.find((r) => r.name === sizeKey);
    return row ? `${row.name} (${row.widthIn}"×${row.lengthIn}")` : sizeKey;
  })();

  const headboardText = `${headboard}" tall${split ? ', split into two pieces' : ''}`;
  const fabricText = fabric ? `${fabric.collectionLabel} — ${fabric.name}` : 'To be decided';

  const enquiryLines = {
    'Bed style': bed.name,
    Base: BASE_TYPES[base].label,
    Size: sizeText,
    Headboard: headboardText,
    Fabric: fabricText,
  };

  const quoteMessage = `I'd like a quote for the ${bed.name} bed — ${BASE_TYPES[base].label}, ${sizeText}, headboard ${headboardText}, fabric: ${fabricText}.`;

  return (
    <div className="space-y-10">
      {/* Base type */}
      <Section title="1 · Choose your base">
        <div className="flex flex-wrap gap-3">
          {bases.map((b) => (
            <Pill key={b} selected={base === b} onClick={() => changeBase(b)}>
              {BASE_TYPES[b].label}
            </Pill>
          ))}
        </div>
        <p className="mt-3 font-body text-sm text-slate">{BASE_TYPES[base].blurb}</p>
      </Section>

      {/* Size */}
      <Section title="2 · Choose your size">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {chart.rows.map((row) => (
            <Pill
              key={row.name}
              selected={sizeKey === row.name}
              onClick={() => setSizeKey(row.name)}
              full
            >
              <span className="font-medium">{row.name}</span>
              <span className="ml-2 text-xs opacity-70">
                {row.widthIn}&quot; × {row.lengthIn}&quot;
              </span>
            </Pill>
          ))}
          <Pill selected={sizeKey === EMPEROR_KEY} onClick={() => setSizeKey(EMPEROR_KEY)} full>
            {EXTRA_SIZES.emperor.name}
            <span className="ml-2 text-xs opacity-70">confirm dimensions</span>
          </Pill>
          <Pill selected={sizeKey === CUSTOM_KEY} onClick={() => setSizeKey(CUSTOM_KEY)} full>
            {EXTRA_SIZES.custom.name}
          </Pill>
        </div>
        {chart.note && (
          <p className="mt-3 font-body text-xs text-slate/80">{chart.note}</p>
        )}
        {sizeKey === CUSTOM_KEY && (
          <input
            type="text"
            value={customSize}
            onChange={(e) => setCustomSize(e.target.value)}
            placeholder='e.g. 200cm × 200cm, or "extra long"'
            className="mt-4 w-full rounded-md border border-cream-border bg-ivory px-3 py-2 font-body text-sm text-charcoal focus:border-sage focus:outline-none"
          />
        )}
      </Section>

      {/* Headboard */}
      <Section title="3 · Headboard">
        <label className="block max-w-xs">
          <span className="mb-1 block font-body text-xs uppercase tracking-widest text-slate">
            Height
          </span>
          <select
            value={headboard}
            onChange={(e) => setHeadboard(Number(e.target.value))}
            className="w-full rounded-md border border-cream-border bg-ivory px-3 py-2 font-body text-sm text-charcoal focus:border-sage focus:outline-none"
          >
            {HEADBOARD_HEIGHTS.map((h) => (
              <option key={h} value={h}>
                {h}&quot;{h === HEADBOARD.standardHeightIn ? ' (standard)' : ''}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-4 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={split}
            onChange={(e) => setSplit(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-sage"
          />
          <span className="font-body text-sm text-slate">
            Split into two pieces (for low ceilings / tight staircases)
          </span>
        </label>
        <p className="mt-2 font-body text-xs text-slate/80">{HEADBOARD.splitNote}</p>
      </Section>

      {/* Fabric */}
      <Section title="4 · Choose your fabric">
        {/* Large live preview of the selected swatch */}
        <div className="mb-6 flex items-center gap-4 rounded-md border border-cream-border bg-warm-white p-4">
          <span
            className="h-20 w-20 shrink-0 rounded-md ring-1 ring-cream-border"
            style={{ backgroundColor: fabric?.hex ?? '#E8E0D5' }}
            role="img"
            aria-label={fabric ? `${fabric.name} preview` : 'No fabric selected'}
          />
          <div>
            {fabric ? (
              <>
                <p className="font-body text-xs uppercase tracking-[0.2em] text-gold">
                  {fabric.collectionLabel}
                </p>
                <p className="font-display text-xl text-charcoal">{fabric.name}</p>
              </>
            ) : (
              <p className="font-body text-sm text-slate">
                Pick a colour below, or decide later when we post you samples.
              </p>
            )}
            <Link
              href="/fabric-sample"
              className="mt-1 inline-block font-body text-sm font-medium text-sage underline underline-offset-4 transition-colors hover:text-sage-light"
            >
              Order a free sample →
            </Link>
          </div>
        </div>
        <FabricPicker mode="single" value={fabric} onChange={setFabric} />
      </Section>

      {/* CTAs */}
      <div className="sticky bottom-4 flex flex-col gap-3 rounded-md border border-cream-border bg-ivory/95 p-4 shadow-lg backdrop-blur sm:flex-row">
        <button
          type="button"
          onClick={() => openWhatsApp(enquiryLines)}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-green-500 py-4 font-body font-semibold uppercase tracking-widest text-white transition-colors hover:bg-green-600"
        >
          <MessageCircle className="h-5 w-5" />
          Enquire about this bed
        </button>
        <Link
          href={buildQuoteHref({ product: `${bed.name} bed`, message: quoteMessage })}
          className="flex flex-1 items-center justify-center rounded-md border border-gold py-4 font-body font-semibold uppercase tracking-widest text-sage transition-colors hover:bg-gold hover:text-sage"
        >
          Get a Quote
        </Link>
      </div>
      <p className="text-center font-body text-xs text-slate/70">
        No payment online — every order is confirmed personally. Crafted for Rest, Designed for Comfort.
      </p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 font-display text-xl text-charcoal">{title}</h3>
      {children}
    </div>
  );
}

function Pill({
  children,
  selected,
  onClick,
  full = false,
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  full?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-md border px-4 py-2.5 text-left font-body text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
        full ? 'w-full' : ''
      } ${
        selected
          ? 'border-sage bg-sage text-ivory'
          : 'border-cream-border bg-ivory text-charcoal hover:border-sage'
      }`}
    >
      {children}
    </button>
  );
}
