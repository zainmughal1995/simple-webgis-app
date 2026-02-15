// src/components/Toolbar.jsx

import { useState } from "react";
import ToolButton from "./ToolButton";
import { TOOLBAR_CONFIG } from "../toolbars/toolbarConfig";

export default function Toolbar() {
  const [active, setActive] = useState(null);

  return (
    <div
      className="
      w-full
      h-[30px]
      bg-[#ececec]
      border-b border-[#cfcfcf]
      flex items-center
      px-[4px]
      py-5
      gap-[2px]
    "
    >
      {TOOLBAR_CONFIG.map((group, gi) => (
        <div key={group.id} className="flex items-center gap-[2px]">
          {group.tools.map((tool) => (
            <ToolButton
              key={tool.id}
              icon={tool.icon}
              tooltip={tool.tooltip}
              active={active === tool.id}
              onClick={() => setActive(tool.id)}
            />
          ))}

          {gi !== TOOLBAR_CONFIG.length - 1 && (
            <div className="w-px h-[30px] bg-[#c8c8c8] mx-[12px]" />
          )}
        </div>
      ))}
    </div>
  );
}
