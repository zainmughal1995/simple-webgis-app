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
  create:
    "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/plus-square.svg",
  move: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/move.svg",
  edit: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/pencil.svg",
  delete: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/trash-2.svg",
};

const DigitizationToolbar = () => {
  const dispatch = useDispatch();

  const activeLayerId = useSelector((s) => s.layers.activeLayerId);
  const editingEnabled = useSelector((s) => s.ui.editingEnabled);
  const drawingMode = useSelector((s) => s.ui.drawingMode);

  const noLayer = !activeLayerId;

  return (
    <div className="flex items-center px-2 py-1 border-b border-gray-200 gap-1">
      <ToolButton
        icon={ICONS.enable}
        tooltip="Enable Editing"
        disabled={noLayer}
        active={editingEnabled}
        onClick={() => dispatch(toggleEditing())}
      />

      <ToolButton
        icon={ICONS.create}
        tooltip="Create Feature"
        disabled={noLayer || !editingEnabled}
        active={drawingMode}
        onClick={() => dispatch(drawingMode ? stopDrawing() : startDrawing())}
      />

      <ToolButton
        icon={ICONS.move}
        tooltip="Move Feature"
        disabled={noLayer || !editingEnabled}
      />
      <ToolButton
        icon={ICONS.edit}
        tooltip="Edit Feature"
        disabled={noLayer || !editingEnabled}
      />
      <ToolButton
        icon={ICONS.delete}
        tooltip="Delete Feature"
        disabled={noLayer || !editingEnabled}
      />
    </div>
  );
};

export default DigitizationToolbar;
