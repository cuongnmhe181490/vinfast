"use client";

import { useState } from "react";

export function CarVersionSelector({ versions }: { versions: string[] }) {
  const [selected, setSelected] = useState(versions[0]);

  return (
    <div className="rounded-[28px] border border-line bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-accent-strong">Phiên bản</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {versions.map((version) => (
          <button
            key={version}
            type="button"
            aria-pressed={selected === version}
            onClick={() => setSelected(version)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              selected === version ? "bg-accent-strong text-white" : "bg-surface-soft text-accent-strong"
            }`}
          >
            {version}
          </button>
        ))}
      </div>
    </div>
  );
}
