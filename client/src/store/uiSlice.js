import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",

  initialState: {
    modalOpen: false,
    activeTool: null,
    rightPanelOpen: true,
    hasMap: false,
    basemap: "osm",
    editingEnabled: false,
    drawingMode: false, // 🔥 NEW
  },

  reducers: {
    startDrawing: (state) => {
      state.drawingMode = true;
    },

    stopDrawing: (state) => {
      state.drawingMode = false;
    },
    openModal: (state, action) => {
      state.modalOpen = true;
      state.activeTool = action.payload || null;
    },

    closeModal: (state) => {
      state.modalOpen = false;
      state.activeTool = null;
    },

    openRightPanel: (state) => {
      state.rightPanelOpen = true;
    },

    closeRightPanel: (state) => {
      state.rightPanelOpen = false;
    },

    toggleRightPanel: (state) => {
      state.rightPanelOpen = !state.rightPanelOpen;
    },

    openMap: (state) => {
      state.hasMap = true;
    },

    closeMap: (state) => {
      state.hasMap = false;
    },

    setBasemap: (state, action) => {
      state.basemap = action.payload;
    }, // 👈 NEW
    toggleEditing: (state) => {
      state.editingEnabled = !state.editingEnabled;
    },
  },
});

export const {
  startDrawing,
  stopDrawing,
  openModal,
  closeModal,
  openRightPanel,
  closeRightPanel,
  toggleRightPanel,
  openMap,
  closeMap,
  setBasemap,
  toggleEditing,
} = uiSlice.actions;

export default uiSlice.reducer;
