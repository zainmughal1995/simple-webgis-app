export const MENU_CONFIG = {
  Project: [
    { label: "New", shortcut: "Ctrl+N" },
    { label: "Open...", shortcut: "Ctrl+O" },
    { type: "separator" },
    { label: "Save", shortcut: "Ctrl+S" },
    { label: "Exit QGIS", shortcut: "Ctrl+Q" },
  ],

  Edit: [
    { label: "Undo", shortcut: "Ctrl+Z" },
    { label: "Redo", shortcut: "Ctrl+Y" },
  ],

  View: [{ label: "Zoom In" }, { label: "Zoom Out" }],

  Layer: [{ label: "Add Layer" }, { label: "Remove Layer" }],

  Settings: [{ label: "Options" }],

  Plugins: [{ label: "Manage Plugins" }],

  /* ---------------- VECTOR ---------------- */

  Vector: [
    { label: "Buffer", action: "buffer" },
    { label: "Clip", action: "clip" },
    { label: "Dissolve", action: "dissolve" },
    { label: "Centroids", action: "centroid" },
    { type: "separator" },
    { label: "Intersection", action: "intersection" },
    { label: "Union", action: "union" },
    { label: "Spatial Join", action: "spatialJoin" },
    { label: "Simplify", action: "simplify" },
    { label: "Reproject", action: "reproject" },
    { type: "separator" },
    { label: "Select by Location", action: "selectByLocation" },
    { label: "Select by Attribute", action: "selectByAttribute" },
  ],

  /* ---------------- RASTER ---------------- */

  Raster: [
    { label: "Raster Calculator", action: "rasterCalc" },
    { type: "separator" },
    { label: "Slope", action: "slope" },
    { label: "Hillshade", action: "hillshade" },
  ],

  /* ---------------- DATABASE ---------------- */

  Database: [{ label: "DB Manager", action: "dbManager" }],

  Web: [{ label: "QuickMapServices" }],

  Mesh: [{ label: "Create Mesh Layer" }],

  Processing: [{ label: "Toolbox", action: "openProcessing" }],

  Help: [{ label: "About", action: "aboutSection" }],
};
