import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  useMap,
  useMapEvents,
  GeoJSON,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-draw";
import { useSelector, useDispatch } from "react-redux";
import { addFeature } from "../../store/featuresSlice";
import { stopDrawing } from "../../store/uiSlice";
import "leaflet/dist/leaflet.css";

/* ---------------- Basemaps ---------------- */

const BASEMAPS = {
  osm: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "© OpenStreetMap",
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles © Esri",
  },
};

/* ---------------- Resize Handler ---------------- */

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

/* ---------------- Map Events ---------------- */

function MapEvents({ setContextData }) {
  useMapEvents({
    contextmenu(e) {
      e.originalEvent.preventDefault();
      setContextData({
        x: e.originalEvent.clientX,
        y: e.originalEvent.clientY,
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
    click() {
      setContextData(null);
    },
  });
  return null;
}

/* ---------------- Drawing Controller ---------------- */

function DrawingController() {
  const map = useMap();
  const dispatch = useDispatch();

  const activeLayerId = useSelector((s) => s.layers.activeLayerId);
  const layers = useSelector((s) => s.layers.items);
  const editingEnabled = useSelector((s) => s.ui.editingEnabled);
  const drawingMode = useSelector((s) => s.ui.drawingMode);

  const activeLayer = layers.find((l) => l.id === activeLayerId);
  const drawRef = useRef(null);

  useEffect(() => {
    if (!editingEnabled || !drawingMode || !activeLayer) return;

    if (drawRef.current) {
      drawRef.current.disable();
      drawRef.current = null;
    }

    if (activeLayer.geomType === "point") {
      drawRef.current = new L.Draw.Marker(map);
    }

    if (activeLayer.geomType === "line") {
      drawRef.current = new L.Draw.Polyline(map);
    }

    if (activeLayer.geomType === "polygon") {
      drawRef.current = new L.Draw.Polygon(map);
    }

    if (drawRef.current) {
      drawRef.current.enable();
    }

    const onCreated = (e) => {
      const geojson = e.layer.toGeoJSON();

      dispatch(
        addFeature({
          layerId: activeLayerId,
          feature: geojson,
        }),
      );

      map.addLayer(e.layer);
      dispatch(stopDrawing());
    };

    map.on(L.Draw.Event.CREATED, onCreated);

    return () => {
      map.off(L.Draw.Event.CREATED, onCreated);
    };
  }, [editingEnabled, drawingMode, activeLayer, map, dispatch, activeLayerId]);

  return null;
}

/* ---------------- MapView ---------------- */

const MapView = () => {
  const basemap = useSelector((s) => s.map.basemap);
  const featuresByLayer = useSelector((s) => s.features.byLayer);
  const current = BASEMAPS[basemap] || BASEMAPS.osm;

  const [contextData, setContextData] = useState(null);

  const copyCoords = () => {
    if (!contextData) return;

    const text = `${contextData.lat.toFixed(6)}, ${contextData.lng.toFixed(6)}`;

    navigator.clipboard.writeText(text);
    setContextData(null);
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={[30.3753, 69.3451]}
        zoom={6}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          key={basemap}
          url={current.url}
          attribution={current.attribution}
        />

        <ZoomControl position="bottomright" />
        <ResizeHandler />
        <MapEvents setContextData={setContextData} />
        <DrawingController />

        {/* Render Stored Features */}
        {Object.entries(featuresByLayer).map(([layerId, features]) =>
          features.map((feature, index) => (
            <GeoJSON key={`${layerId}-${index}`} data={feature} />
          )),
        )}
      </MapContainer>

      {contextData && (
        <div
          className="fixed bg-white border border-gray-300 shadow-md text-[12px] z-[9999]"
          style={{
            top: contextData.y,
            left: contextData.x,
          }}
        >
          <div
            onClick={copyCoords}
            className="px-3 py-1 hover:bg-[#e6e6e6] cursor-pointer"
          >
            Copy Coordinate
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
