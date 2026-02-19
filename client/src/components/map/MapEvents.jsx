// MapEvents.jsx
import { useMapEvents } from "react-leaflet";

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

export default MapEvents;
