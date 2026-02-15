import { useState, useRef, useEffect } from "react";
import { MENU_CONFIG } from "../config/menuConfig";

import { useDispatch } from "react-redux";
import { openModal, openRightPanel } from "../store/uiSlice";

export default function QGISMenuBar() {
  const menus = Object.keys(MENU_CONFIG);
  const [open, setOpen] = useState(null);
  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const h = (e) => !ref.current?.contains(e.target) && setOpen(null);
    window.addEventListener("mousedown", h);
    return () => window.removeEventListener("mousedown", h);
  }, []);

  const handleItemClick = (item) => {
    if (!item.action) return;

    // UI action (not a tool)
    if (item.action === "openProcessing") {
      dispatch(openRightPanel());
      setOpen(null);
      return;
    }

    // Otherwise treat as tool
    dispatch(openModal(item.action));
    setOpen(null);
  };

  return (
    <div
      ref={ref}
      className="h-7 bg-[#ececec] border-b border-[#cfcfcf] flex items-center px-1 text-[13px] select-none"
    >
      {menus.map((m) => (
        <div key={m} className="relative">
          <button
            onClick={() => setOpen(open === m ? null : m)}
            className={`px-3 h-7 hover:bg-[#dcdcdc] ${
              open === m ? "bg-[#2b79c2] text-white" : ""
            }`}
          >
            {m}
          </button>

          {open === m && (
            <div className="absolute left-0 top-7 w-56 z-[9999] bg-[#efefef] border border-[#bfbfbf] shadow-md">
              {MENU_CONFIG[m].map((item, i) =>
                item.type === "separator" ? (
                  <div key={i} className="border-t border-[#cfcfcf] my-1" />
                ) : (
                  <div
                    key={i}
                    onClick={() => handleItemClick(item)}
                    className="
                      flex justify-between px-4 py-1
                      hover:bg-[#2b79c2] hover:text-white
                      cursor-default
                    "
                  >
                    <span>{item.label}</span>
                    <span>{item.shortcut}</span>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
