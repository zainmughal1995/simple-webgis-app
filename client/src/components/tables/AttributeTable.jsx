import React from "react";
import { useSelector } from "react-redux";

export default function AttributeTable() {
  const activeLayerId = useSelector((s) => s.layers.activeLayerId);
  const layers = useSelector((s) => s.layers.items);
  const featuresByLayer = useSelector((s) => s.features.byLayer);

  const layer = layers.find((l) => l.id === activeLayerId);

  if (!layer) return <div className="p-3 text-sm">No active layer</div>;

  const fields = layer.fields || [];
  const features = featuresByLayer[activeLayerId] || [];

  return (
    <table className="min-w-full text-[12px] border-collapse">
      <thead className="bg-[#f5f5f5] sticky top-0">
        <tr>
          {fields.map((f) => (
            <th key={f.name} className="border px-2 py-1 text-left font-medium">
              {f.name}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {features.map((feature, index) => (
          <tr key={index} className="hover:bg-[#eef6ff]">
            {fields.map((f) => (
              <td key={f.name} className="border px-2 py-1">
                {feature.properties?.[f.name] ?? ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
