import { useState } from "react";

const ICON =
  "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/square.svg";

export default function ToolModal({
  open,
  title,
  toolTitle,
  description,
  fields = [],
  logs = [],
  progress = 0,
  onClose,
  onRun,
  runLabel = "Run", // 👈 ADD
  toolIcon = ICON, // 👈 ADD
}) {
  const [tab, setTab] = useState("params");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[]">
      <div className="w-[900px] h-[560px] bg-[#efefef] border border-[#bfbfbf] shadow-lg flex flex-col text-[13px]">
        {/* Title bar */}
        <div className="h-8 bg-[#1f1c8f] text-white flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <img src={toolIcon} className="w-4 h-4" />
            <span>{title}</span>
          </div>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* LEFT */}
          <div className="w-[55%] border-r border-[#cfcfcf] flex flex-col">
            {/* Tabs */}
            <div className="flex bg-[#e4e4e4] border-b border-[#cfcfcf]">
              <TabBtn t="params" tab={tab} setTab={setTab}>
                Parameters
              </TabBtn>
              <TabBtn t="log" tab={tab} setTab={setTab}>
                Log
              </TabBtn>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-3 bg-[#efefef] space-y-3">
              {tab === "params" &&
                fields.map((f, i) => <RenderField key={i} {...f} />)}

              {tab === "log" && (
                <div className="bg-white border border-[#cfcfcf] h-full p-2 text-[12px]">
                  {logs.length
                    ? logs.map((l, i) => <div key={i}>{l}</div>)
                    : "No logs"}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 p-4 overflow-auto bg-[#f7f7f7]">
            <h2 className="text-[18px] mb-3">{toolTitle}</h2>
            <p className="whitespace-pre-line text-gray-700">{description}</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#cfcfcf] bg-[#e9e9e9] p-2 flex items-center gap-3">
          <div className="flex-1 h-5 bg-white border border-[#cfcfcf] relative">
            <div
              className="h-full bg-[#2b79c2]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <Btn onClick={onClose}>Cancel</Btn>
          <Btn onClick={onRun} primary>
            {runLabel}
          </Btn>
          <Btn onClick={onClose}>Close</Btn>
          <Btn>Help</Btn>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helpers ---------- */

function TabBtn({ t, tab, setTab, children }) {
  return (
    <button
      onClick={() => setTab(t)}
      className={`px-4 py-1 ${
        tab === t
          ? "bg-[#efefef] border-t border-l border-r border-[#cfcfcf]"
          : ""
      }`}
    >
      {children}
    </button>
  );
}

function RenderField({ type, label, value }) {
  if (type === "checkbox")
    return (
      <label className="flex items-center gap-2">
        <input type="checkbox" defaultChecked={value} />
        {label}
      </label>
    );

  return (
    <div>
      <div className="mb-1">{label}</div>
      <div className="flex gap-1">
        <input
          defaultValue={value}
          className="flex-1 border border-[#cfcfcf] px-2 py-1 bg-white outline-none focus:border-[#2b79c2]"
        />
        <button className="w-7 border border-[#cfcfcf] bg-[#e9e9e9]">…</button>
      </div>
    </div>
  );
}

function Btn({ children, primary, ...p }) {
  return (
    <button
      {...p}
      className={`px-4 py-1 border ${
        primary
          ? "bg-[#cfe3ff] border-[#7aa7e8]"
          : "bg-[#efefef] border-[#cfcfcf]"
      } hover:bg-[#e2e2e2]`}
    >
      {children}
    </button>
  );
}
