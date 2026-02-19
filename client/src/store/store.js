import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import layersReducer from "./layersSlice";
import toolbarReducer from "./toolbarSlice";
import panelReducer from "./panelSlice";
import mapReducer from "./mapSlice";
import layoutReducer from "./layoutSlice";
import featuresReducer from "./featuresSlice"; // 🔥 NEW

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    layers: layersReducer,
    toolbars: toolbarReducer,
    panels: panelReducer, // 🔥 THIS LINE MUST EXIST
    map: mapReducer,
    layout: layoutReducer,
    features: featuresReducer, // 🔥 NEW
  },
});
