import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeAttributeTable } from "../../store/uiSlice";
import AttributeTable from "../tables/AttributeTable";

export default function AttributeTablePanel() {
  const dispatch = useDispatch();
  const open = useSelector((s) => s.ui.attributeTableOpen);

  if (!open) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-white border-t border-gray-300 z-[9998] flex flex-col">
      <div className="flex justify-between items-center px-3 py-1 bg-[#f3f3f3] border-b text-sm">
        <span>Attribute Table</span>
        <button
          onClick={() => dispatch(closeAttributeTable())}
          className="text-xs px-2 py-1 bg-gray-200 rounded"
        >
          Close
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        <AttributeTable />
      </div>
    </div>
  );
}
