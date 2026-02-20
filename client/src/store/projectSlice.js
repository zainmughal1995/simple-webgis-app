import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProject: null, // { id, name, layers }
  projects: [], // optional in-memory list
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    createProject: (state, action) => {
      //   const { name } = action.payload;

      const newProject = {
        id: Date.now().toString(),
        name: action.payload.name,
        createdAt: new Date().toISOString(),
        layers: null,
      };

      state.currentProject = newProject;
      state.projects.push(newProject);
    },

    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },

    updateProjectLayers: (state, action) => {
      if (state.currentProject) {
        state.currentProject.layers = action.payload;
      }
    },

    saveProjectSnapshot: (state, action) => {
      if (!state.currentProject) return;

      const updated = {
        ...state.currentProject,
        layers: action.payload,
        updatedAt: new Date().toISOString(),
      };

      state.currentProject = updated;

      const index = state.projects.findIndex((p) => p.id === updated.id);

      if (index !== -1) {
        state.projects[index] = updated;
      }
    },
  },
});

export const {
  createProject,
  setCurrentProject,
  updateProjectLayers,
  saveProjectSnapshot,
} = projectSlice.actions;

export default projectSlice.reducer;
