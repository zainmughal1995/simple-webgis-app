import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleLayer, setActiveLayer } from "../../../store/layersSlice";

/* ---------------- Layer Icon ---------------- */

function LayerIcon({ type }) {
  if (type === "point")
    return <div className="w-3 h-3 rounded-full bg-red-500" />;
  if (type === "line") return <div className="w-4 h-[2px] bg-blue-500" />;
  if (type === "polygon") return <div className="w-3 h-3 bg-green-600" />;
  return null;
}

/* ---------------- Menu Components ---------------- */

function MenuItem({ label }) {
  return (
    <div className="px-3 py-1 hover:bg-[#e6e6e6] cursor-pointer whitespace-nowrap">
      {label}
    </div>
  );
}

function Divider() {
  return <div className="border-t border-gray-300 my-1" />;
}

/* ---------------- LayersPanel ---------------- */

export default function LayersPanel() {
  const { items: layers, activeLayerId } = useSelector((s) => s.layers);
  const dispatch = useDispatch();

  const [contextMenu, setContextMenu] = useState(null);
  const menuRef = useRef(null);

  const handleContextMenu = (e, layer) => {
    e.preventDefault();

    dispatch(setActiveLayer(layer.id));

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      layer,
    });
  };

  const closeMenu = () => setContextMenu(null);

  /* ---------- Prevent Overflow ---------- */

  useEffect(() => {
    if (!contextMenu || !menuRef.current) return;

    const rect = menuRef.current.getBoundingClientRect();

    let newX = contextMenu.x;
    let newY = contextMenu.y;

    if (rect.right > window.innerWidth) {
      newX = window.innerWidth - rect.width - 5;
    }

    if (rect.bottom > window.innerHeight) {
      newY = window.innerHeight - rect.height - 5;
    }

    if (newX !== contextMenu.x || newY !== contextMenu.y) {
      setContextMenu((prev) => ({
        ...prev,
        x: newX,
        y: newY,
      }));
    }
  }, [contextMenu]);

  return (
    <div
      className="relative flex-1 bg-[#f8f8f8] text-[12px]"
      onClick={closeMenu}
    >
      {layers.map((l) => {
        const isActive = l.id === activeLayerId;

        return (
          <div
            key={l.id}
            onClick={() => dispatch(setActiveLayer(l.id))}
            onContextMenu={(e) => handleContextMenu(e, l)}
            className={`flex items-center gap-2 px-2 py-[3px] cursor-pointer
              ${isActive ? "bg-[#c9e6ff]" : "hover:bg-[#dcdcdc]"}`}
          >
            <input
              type="checkbox"
              checked={l.visible}
              onChange={() => dispatch(toggleLayer(l.id))}
              onClick={(e) => e.stopPropagation()}
            />

            <LayerIcon type={l.geomType} />
            <span>{l.name}</span>
          </div>
        );
      })}

      {/* ---------- Context Menu ---------- */}

      {contextMenu && (
        <div
          ref={menuRef}
          className="fixed bg-white border border-gray-300 shadow-md text-[12px] z-[9999] min-w-[220px]"
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
          }}
        >
          <MenuItem label="Zoom to Layer(s)" />
          <MenuItem label="Show in Overview" />
          <MenuItem label="Copy Layer" />
          <MenuItem label="Rename Layer" />
          <MenuItem label="Zoom to Native Resolution (100%)" />
          <MenuItem label="Stretch Using Current Extent" />
          <MenuItem label="Load Raster Attribute Table from VAT.DBF" />

          <Divider />

          <MenuItem label="Duplicate Layer" />
          <MenuItem label="Remove Layer..." />
          <MenuItem label="Change Data Source..." />

          <Divider />

          <MenuItem label="Set Layer Scale Visibility..." />
          <MenuItem label="Layer CRS ▶" />
          <MenuItem label="Export ▶" />
          <MenuItem label="Styles ▶" />
          <MenuItem label="Add Layer Notes..." />
          <MenuItem label="Properties..." />
        </div>
      )}
    </div>
  );
}
