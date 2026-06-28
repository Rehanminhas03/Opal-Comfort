'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  BED_MODELS,
  BASE_TYPES,
  BaseType,
  FABRIC_COLLECTIONS,
  FULFILMENT_LABELS,
  Fulfilment,
  SIZE_CHARTS,
} from '@/lib/catalogue';
import { resolveBaseTypes } from '@/lib/enquiry';
import { getPlaceholderImage } from '@/lib/placeholderImages';
import AnimateIn from '../AnimateIn';
import CatalogueCard from './CatalogueCard';

const BASE_OPTIONS = Object.keys(BASE_TYPES) as BaseType[];
const FULFILMENT_OPTIONS = Object.keys(FULFILMENT_LABELS) as Fulfilment[];

/**
 * Beds catalogue with filters. NOTE for the client: with the current data the
 * fabric-collection and fulfilment filters barely narrow results — every bed is
 * made-to-order and every style can be built in every fabric collection. The
 * base-type filter is the meaningful one. Controls are provided as specified.
 */
export default function BedsBrowser() {
  const searchParams = useSearchParams();
  // Base comes from the URL (?base=, set by the Beds mega-menu) until the user
  // changes the dropdown, after which their choice takes over.
  const paramBase = searchParams.get('base');
  const urlBase: BaseType | '' =
    paramBase && paramBase in BASE_TYPES ? (paramBase as BaseType) : '';
  const [baseOverride, setBaseOverride] = useState<BaseType | '' | null>(null);
  const base = baseOverride === null ? urlBase : baseOverride;

  const [collection, setCollection] = useState('');
  const [fulfilment, setFulfilment] = useState<Fulfilment | ''>('');

  const beds = useMemo(
    () =>
      BED_MODELS.filter((bed) => {
        if (base && !resolveBaseTypes(bed).includes(base)) return false;
        if (fulfilment && bed.fulfilment !== fulfilment) return false;
        // Fabric collection does not narrow beds (all styles take all fabrics).
        return true;
      }),
    [base, fulfilment],
  );

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-end gap-x-6 gap-y-4 rounded-md border border-cream-border bg-warm-white p-5">
        <FilterSelect
          label="Base type"
          value={base}
          onChange={(v) => setBaseOverride(v as BaseType | '')}
          options={[
            { value: '', label: 'All bases' },
            ...BASE_OPTIONS.map((b) => ({ value: b, label: BASE_TYPES[b].label })),
          ]}
        />
        <FilterSelect
          label="Fabric collection"
          value={collection}
          onChange={setCollection}
          options={[
            { value: '', label: 'All collections' },
            ...FABRIC_COLLECTIONS.map((c) => ({ value: c.id, label: c.label })),
          ]}
        />
        <FilterSelect
          label="Fulfilment"
          value={fulfilment}
          onChange={(v) => setFulfilment(v as Fulfilment | '')}
          options={[
            { value: '', label: 'All' },
            ...FULFILMENT_OPTIONS.map((f) => ({ value: f, label: FULFILMENT_LABELS[f] })),
          ]}
        />
        <p className="ml-auto self-center font-body text-sm text-slate">
          {beds.length} {beds.length === 1 ? 'style' : 'styles'}
        </p>
      </div>

      {collection && (
        <p className="mt-3 font-body text-xs text-slate/80">
          Every style can be upholstered in the{' '}
          {FABRIC_COLLECTIONS.find((c) => c.id === collection)?.label} collection —
          choose your exact colour when you enquire.
        </p>
      )}

      {/* Grid */}
      {beds.length > 0 ? (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beds.map((bed, i) => (
            <AnimateIn key={bed.slug} delay={(i % 3) * 0.08}>
              <CatalogueCard
                name={bed.name}
                href={`/beds/${bed.slug}`}
                image={bed.imagePlaceholder ? getPlaceholderImage('bed', bed.slug) : bed.image}
                eyebrow={`${SIZE_CHARTS[bed.sizeChartByBase.divan ?? 'standard'].label} frame`}
                badge={FULFILMENT_LABELS[bed.fulfilment]}
              />
            </AnimateIn>
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center font-body text-slate">
          No styles match those filters. Try widening your selection.
        </p>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-body text-xs uppercase tracking-widest text-slate">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[12rem] rounded-md border border-cream-border bg-ivory px-3 py-2 font-body text-sm text-charcoal focus:border-sage focus:outline-none"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
