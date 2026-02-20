import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ToolButton from "../../common/ToolButton";

import newProjectIcon from "../../../assets/icons/toolbar_project/new_project.png";
import openProjectIcon from "../../../assets/icons/toolbar_project/open_project.png";
import saveProjectIcon from "../../../assets/icons/toolbar_project/save_project.png";
import newLayoutManagerIcon from "../../../assets/icons/toolbar_project/new_print_layout.png";
import layoutManagerIcon from "../../../assets/icons/toolbar_project/show_layout_manager.png";
import styleManagerIcon from "../../../assets/icons/toolbar_project/style_manager.png";

// ✅ NEW
import {
  createProject,
  saveProjectSnapshot,
  setCurrentProject,
} from "../../../store/projectSlice";

import { setLayersState, resetLayers } from "../../../store/layersSlice";
import { setFeaturesState, resetFeatures } from "../../../store/featuresSlice";

const ICONS = {
  newProject: newProjectIcon,
  openProject: openProjectIcon,
  saveProject: saveProjectIcon,
  newLayout: newLayoutManagerIcon,
  layoutManager: layoutManagerIcon,
  styleManager: styleManagerIcon,
};

const ProjectToolbar = () => {
  const dispatch = useDispatch();

  // ✅ We grab full state required to save project
  const layers = useSelector((s) => s.layers);
  const features = useSelector((s) => s.features);
  const currentProject = useSelector((s) => s.project.currentProject);
  const projects = useSelector((s) => s.project.projects);

  const [showModal, setShowModal] = useState(false);
  // ✅ NEW PROJECT

  const handleNewProject = () => {
    const name = prompt("Enter project name:");
    if (!name) return;

    dispatch(createProject({ name }));
    dispatch(resetLayers());
    dispatch(resetFeatures());
  };

  // ✅ SAVE PROJECT
  const handleSaveProject = () => {
    if (!currentProject) {
      alert("No active project.");
      return;
    }

    const snapshot = {
      layers: JSON.parse(JSON.stringify(layers)),
      features: JSON.parse(JSON.stringify(features)),
    };

    dispatch(saveProjectSnapshot(snapshot));
  };

  const handleOpenProject = (project) => {
    if (!project.layers) {
      alert("Project has no saved data.");
      return;
    }

    dispatch(setCurrentProject(project));
    dispatch(setLayersState(project.layers.layers));
    dispatch(setFeaturesState(project.layers.features));

    setShowModal(false);
  };

  return (
    <div className="flex items-center px-2 py-1 border-b border-gray-200 gap-1">
      <ToolButton
        icon={ICONS.newProject}
        tooltip="New Project"
        onClick={handleNewProject}
      />

      <ToolButton
        icon={ICONS.openProject}
        tooltip="Open Project"
        onClick={() => setShowModal(true)}
      />

      <ToolButton
        icon={ICONS.saveProject}
        tooltip="Save Project"
        onClick={handleSaveProject}
      />
      <ToolButton icon={ICONS.newLayout} tooltip="New Print Layout" />

      <ToolButton icon={ICONS.layoutManager} tooltip="Show Layout Manager" />

      <ToolButton icon={ICONS.styleManager} tooltip="Style Manager" />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]">
          <div className="bg-white w-[400px] rounded shadow-lg p-4">
            <h2 className="text-lg font-semibold mb-3">Saved Projects</h2>

            {projects.length === 0 && (
              <div className="text-sm text-gray-500">No saved projects.</div>
            )}

            {projects.map((p) => (
              <div
                key={p.id}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-gray-500">
                    {p.updatedAt || p.createdAt}
                  </div>
                </div>

                <button
                  className="px-2 py-1 bg-blue-500 text-white text-xs rounded"
                  onClick={() => handleOpenProject(p)}
                >
                  Open
                </button>
              </div>
            ))}

            <div className="mt-4 text-right">
              <button
                className="px-3 py-1 text-sm bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectToolbar;
