// ResizeHandler.jsx
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useSelector } from "react-redux";

function ResizeHandler() {
  const map = useMap();
  const rightPanelVisible = useSelector((s) => s.panels.panels.rightPanel);
  const leftWidth = useSelector((s) => s.layout.leftPanelWidth);

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize({ debounceMoveend: true });
    }, 50);
    return () => clearTimeout(timer);
  }, [rightPanelVisible, leftWidth, map]);

  return null;
}

export default ResizeHandler;
