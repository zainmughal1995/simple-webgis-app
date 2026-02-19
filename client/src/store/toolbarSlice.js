import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: ["digitization", "annotations", "attributes"],
  toolbars: {
    digitization: true,
    annotations: true,
    attributes: true,
  },
};

const toolbarSlice = createSlice({
  name: "toolbars",
  initialState,
  reducers: {
    toggleToolbar: (state, action) => {
      const id = action.payload;
      state.toolbars[id] = !state.toolbars[id];
    },

    reorderToolbars: (state, action) => {
      state.order = action.payload;
    },
  },
});

export const { toggleToolbar, reorderToolbars } = toolbarSlice.actions;

export default toolbarSlice.reducer;
