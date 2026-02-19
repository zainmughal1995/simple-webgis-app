import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleEditing,
  startDrawing,
  stopDrawing,
  setActiveTool,
  requestSaveEdits,
} from "../../../store/uiSlice";
import ToolButton from "../../common/ToolButton";

import toggleEditingIcon from "../../../assets/icons/toolbar_digitization/toggle_editing.png";
import saveEditsIcon from "../../../assets/icons/toolbar_digitization/save_edits.png";
import vertexToolIcon from "../../../assets/icons/toolbar_digitization/vertex_tool.png";
import cutFeaturesIcon from "../../../assets/icons/toolbar_digitization/cut_features.png";

// Dynamic Icons:
import addPointIcon from "../../../assets/icons/toolbar_digitization/add_point.png";
import addLineIcon from "../../../assets/icons/toolbar_digitization/add_line.png";
import addPolygonIcon from "../../../assets/icons/toolbar_digitization/add_polygon.png";
import deleteSelectedIcon from "../../../assets/icons/toolbar_digitization/delete_selected.png";
import copyFeaturesIcon from "../../../assets/icons/toolbar_digitization/copy_features.png";
import pasteFeaturesIcon from "../../../assets/icons/toolbar_digitization/paste_features.png";
import redoIcon from "../../../assets/icons/toolbar_digitization/redo.png";
import undoIcon from "../../../assets/icons/toolbar_digitization/undo.png";

const ICONS = {
  enable: toggleEditingIcon,
  save: saveEditsIcon,
  vertex: vertexToolIcon,
  delete: deleteSelectedIcon,
  cut: cutFeaturesIcon,
  copy: copyFeaturesIcon,
  paste: pasteFeaturesIcon,
  undo: undoIcon,
  redo: redoIcon,
};

const DigitizationToolbar = () => {
  const dispatch = useDispatch();

  const { activeLayerId, items } = useSelector((s) => s.layers);
  const editingEnabled = useSelector((s) => s.ui.editingEnabled);
  const drawingMode = useSelector((s) => s.ui.drawingMode);
  const activeTool = useSelector((s) => s.ui.activeTool);
  const noLayer = !activeLayerId;
  const disabled = noLayer || !editingEnabled;

  const activeLayer = items.find((l) => l.id === activeLayerId);

  // 🔥 Dynamic icon selection
  let addIcon = null;
  let addTooltip = "Add Feature";

  if (activeLayer?.geomType === "point") {
    addIcon = addPointIcon;
    addTooltip = "Add Point Feature";
  }

  if (activeLayer?.geomType === "line") {
    addIcon = addLineIcon;
    addTooltip = "Add Line Feature";
  }

  if (activeLayer?.geomType === "polygon") {
    addIcon = addPolygonIcon;
    addTooltip = "Add Polygon Feature";
  }

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
        onClick={() => dispatch(requestSaveEdits())}
      />

      {/* Add Feature */}
      <ToolButton
        icon={addIcon}
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
        active={activeTool === "vertex"}
        onClick={() =>
          dispatch(
            activeTool === "vertex"
              ? setActiveTool(null)
              : setActiveTool("vertex"),
          )
        }
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
