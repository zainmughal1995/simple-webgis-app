import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleEditing,
  startDrawing,
  stopDrawing,
} from "../../../store/uiSlice";
import ToolButton from "../../common/ToolButton";

const ICONS = {
  enable: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/power.svg",
  save: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/save.svg",
  create:
    "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/plus-square.svg",
  vertex:
    "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/pen-tool.svg",
  delete: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/trash-2.svg",
  cut: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/scissors.svg",
  copy: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/copy.svg",
  paste:
    "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/clipboard.svg",
  undo: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/undo-2.svg",
  redo: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/redo-2.svg",
};

const DigitizationToolbar = () => {
  const dispatch = useDispatch();

  const activeLayerId = useSelector((s) => s.layers.activeLayerId);
  const editingEnabled = useSelector((s) => s.ui.editingEnabled);
  const drawingMode = useSelector((s) => s.ui.drawingMode);

  const noLayer = !activeLayerId;
  const disabled = noLayer || !editingEnabled;

  return (
    <div className="flex items-center px-2 py-1 border-b border-gray-200 gap-1">
      {/* Toggle Editing */}
      <ToolButton
        icon={ICONS.enable}
        tooltip="Toggle Editing"
        disabled={noLayer}
        active={editingEnabled}
        onClick={() => dispatch(toggleEditing())}
      />

      {/* Save Layer Edits */}
      <ToolButton
        icon={ICONS.save}
        tooltip="Save Layer Edits"
        disabled={disabled}
      />

      {/* Add Feature */}
      <ToolButton
        icon={ICONS.create}
        tooltip="Add Feature"
        disabled={disabled}
        active={drawingMode}
        onClick={() => dispatch(drawingMode ? stopDrawing() : startDrawing())}
      />

      {/* Vertex Tool */}
      <ToolButton
        icon={ICONS.vertex}
        tooltip="Vertex Tool"
        disabled={disabled}
      />

      {/* Delete Selected */}
      <ToolButton
        icon={ICONS.delete}
        tooltip="Delete Selected"
        disabled={disabled}
      />

      {/* Cut Features */}
      <ToolButton icon={ICONS.cut} tooltip="Cut Features" disabled={disabled} />

      {/* Copy Features */}
      <ToolButton
        icon={ICONS.copy}
        tooltip="Copy Features"
        disabled={disabled}
      />

      {/* Paste Features */}
      <ToolButton
        icon={ICONS.paste}
        tooltip="Paste Features"
        disabled={disabled}
      />

      {/* Undo */}
      <ToolButton icon={ICONS.undo} tooltip="Undo" disabled={disabled} />

      {/* Redo */}
      <ToolButton icon={ICONS.redo} tooltip="Redo" disabled={disabled} />
    </div>
  );
};

export default DigitizationToolbar;
