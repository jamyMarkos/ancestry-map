import { type } from "os";

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

export const initialNodes = [
  {
    id: "1",
    type: "addparent",
    data: { label: "Add Parent" },
    position,
  },

  {
    id: "2",
    type: "subparent",
    data: { label: "add tree" },
    position,
  },
  {
    id: "2c",
    type: "addChildNode",
    data: { label: "Child" },
    position,
  },
];

export const initialBirthNode = [
  {
    id: "3",
    type: "firstBirthNode",
    position: { x: 0, y: 0 },
    data: { label: "Add Parent Node" },
  },
];

export const PeopleDetailNode = [
  {
    id: "4",
    type: "addBirthNode",
    position: { x: 0, y: 0 },
    data: { label: "Add Parent Node" },
  },
];

export const EventTreeNode = [
  {
    id: "5",
    type: "addtree",
    data: { label: "add tree" },
    position,
  },
]

export const EventTreeDetailEdge = [
  { id: "e12", source: "4", target: "4", type: edgeType, },]

export const PeopleDetailEdge = [
  { id: "e12", source: "5", target: "5", type: edgeType, },]


export const initialBirthEdges = [
  { id: "e12", source: "3", target: "3", type: edgeType, },]

export const initialEdges = [
  { id: "e12", source: "1", target: "2", type: edgeType, animated: true },
  { id: "e22a", source: "2", target: "2c", type: edgeType, animated: true },
  // { id: "e22a", source: "2a", target: "2c", type: edgeType, animated: true },
];
