// MapView.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, ZoomControl, GeoJSON } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { BASEMAPS } from "./Basemaps";
import ResizeHandler from "./ResizeHandler";
import MapEvents from "./MapEvents";
import DrawingController from "./DrawingController";

// ✅ NEW IMPORT (project sync only)
import { updateProjectLayers } from "../../store/projectSlice";

const MapView = () => {
  const dispatch = useDispatch(); // ✅ NEW
  const basemap = useSelector((s) => s.map.basemap);
  const { items: layers, activeLayerId } = useSelector((s) => s.layers);
  const featuresByLayer = useSelector((s) => s.features.byLayer);
  const activeTool = useSelector((s) => s.ui.activeTool);
  const selected = useSelector((s) => s.features.selected);

  // ✅ NEW
  const currentProject = useSelector((s) => s.project.currentProject);

  const current = BASEMAPS[basemap] || BASEMAPS.osm;
  const [contextData, setContextData] = useState(null);

  const getLayerById = (id) => layers.find((l) => l.id === id);

  const copyCoords = () => {
    if (!contextData) return;
    const text = `${contextData.lat.toFixed(6)}, ${contextData.lng.toFixed(6)}`;
    navigator.clipboard.writeText(text);
    setContextData(null);
  };

  useEffect(() => {
    if (!currentProject) return;

    const existing = currentProject.layers;

    const snapshot = {
      layers,
      featuresByLayer,
    };

    if (JSON.stringify(existing) !== JSON.stringify(snapshot)) {
      dispatch(updateProjectLayers(snapshot));
    }
  }, [layers, featuresByLayer, currentProject, dispatch]);

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

        {Object.entries(featuresByLayer).map(([layerId, features]) => {
          const layerConfig = getLayerById(layerId);
          if (!layerConfig || !layerConfig.visible) return null;
          if (layerId === activeLayerId && activeTool === "vertex") return null;

          const sym = layerConfig.symbology;

          return features.map((feature, index) => {
            const isSelected = selected[layerId]?.includes(index);

            return (
              <GeoJSON
                key={`${layerId}-${index}`}
                data={feature}
                pointToLayer={(feature, latlng) => {
                  if (layerConfig.geomType !== "point") {
                    return L.circleMarker(latlng, {
                      radius: 0,
                      opacity: 0,
                      fillOpacity: 0,
                    });
                  }

                  return L.circleMarker(latlng, {
                    radius: sym.radius || 4,
                    color: isSelected ? "yellow" : sym.color,
                    weight: sym.weight || 2,
                    fillColor: isSelected
                      ? "yellow"
                      : sym.fillColor || sym.color,
                    fillOpacity: 1,
                  });
                }}
                style={() => {
                  if (layerConfig.geomType === "line") {
                    return {
                      color: isSelected ? "yellow" : sym.color,
                      weight: sym.weight || 2,
                    };
                  }

                  if (layerConfig.geomType === "polygon") {
                    return {
                      color: isSelected ? "yellow" : sym.color,
                      fillColor: isSelected ? "yellow" : sym.fillColor,
                      weight: sym.weight || 2,
                      fillOpacity: sym.fillOpacity ?? 0.3,
                    };
                  }

                  return {};
                }}
              />
            );
          });
        })}
      </MapContainer>

      {contextData && (
        <div
          className="fixed bg-white border border-gray-300 shadow-md text-[12px] z-[9999]"
          style={{ top: contextData.y, left: contextData.x }}
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
