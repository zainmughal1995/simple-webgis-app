// src/components/toolbars/digitization/DigitizationToolbar.jsx
import React from "react";
import ToolButton from "../../common/ToolButton";

const ICONS = {
  enable: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/power.svg",
  create:
    "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/plus-square.svg",
  move: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/move.svg",
  edit: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/pencil.svg",
  delete: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/trash-2.svg",
};

const DigitizationToolbar = () => {
  return (
    <div className="flex items-center px-2 py-1 border-b border-gray-200 gap-1">
      <ToolButton icon={ICONS.enable} tooltip="Enable Editing" />
      <ToolButton icon={ICONS.create} tooltip="Create Feature" />
      <ToolButton icon={ICONS.move} tooltip="Move Feature" />
      <ToolButton icon={ICONS.edit} tooltip="Edit Feature" />
      <ToolButton icon={ICONS.delete} tooltip="Delete Feature" />
    </div>
  );
};

export default DigitizationToolbar;
