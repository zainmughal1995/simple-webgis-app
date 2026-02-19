import React from "react";
import { useSelector } from "react-redux";
import ToolButton from "../../common/ToolButton";

const ICONS = {
  identify:
    "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/crosshair.svg",
  fieldCalc:
    "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/calculator.svg",
  toolbox: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/tool.svg",
  stats:
    "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/bar-chart-3.svg",
  attributeTable:
    "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/table.svg",
  measure: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/ruler.svg",
  mapTips: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/info.svg",
  featureAction:
    "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/play.svg",
};

const AnalysisToolbar = () => {
  const activeLayerId = useSelector((s) => s.layers.activeLayerId);
  const editingEnabled = useSelector((s) => s.ui.editingEnabled);

  const noLayer = !activeLayerId;

  return (
    <div className="flex items-center px-2 py-1 border-b border-gray-200 gap-1">
      <ToolButton
        icon={ICONS.identify}
        tooltip="Identify Features"
        disabled={noLayer}
      />

      <ToolButton
        icon={ICONS.fieldCalc}
        tooltip="Open Field Calculator"
        disabled={noLayer}
      />

      <ToolButton icon={ICONS.toolbox} tooltip="Toolbox" />

      <ToolButton
        icon={ICONS.stats}
        tooltip="Show Statistical Summary"
        disabled={noLayer}
      />

      <ToolButton
        icon={ICONS.attributeTable}
        tooltip="Open Attribute Table"
        disabled={noLayer}
      />

      <ToolButton icon={ICONS.measure} tooltip="Measure Line" />

      <ToolButton icon={ICONS.mapTips} tooltip="Show Map Tips" />

      <ToolButton
        icon={ICONS.featureAction}
        tooltip="Run Feature Action"
        disabled={noLayer || !editingEnabled}
      />
    </div>
  );
};

export default AnalysisToolbar;
