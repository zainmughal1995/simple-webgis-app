import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    name: "Cities",
    geomType: "point",
    visible: true,
  },
  {
    id: "2",
    name: "Road Network",
    geomType: "line",
    visible: true,
  },
  {
    id: "3",
    name: "District Boundaries",
    geomType: "polygon",
    visible: false,
  },
];

const layersSlice = createSlice({
  name: "layers",
  initialState,

  reducers: {
    addLayer: (state, action) => {
      state.push(action.payload);
    },

    toggleLayer: (state, action) => {
      const layer = state.find((l) => l.id === action.payload);
      if (layer) {
        layer.visible = !layer.visible;
      }
    },
  },
});

export const { addLayer, toggleLayer } = layersSlice.actions;
export default layersSlice.reducer;
