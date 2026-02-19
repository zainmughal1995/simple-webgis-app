import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableToolbarWrapper({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center">
      {/* 🔥 Drag Handle (only this part is draggable) */}
      <div
        {...attributes}
        {...listeners}
        className="flex items-center px-2 cursor-move select-none text-gray-400"
        title="Drag Toolbar"
      >
        ⋮⋮
      </div>

      {/* Actual Toolbar Content (buttons clickable normally) */}
      <div className="flex items-center">{children}</div>
    </div>
  );
}
