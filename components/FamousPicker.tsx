'use client';
import { FAMOUS_PERSONS, type FamousPerson } from '@/lib/ziwei/famous';
import type { BirthFormState } from './BirthForm';

interface FamousPickerProps {
  onSelect: (data: Partial<BirthFormState>) => void;
}

export default function FamousPicker({ onSelect }: FamousPickerProps) {
  const handlePick = (p: FamousPerson) => {
    // 0 -> 23:00(子), 1 -> 01:00(丑), 2 -> 03:00(寅), etc.
    // hour index to approximate clockHour:
    const clockHours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
    onSelect({
      name: p.name,
      year: String(p.year),
      month: String(p.month),
      day: String(p.day),
      clockHour: String(clockHours[p.hour] ?? 8),
      clockMinute: '0',
      unknownTime: false,
      gender: p.gender,
      province: '北京',
      city: '北京',
      longitude: 116.4,
    });
  };

  return (
    <div className="flex items-center gap-2 flex-wrap text-xs">
      <span className="text-neutral-500 font-medium">快速体验经典命造：</span>
      {FAMOUS_PERSONS.slice(0, 8).map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => handlePick(p)}
          className="px-2.5 py-1 rounded border border-neutral-700/60 hover:border-amber-500/80 bg-neutral-800/40 hover:bg-amber-500/10 text-neutral-300 hover:text-amber-400 text-[11px] transition-all"
        >
          {p.name}
          <span className="text-[10px] text-neutral-500 ml-1">({p.category})</span>
        </button>
      ))}
    </div>
  );
}
