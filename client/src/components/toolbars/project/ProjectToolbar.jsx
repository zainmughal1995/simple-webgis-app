import React from "react";
import ToolButton from "../../common/ToolButton";

import newProjectIcon from "../../../assets/icons/toolbar_project/new_project.png";
import openProjectIcon from "../../../assets/icons/toolbar_project/open_project.png";
import saveProjectIcon from "../../../assets/icons/toolbar_project/save_project.png";
import newLayoutManagerIcon from "../../../assets/icons/toolbar_project/new_print_layout.png";
import layoutManagerIcon from "../../../assets/icons/toolbar_project/show_layout_manager.png";
import styleManagerIcon from "../../../assets/icons/toolbar_project/style_manager.png";

const ICONS = {
  newProject: newProjectIcon,
  openProject: openProjectIcon,
  saveProject: saveProjectIcon,
  newLayout: newLayoutManagerIcon,
  layoutManager: layoutManagerIcon,
  styleManager: styleManagerIcon,
};

const ProjectToolbar = () => {
  return (
    <div className="flex items-center px-2 py-1 border-b border-gray-200 gap-1">
      <ToolButton icon={ICONS.newProject} tooltip="New Project" />

      <ToolButton icon={ICONS.openProject} tooltip="Open Project" />

      <ToolButton icon={ICONS.saveProject} tooltip="Save Project" />

      <ToolButton icon={ICONS.newLayout} tooltip="New Print Layout" />

      <ToolButton icon={ICONS.layoutManager} tooltip="Show Layout Manager" />

      <ToolButton icon={ICONS.styleManager} tooltip="Style Manager" />
    </div>
  );
};

export default ProjectToolbar;
