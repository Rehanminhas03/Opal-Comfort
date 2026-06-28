'use client';

import { Check } from 'lucide-react';

type FabricSwatchProps = {
  name: string;
  hex: string;
  collectionLabel: string;
  selected: boolean;
  onSelect: () => void;
};

/**
 * A single colour chip rendered from an approximate hex value. Accessible:
 * real <button> (tab + Space/Enter), aria-pressed for state, visible focus
 * ring, and an aria-label that names the colour and its collection.
 */
export default function FabricSwatch({
  name,
  hex,
  collectionLabel,
  selected,
  onSelect,
}: FabricSwatchProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${name} (${collectionLabel})`}
      title={name}
      className={`relative h-12 w-12 rounded-full ring-1 ring-cream-border transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
        selected ? 'ring-2 ring-gold ring-offset-2' : ''
      }`}
      style={{ backgroundColor: hex }}
    >
      {selected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Check className="h-5 w-5 text-white drop-shadow" strokeWidth={2.5} />
        </span>
      )}
    </button>
  );
}
