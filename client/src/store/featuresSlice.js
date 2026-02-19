import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byLayer: {}, // { layerId: [geojson, geojson] }
};

const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {
    addFeature: (state, action) => {
      const { layerId, feature } = action.payload;

      if (!state.byLayer[layerId]) {
        state.byLayer[layerId] = [];
      }

      state.byLayer[layerId].push(feature);
    },

    setLayerFeatures: (state, action) => {
      const { layerId, features } = action.payload;
      state.byLayer[layerId] = features;
    },
  },
});

export const { addFeature, setLayerFeatures } = featuresSlice.actions;
export default featuresSlice.reducer;
