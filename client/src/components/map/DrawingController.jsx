// DrawingController.jsx
import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw";
import { useSelector, useDispatch } from "react-redux";
import {
  addFeature,
  setLayerFeatures,
  setSelectedFeatures,
} from "../../store/featuresSlice";
import { stopDrawing, clearSaveRequest } from "../../store/uiSlice";

function DrawingController() {
  const map = useMap();
  const dispatch = useDispatch();

  const activeLayerId = useSelector((s) => s.layers.activeLayerId);
  const layers = useSelector((s) => s.layers.items);
  const featuresByLayer = useSelector((s) => s.features.byLayer);
  const editingEnabled = useSelector((s) => s.ui.editingEnabled);
  const drawingMode = useSelector((s) => s.ui.drawingMode);
  const activeTool = useSelector((s) => s.ui.activeTool);
  const saveRequested = useSelector((s) => s.ui.saveRequested);

  const activeLayer = layers.find((l) => l.id === activeLayerId);

  const drawRef = useRef(null);
  const editableGroup = useRef(new L.FeatureGroup());
  const editHandler = useRef(null);

  /* ---------- INIT EDIT GROUP ---------- */

  useEffect(() => {
    map.addLayer(editableGroup.current);
  }, [map]);

  /* ---------- SYNC ACTIVE LAYER ---------- */

  useEffect(() => {
    if (editHandler.current) {
      try {
        editHandler.current.disable();
      } catch {}
      editHandler.current = null;
    }

    editableGroup.current.clearLayers();

    if (!featuresByLayer[activeLayerId]) return;

    featuresByLayer[activeLayerId].forEach((feature) => {
      const geoLayer = L.geoJSON(feature, {
        style: () => {
          const sym = activeLayer.symbology;

          if (activeLayer.geomType === "polygon") {
            return {
              color: sym.color,
              fillColor: sym.fillColor,
              weight: sym.weight || 2,
              fillOpacity: sym.fillOpacity ?? 0.3,
            };
          }

          if (activeLayer.geomType === "line") {
            return {
              color: sym.color,
              weight: sym.weight || 2,
            };
          }

          return {};
        },

        pointToLayer: (geoJsonPoint, latlng) => {
          const sym = activeLayer.symbology;

          return L.circleMarker(latlng, {
            radius: sym.radius || 4,
            color: sym.color,
            weight: sym.weight || 2,
            fillColor: sym.fillColor || sym.color,
            fillOpacity: 1,
          });
        },
      });

      geoLayer.eachLayer((layer) => {
        editableGroup.current.addLayer(layer);
      });
    });

    // featuresByLayer[activeLayerId].forEach((feature) => {
    //   const geoLayer = L.geoJSON(feature);
    //   geoLayer.eachLayer((layer) => {
    //     editableGroup.current.addLayer(layer);
    //   });
    // });
  }, [activeLayerId, featuresByLayer]);

  /* ---------- DRAW TOOL ---------- */

  useEffect(() => {
    if (!editingEnabled || !drawingMode || !activeLayer) return;

    if (activeLayer.geomType === "point") {
      const sym = activeLayer.symbology;

      drawRef.current = new L.Draw.Marker(map, {
        icon: L.divIcon({
          className: "",
          html: `<div style="
        width:${(sym.radius || 5) * 2}px;
        height:${(sym.radius || 5) * 2}px;
        background:${sym.fillColor || sym.color};
        border-radius:50%;
        border:${sym.weight || 2}px solid ${sym.color};
      "></div>`,
          iconSize: [(sym.radius || 5) * 2, (sym.radius || 5) * 2],
          iconAnchor: [sym.radius || 5, sym.radius || 5],
        }),
      });
    }

    if (activeLayer.geomType === "line")
      drawRef.current = new L.Draw.Polyline(map);
    if (activeLayer.geomType === "polygon")
      drawRef.current = new L.Draw.Polygon(map);

    drawRef.current?.enable();

    const onCreated = (e) => {
      dispatch(
        addFeature({
          layerId: activeLayerId,
          feature: e.layer.toGeoJSON(),
        }),
      );
      dispatch(stopDrawing());
    };

    map.on(L.Draw.Event.CREATED, onCreated);

    return () => {
      map.off(L.Draw.Event.CREATED, onCreated);
    };
  }, [editingEnabled, drawingMode, activeLayer]);

  /* ---------- VERTEX TOOL (RESTORED) ---------- */

  useEffect(() => {
    if (!editingEnabled || activeTool !== "vertex") {
      map.dragging.enable();
      map.boxZoom.enable();
      return;
    }

    editHandler.current = new L.EditToolbar.Edit(map, {
      featureGroup: editableGroup.current,
    });

    editHandler.current.enable();

    map.dragging.disable();
    map.boxZoom.disable();

    let startLatLng = null;
    let box = null;

    const onMouseDown = (e) => {
      startLatLng = e.latlng;
    };

    const onMouseMove = (e) => {
      if (!startLatLng) return;

      if (!box) {
        box = L.rectangle(L.latLngBounds(startLatLng, e.latlng), {
          color: "red",
          weight: 1,
          fillOpacity: 0.1,
        }).addTo(map);
      } else {
        box.setBounds(L.latLngBounds(startLatLng, e.latlng));
      }
    };

    const onMouseUp = (e) => {
      if (!startLatLng) return;

      const bounds = L.latLngBounds(startLatLng, e.latlng);

      editableGroup.current.eachLayer((layer) => {
        if (!layer.editing || !layer.editing._markers) return;

        layer.editing._markers.forEach((marker) => {
          if (marker._icon) {
            marker._icon.style.backgroundColor = "";
          }

          if (bounds.contains(marker.getLatLng())) {
            if (marker._icon) {
              marker._icon.style.backgroundColor = "yellow";
            }
          }
        });
      });

      if (box) {
        map.removeLayer(box);
        box = null;
      }

      startLatLng = null;
    };

    map.on("mousedown", onMouseDown);
    map.on("mousemove", onMouseMove);
    map.on("mouseup", onMouseUp);

    return () => {
      map.dragging.enable();
      map.boxZoom.enable();

      if (editHandler.current) {
        try {
          editHandler.current.disable();
        } catch {}
        editHandler.current = null;
      }

      map.off("mousedown", onMouseDown);
      map.off("mousemove", onMouseMove);
      map.off("mouseup", onMouseUp);
    };
  }, [editingEnabled, activeTool, map]);

  /* ---------- SELECTION TOOL ---------- */

  useEffect(() => {
    if (activeTool !== "select") {
      map.dragging.enable();
      return;
    }

    map.dragging.disable();

    let startLatLng = null;
    let box = null;

    const onMouseDown = (e) => {
      startLatLng = e.latlng;
    };

    const onMouseMove = (e) => {
      if (!startLatLng) return;

      if (!box) {
        box = L.rectangle(L.latLngBounds(startLatLng, e.latlng), {
          color: "blue",
          weight: 1,
          fillOpacity: 0.1,
        }).addTo(map);
      } else {
        box.setBounds(L.latLngBounds(startLatLng, e.latlng));
      }
    };

    const onMouseUp = (e) => {
      if (!startLatLng) return;

      const bounds = L.latLngBounds(startLatLng, e.latlng);
      const selectedIndices = [];

      if (featuresByLayer[activeLayerId]) {
        featuresByLayer[activeLayerId].forEach((feature, index) => {
          const layer = L.geoJSON(feature);
          let intersects = false;

          layer.eachLayer((l) => {
            if (l.getBounds && bounds.intersects(l.getBounds()))
              intersects = true;
            if (l.getLatLng && bounds.contains(l.getLatLng()))
              intersects = true;
          });

          if (intersects) selectedIndices.push(index);
        });
      }

      dispatch(
        setSelectedFeatures({
          layerId: activeLayerId,
          indices: selectedIndices,
        }),
      );

      if (box) {
        map.removeLayer(box);
        box = null;
      }

      startLatLng = null;
    };

    map.on("mousedown", onMouseDown);
    map.on("mousemove", onMouseMove);
    map.on("mouseup", onMouseUp);

    return () => {
      map.dragging.enable();
      map.off("mousedown", onMouseDown);
      map.off("mousemove", onMouseMove);
      map.off("mouseup", onMouseUp);
    };
  }, [activeTool, featuresByLayer, activeLayerId, map, dispatch]);

  /* ---------- SAVE ---------- */

  useEffect(() => {
    if (!saveRequested) return;

    const updated = [];

    editableGroup.current.eachLayer((layer) => {
      updated.push(layer.toGeoJSON());
    });

    if (editHandler.current) {
      try {
        editHandler.current.disable();
      } catch {}
      editHandler.current = null;
    }

    dispatch(
      setLayerFeatures({
        layerId: activeLayerId,
        features: updated,
      }),
    );

    dispatch(clearSaveRequest());
  }, [saveRequested, dispatch, activeLayerId]);

  return null;
}

export default DrawingController;
