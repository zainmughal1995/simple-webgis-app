import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeLayerId: "1",
  items: [
    {
      id: "1",
      name: "Cities",
      geomType: "point",
      visible: true,

      // ✅ NEW — Field schema for Attribute Table
      fields: [
        { name: "id", type: "number" },
        { name: "name", type: "string" },
        { name: "population", type: "number" },
        { name: "province", type: "string" },
      ],

      symbology: {
        color: "#ff0000",
        fillColor: "#ff0000",
        weight: 2,
        radius: 5,
      },
    },
    {
      id: "2",
      name: "Road Network",
      geomType: "line",
      visible: true,

      fields: [
        { name: "id", type: "number" },
        { name: "name", type: "string" },
        { name: "type", type: "string" },
        { name: "length_km", type: "number" },
      ],

      symbology: {
        color: "#0000ff",
        weight: 3,
      },
    },
    {
      id: "3",
      name: "District Boundaries",
      geomType: "polygon",
      visible: false,

      fields: [
        { name: "id", type: "number" },
        { name: "name", type: "string" },
        { name: "area_sqkm", type: "number" },
        { name: "province", type: "string" },
      ],

      symbology: {
        color: "#008000",
        fillColor: "#008000",
        weight: 2,
        fillOpacity: 0.5,
      },
    },
  ],
};

const layersSlice = createSlice({
  name: "layers",
  initialState,

  reducers: {
    addLayer: (state, action) => {
      state.items.push(action.payload);
    },

    toggleLayer: (state, action) => {
      const layer = state.items.find((l) => l.id === action.payload);
      if (layer) {
        layer.visible = !layer.visible;
      }
    },
    setActiveLayer: (state, action) => {
      state.activeLayerId = action.payload;
    },

    setLayersState: (state, action) => {
      return action.payload;
    },

    resetLayers: () => initialState,
  },
});

export const {
  addLayer,
  toggleLayer,
  setActiveLayer,
  setLayersState,
  resetLayers,
} = layersSlice.actions;
export default layersSlice.reducer;
