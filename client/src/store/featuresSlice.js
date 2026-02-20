import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byLayer: {}, // { layerId: [geojson, geojson] }
  selected: {}, // { layerId: [featureIndex, featureIndex] }
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

    setSelectedFeatures: (state, action) => {
      const { layerId, indices } = action.payload;
      state.selected[layerId] = indices;
    },

    clearAllSelections: (state) => {
      state.selected = {};
    },

    setFeaturesState: (state, action) => {
      return action.payload;
    },

    resetFeatures: () => initialState,
  },
});

export const {
  resetFeatures,
  addFeature,
  setLayerFeatures,
  setSelectedFeatures,
  clearAllSelections,
  setFeaturesState,
} = featuresSlice.actions;

export default featuresSlice.reducer;
