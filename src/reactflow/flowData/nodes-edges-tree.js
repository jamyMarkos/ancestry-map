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

export const JSONDATA = [
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
    spouseId: null, // Assuming "You" doesn't have a spouse info in the data
  },
  {
    id: 1457,
    firstName: "Akilas",
    lastName: "Pritchett",
    parents: [],
    spouseId: null, // Assuming no spouse info available
  },
  {
    id: 13,
    firstName: "Frank",
    lastName: "Pritchett",
    parents: [],
    spouseId: 15, // SpouseId from related events of type "marriage"
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
    spouseId: null, // Assuming no spouse info available
  },
  {
    id: 15,
    firstName: "Mary",
    lastName: "Pritchett",
    parents: [],
    spouseId: 13, // SpouseId from related events of type "marriage"
  },
];
const createNodesAndEdges = (data) => {
  console.log("yordiiiii", data);

  const nodes = [];
  const edges = [];
  const verticalOffset = 100; // Vertical spacing between levels
  const horizontalOffset = 150; // Horizontal spacing between spouse and person

  // Keep track of node positions and added nodes
  const nodePositions = {};
  const addedNodes = new Set();

  // Calculate the maximum depth of the tree
  const calculateDepth = (id, depth = 0) => {
    const person = data.find((p) => p.id === id);
    if (!person || !person.parents || person.parents.length === 0) {
      return depth;
    }
    const parentDepths = person.parents.map((p) =>
      calculateDepth(p.parent.id, depth + 1)
    );
    return Math.max(...parentDepths);
  };

  // Initialize levels
  const nodeLevels = {};
  data.forEach((person) => (nodeLevels[person.id] = calculateDepth(person.id)));

  // Calculate positions and add nodes
  data.forEach((person, index) => {
    const nodeId = person.id.toString();

    // Skip if node is already added
    if (addedNodes.has(nodeId)) return;

    // Determine position for the current node
    const depth = nodeLevels[nodeId];
    const position = {
      x: 0,
      y: depth * verticalOffset,
    };
    nodePositions[nodeId] = position;

    // Add the person node
    nodes.push({
      id: nodeId,
      type: "subparent",
      data: {
        label: `${person.firstName} ${person.lastName}`,
        spouse: person.spouseId
          ? data.find((p) => p.id === person.spouseId)?.firstName +
            " " +
            data.find((p) => p.id === person.spouseId)?.lastName
          : null,
        spouseId: person.spouseId ? person.spouseId.toString() : null,
      },
      position,
    });
    addedNodes.add(nodeId); // Mark person as added

    // Add the spouse node if exists and is not already added
    if (person.spouseId) {
      const spouse = data.find((p) => p.id === person.spouseId);
      if (spouse && !addedNodes.has(spouse.id.toString())) {
        const spouseId = spouse.id.toString();
        const spousePosition = {
          x: position.x + horizontalOffset,
          y: position.y, // Same vertical position as the person
        };
        nodePositions[spouseId] = spousePosition;

        // Add the spouse node
        nodes.push({
          id: spouseId,
          type: "subparent",
          data: {
            label: `${spouse.firstName} ${spouse.lastName}`,
            spouse: null, // No spouse data for the spouse node
          },
          position: spousePosition,
        });
        addedNodes.add(spouseId); // Mark spouse as added
      }
    }

    // Add edges to parents
    if (person.parents && person.parents.length > 0) {
      person.parents.forEach((parent) => {
        const parentId = parent.parent.id.toString();
        edges.push({
          id: `e${parentId}-${nodeId}`,
          source: parentId,
          target: nodeId,
          type: "smoothstep", // Adjust edge type as needed
        });
      });
    }
  });

  console.log("object yordi 123", { nodes, edges });

  return { nodes, edges };
};

export const { nodes: initialNodes, edges: initialEdges } =
  createNodesAndEdges(JSONDATA);
