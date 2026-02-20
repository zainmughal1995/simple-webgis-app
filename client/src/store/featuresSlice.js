import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byLayer: {
    1: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [67.0011, 24.8607],
        },
        properties: {
          id: 1,
          name: "Karachi",
          population: 14910000,
          province: "Sindh",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [74.3587, 31.5204],
        },
        properties: {
          id: 2,
          name: "Lahore",
          population: 11126000,
          province: "Punjab",
        },
      },
    ],

    2: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [73.0479, 33.6844],
            [74.3587, 31.5204],
          ],
        },
        properties: {
          id: 1,
          name: "M2 Motorway",
          type: "Motorway",
          length_km: 375,
        },
      },
    ],

    3: [
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [67.0, 24.8],
              [67.2, 24.8],
              [67.2, 25.0],
              [67.0, 25.0],
              [67.0, 24.8],
            ],
          ],
        },
        properties: {
          id: 1,
          name: "Karachi District",
          area_sqkm: 3780,
          province: "Sindh",
        },
      },
    ],
  },

  selected: {},
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
