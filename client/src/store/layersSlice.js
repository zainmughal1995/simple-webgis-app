import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeLayerId: "1",
  items: [
    {
      id: "1",
      name: "Cities",
      geomType: "point",
      visible: true,
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
      symbology: {
        color: "#008000",
        fillColor: "#008000",
        weight: 2,
        fillOpacity: 0.3,
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
  },
});

export const { addLayer, toggleLayer, setActiveLayer } = layersSlice.actions;
export default layersSlice.reducer;
