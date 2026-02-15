import Topbar from "./components/Topbar";
import Toolbar from "./components/Toolbar";
import LeftSidebar from "./components/LeftSideBar";
import CenterPanel from "./components/CenterPanel";
import RightPanel from "./components/RightPanel";
import ToolModal from "./components/ToolModal";

import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./store/uiSlice";

import { TOOL_SCHEMAS } from "./tools/toolSchemas";

export default function App() {
  const dispatch = useDispatch();

  const { modalOpen, activeTool } = useSelector((s) => s.ui);

  const schema = TOOL_SCHEMAS[activeTool];

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <Topbar />
      <Toolbar />

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <CenterPanel />
        <RightPanel />
      </div>

      {/* Generic Tool Modal */}
      {schema && (
        <ToolModal
          open={modalOpen}
          title={schema.title}
          toolTitle={schema.toolTitle}
          description={schema.description}
          fields={schema.fields}
          onClose={() => dispatch(closeModal())}
          onRun={() => console.log("Run tool:", activeTool)}
          runLabel={schema.runLabel} // 👈 ADD THIS
        />
      )}
    </div>
  );
}
