import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTool } from "../../../store/uiSlice";
import { clearAllSelections } from "../../../store/featuresSlice";
import ToolButton from "../../common/ToolButton";

const ICONS = {
  selectClick:
    "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/mouse-pointer.svg",
  selectByValue:
    "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/filter.svg",
  deselectAll:
    "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/x-circle.svg",
  selectByLocation:
    "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/map-pin.svg",
};

const SelectionToolbar = () => {
  const dispatch = useDispatch();
  const activeTool = useSelector((s) => s.ui.activeTool);
  const activeLayerId = useSelector((s) => s.layers.activeLayerId);

  const noLayer = !activeLayerId;

  return (
    <div className="flex items-center px-2 py-1 border-b border-gray-200 gap-1">
      <ToolButton
        icon={ICONS.selectClick}
        tooltip="Select Feature by Area or Single Click"
        disabled={noLayer}
        active={activeTool === "select"}
        onClick={() =>
          dispatch(
            activeTool === "select"
              ? setActiveTool(null)
              : setActiveTool("select"),
          )
        }
      />

      <ToolButton
        icon={ICONS.selectByValue}
        tooltip="Select Feature by Value"
        disabled={noLayer}
      />

      <ToolButton
        icon={ICONS.deselectAll}
        tooltip="Deselect Features from All Layers"
        onClick={() => dispatch(clearAllSelections())}
      />

      <ToolButton
        icon={ICONS.selectByLocation}
        tooltip="Select by Location"
        disabled={noLayer}
      />
    </div>
  );
};

export default SelectionToolbar;
