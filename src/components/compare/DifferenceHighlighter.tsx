"use client";

type DifferenceHighlighterProps = {
  enabled: boolean;
  onChange: (value: boolean) => void;
};

export function DifferenceHighlighter({ enabled, onChange }: DifferenceHighlighterProps) {
  return (
    <label className="inline-flex items-center gap-3 rounded-full border border-line bg-white px-4 py-3 text-sm font-semibold text-accent-strong">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-accent"
      />
      Chỉ hiện điểm khác nhau
    </label>
  );
}
