import { type } from "os";
import axios from "axios";
const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

// export const initialNodes = [
//   {
//     id: "1",
//     type: "addparent",
//     data: { label: "Add Parent" },
//     position,
//   },

//   {
//     id: "2",
//     type: "subparent",
//     data: { label: "add tree" },
//     position,
//   },
//   {
//     id: "2c",
//     type: "addChildNode",
//     data: { label: "Child" },
//     position,
//   },
// ];

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
];

export const EventTreeDetailEdge = [
  { id: "e12", source: "4", target: "4", type: edgeType },
];

export const PeopleDetailEdge = [
  { id: "e12", source: "5", target: "5", type: edgeType },
];

export const initialBirthEdges = [
  { id: "e12", source: "3", target: "3", type: edgeType },
];

// export const initialEdges = [
//   { id: "e12", source: "1", target: "2", type: edgeType, animated: true },
//   { id: "e22a", source: "2", target: "2c", type: edgeType, animated: true },
// ];

// { id: "e22a", source: "2a", target: "2c", type: edgeType, animated: true },

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/family");

    // console.log("inside fetch........", response.data);
    return response;
  } catch (err) {
    console.log("Error:", err);
  }
};
// const res = await fetchData();

// const result = res.data;
const result = [];

console.log("resuuuullllllllllltttttttttttt", result);
console.log(typeof result);

// const transformedData = result.map((item) => {
//   return {
//     id: item.id,
//     firstName: item.firstName,
//     lastName: item.lastName,
//     parents: item.parents.map((p) => p.parent), // Extracting parent objects directly
//   };
// });

const jsonData = [
  {
    id: 12,
    firstName: "You",
    lastName: "",
    parents: [
      {
        parent: {
          id: 14,
          firstName: "Jay",
          lastName: "Pritchett",
        },
      },
      {
        parent: {
          id: 1457,
          firstName: "Akilas",
          lastName: "Pritchett",
        },
      },
    ],
  },
  {
    id: 1457,
    firstName: "Akilas",
    lastName: "Pritchett",
    parents: [],
  },
  {
    id: 13,
    firstName: "Frank",
    lastName: "Pritchett",
    parents: [],
  },
  {
    id: 14,
    firstName: "Jay",
    lastName: "Pritchett",
    parents: [
      {
        parent: {
          id: 13,
          firstName: "Frank",
          lastName: "Pritchett",
        },
      },
      {
        parent: {
          id: 15,
          firstName: "Mary",
          lastName: "Pritchett",
        },
      },
    ],
  },
  {
    id: 15,
    firstName: "Mary",
    lastName: "Pritchett",
    parents: [],
  },
];

const createNodesAndEdges = (data) => {
  console.log("yordiiiii", data);
  const nodes = [];
  const edges = [];
  const positionOffset = 100;

  data.forEach((person, index) => {
    const nodeId = person.id.toString();
    nodes.push({
      id: nodeId,
      type: "subparent",
      data: { label: `${person.firstName} ${person.lastName}` },
      position: { x: 0, y: index * positionOffset },
    });

    if (person.parents && person.parents.length > 0) {
      person.parents.forEach((parent) => {
        const parentId = parent.parent.id.toString();
        edges.push({
          id: `e${parentId}-${nodeId}`,
          source: parentId,
          target: nodeId,
          type: edgeType,
        });
      });
    }
  });

  console.log("object yordi 123", { nodes, edges });

  return { nodes, edges };
};

export const { nodes: initialNodes, edges: initialEdges } =
  createNodesAndEdges(jsonData);
