'use client';

import { FABRIC_COLLECTIONS } from '@/lib/catalogue';
import FabricSwatch from './FabricSwatch';

export type SelectedFabric = {
  collectionId: string;
  collectionLabel: string;
  name: string;
  hex: string;
};

/** Stable identity for a colour across collections. */
const keyOf = (f: SelectedFabric) => `${f.collectionId}:${f.name}`;

type FabricPickerProps =
  | {
      mode: 'single';
      value: SelectedFabric | null;
      onChange: (value: SelectedFabric | null) => void;
      max?: never;
    }
  | {
      mode: 'multi';
      value: SelectedFabric[];
      onChange: (value: SelectedFabric[]) => void;
      max?: number;
    };

/**
 * Fabric selector grouped by collection. Reused by the bed/sofa configurators
 * (single), the bespoke form (single direction), and the sample form (multi,
 * capped by `max`). Colours come from FABRIC_COLLECTIONS — never hardcoded.
 */
export default function FabricPicker(props: FabricPickerProps) {
  const selectedKeys = new Set<string>(
    props.mode === 'single'
      ? props.value
        ? [keyOf(props.value)]
        : []
      : props.value.map(keyOf),
  );

  const atLimit =
    props.mode === 'multi' &&
    typeof props.max === 'number' &&
    props.value.length >= props.max;

  const toggle = (fabric: SelectedFabric) => {
    if (props.mode === 'single') {
      const isSame = props.value && keyOf(props.value) === keyOf(fabric);
      props.onChange(isSame ? null : fabric);
      return;
    }
    const exists = selectedKeys.has(keyOf(fabric));
    if (exists) {
      props.onChange(props.value.filter((f) => keyOf(f) !== keyOf(fabric)));
    } else if (!atLimit) {
      props.onChange([...props.value, fabric]);
    }
  };

  return (
    <div className="space-y-8">
      {FABRIC_COLLECTIONS.map((collection) => (
        <div key={collection.id}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="font-display text-lg text-charcoal">{collection.label}</h4>
            <p className="font-body text-xs text-slate/80">{collection.texture}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {collection.colours.map((colour) => {
              const fabric: SelectedFabric = {
                collectionId: collection.id,
                collectionLabel: collection.label,
                name: colour.name,
                hex: colour.hex,
              };
              const isSelected = selectedKeys.has(keyOf(fabric));
              // In multi mode at the limit, only already-selected chips stay tappable.
              const disabled = !isSelected && atLimit;
              return (
                <span key={colour.name} className={disabled ? 'opacity-40' : ''}>
                  <FabricSwatch
                    name={colour.name}
                    hex={colour.hex}
                    collectionLabel={collection.label}
                    selected={isSelected}
                    onSelect={() => !disabled && toggle(fabric)}
                  />
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
