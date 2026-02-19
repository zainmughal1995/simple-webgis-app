import React, { useMemo } from "react";

import ProjectBar from "./components/common/ProjectBar";
import Toolbar from "./components/toolbars/Toolbar";
import SortableToolbarWrapper from "./components/toolbars/SortableToolbarWrapper";

import DigitizationToolbar from "./components/toolbars/digitization/DigitizationToolbar";
import AnnotationsToolbar from "./components/toolbars/annotations/AnnotationsToolbar";

import LeftPanel from "./components/layout/LeftPanel";
import RightPanel from "./components/layout/RightPanel";
import CenterPanel from "./components/layout/CenterPanel";

const App = () => {
  // ✅ Memoized so components are not recreated on every render
  const toolbarComponents = useMemo(
    () => ({
      digitization: (
        <SortableToolbarWrapper id="digitization">
          <DigitizationToolbar />
        </SortableToolbarWrapper>
      ),
      annotations: (
        <SortableToolbarWrapper id="annotations">
          <AnnotationsToolbar />
        </SortableToolbarWrapper>
      ),
    }),
    [],
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <ProjectBar />

      <Toolbar toolbarComponents={toolbarComponents} />

      <div className="flex flex-1 overflow-hidden">
        <LeftPanel />

        <div className="flex-1 overflow-hidden">
          <CenterPanel />
        </div>

        <RightPanel />
      </div>
    </div>
  );
};

export default App;
