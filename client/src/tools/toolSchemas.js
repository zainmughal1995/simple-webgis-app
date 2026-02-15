export const TOOL_SCHEMAS = {
  /* ---------------- VECTOR ---------------- */

  buffer: {
    title: "Vector Buffer",
    toolTitle: "Buffer",
    description: "Creates buffer polygons around features.",
    fields: [
      { label: "Input layer", type: "text" },
      { label: "Distance", type: "text", value: "10" },
      { label: "Segments", type: "text", value: "5" },
      { label: "Dissolve result", type: "checkbox", value: false },
    ],
  },

  clip: {
    title: "Vector Clip",
    toolTitle: "Clip",
    description: "Clips one layer using another.",
    fields: [
      { label: "Input layer", type: "text" },
      { label: "Overlay layer", type: "text" },
      { label: "Output file", type: "text" },
    ],
  },

  dissolve: {
    title: "Vector Dissolve",
    toolTitle: "Dissolve",
    description: "Merges features by attribute.",
    fields: [
      { label: "Input layer", type: "text" },
      { label: "Dissolve field", type: "text" },
      { label: "Keep attributes", type: "checkbox", value: true },
    ],
  },

  centroid: {
    title: "Vector Centroids",
    toolTitle: "Centroids",
    description: "Creates centroid points.",
    fields: [
      { label: "Input layer", type: "text" },
      { label: "All parts", type: "checkbox", value: false },
    ],
  },

  /* ---------------- SELECTION ---------------- */

  selectByLocation: {
    title: "Select by Location",
    toolTitle: "Select by Location",
    description: "Select features using spatial relationship.",
    fields: [
      { label: "Input layer", type: "text" },
      { label: "By layer", type: "text" },
      { label: "Predicate", type: "text", value: "intersects" },
    ],
  },

  selectByAttribute: {
    title: "Select by Attribute",
    toolTitle: "Select by Attribute",
    description: "Select features using expressions.",
    fields: [
      { label: "Input layer", type: "text" },
      { label: "Expression", type: "text" },
    ],
  },

  /* ---------------- RASTER ---------------- */

  rasterCalc: {
    title: "Raster Calculator",
    toolTitle: "Raster Calculator",
    description: "Perform raster map algebra.",
    fields: [
      { label: "Expression", type: "text" },
      { label: "Output raster", type: "text" },
    ],
  },

  slope: {
    title: "Slope",
    toolTitle: "Slope",
    description: "Calculates terrain slope.",
    fields: [
      { label: "DEM layer", type: "text" },
      { label: "Z factor", type: "text", value: "1" },
    ],
  },

  hillshade: {
    title: "Hillshade",
    toolTitle: "Hillshade",
    description: "Creates hillshade raster.",
    fields: [
      { label: "DEM layer", type: "text" },
      { label: "Azimuth", type: "text", value: "315" },
      { label: "Altitude", type: "text", value: "45" },
    ],
  },

  /* ---------------- DATABASE ---------------- */

  dbManager: {
    title: "DB Manager",
    toolTitle: "Database Manager",
    description: "Manage spatial databases.",
    fields: [
      { label: "Database", type: "text" },
      { label: "Schema", type: "text" },
    ],
  },

  /* ---------------- GEOMETRY ---------------- */

  simplify: {
    title: "Simplify Geometry",
    toolTitle: "Simplify",
    description: "Reduces vertex count.",
    fields: [
      { label: "Input layer", type: "text" },
      { label: "Tolerance", type: "text", value: "1" },
    ],
  },

  reproject: {
    title: "Reproject Layer",
    toolTitle: "Reproject",
    description: "Reprojects to another CRS.",
    fields: [
      { label: "Input layer", type: "text" },
      { label: "Target CRS", type: "text", value: "EPSG:4326" },
    ],
  },

  /* ---------------- ANALYSIS ---------------- */

  intersection: {
    title: "Intersection",
    toolTitle: "Intersection",
    description: "Computes geometric intersections.",
    fields: [
      { label: "Input layer", type: "text" },
      { label: "Overlay layer", type: "text" },
    ],
  },

  union: {
    title: "Union",
    toolTitle: "Union",
    description: "Combines layers.",
    fields: [
      { label: "Input layer", type: "text" },
      { label: "Overlay layer", type: "text" },
    ],
  },

  spatialJoin: {
    title: "Spatial Join",
    toolTitle: "Join Attributes by Location",
    description: "Transfers attributes spatially.",
    fields: [
      { label: "Target layer", type: "text" },
      { label: "Join layer", type: "text" },
      { label: "Predicate", type: "text", value: "intersects" },
    ],
  },

  // About Section
  aboutSection: {
    title: "About",
    toolTitle: "Contact",
    description:
      "Developed By: Zain Ul Abdin \n Send a Message to the Developer",
    fields: [
      { label: "Email", type: "text" },
      { label: "Message", type: "text" },
    ],
    runLabel: "Send",
  },
};
