import { type } from "os";
import axios from "axios";
import useNodeStore from "@/stores/node-store";

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

export const createNodesAndEdges = (data) => {
  const nodes = [];
  const edges = [];
  const verticalOffset = 100; // Vertical spacing between levels
  const horizontalOffset = 150; // Horizontal spacing between nodes
  let maxY = 0; // To track the maximum y position of the tree

  let maxDepth = 0; // To track the maximum depth of the tree
  const nodeLevels = {};
  data.forEach((person) => {
    nodeLevels[person.id] = calculateDepth(person.id, data);
    maxDepth = Math.max(maxDepth, nodeLevels[person.id]);
  });

  // Function to add nodes and edges
  data.forEach((person) => {
    const nodeId = person.id.toString();
    const depth = nodeLevels[person.id];
    const baseX = 0;
    const baseY = depth * verticalOffset;

    // Add the "Add Parent" nodes only if this person has no parents
    if (person.parents.length === 0) {
      addParentNode(
        `add-parent1-${nodeId}`,
        "addparent",
        "Add Parent",
        baseX - horizontalOffset,
        baseY - verticalOffset,
        nodes
      );

      addEdge(`add-parent1-${nodeId}`, nodeId, edges);
    }

    let spouseLabel = null;
    if (person.spouseId) {
      const spouse = data.find((p) => p.id === person.spouseId);
      spouseLabel = `${spouse.firstName} ${spouse.lastName}`;
    }

    // Add the node with or without spouse information
    addNode(
      nodeId,
      "subparent",
      `${person.firstName} ${person.lastName}`,
      spouseLabel,
      baseX,
      baseY,
      nodes
    );

    // Edges to parents
    person.parents.forEach((parent) => {
      addEdge(parent.parent.id.toString(), nodeId, edges);
    });
  });

  // Add a single "Add Child" node at the very bottom of the tree
  // if (data.length > 0) {
  //   addNode(
  //     "add-child",
  //     "addChildNode",
  //     "Add Child",
  //     0,
  //     (maxDepth + 1) * verticalOffset,
  //     nodes
  //   );
  // }

  return { nodes, edges };
};

// Helper functions
function calculateDepth(id, data, depth = 0) {
  const person = data.find((p) => p.id === id);
  if (!person || !person.parents || person.parents.length === 0) {
    return depth;
  }
  const parentDepths = person.parents.map((parent) =>
    calculateDepth(parent.parent.id, data, depth + 1)
  );
  return Math.max(...parentDepths);
}

function addParentNode(id, type, label, x, y, nodes) {
  const nodeData = {
    id,
    type,
    data: { label },
    position: { x, y },
  };
  nodes.push(nodeData);
}

function addNode(id, type, personLabel, spouseLabel, x, y, nodes) {
  const nodeData = {
    id,
    type,
    data: { label: personLabel, spouse: spouseLabel },
    position: { x, y },
  };
  nodes.push(nodeData);
}

function addEdge(source, target, edges, type = "smoothstep") {
  edges.push({
    id: `e-${source}-${target}`,
    source,
    target,
    type,
  });
}

// export const createNodesAndEdges = (data) => {
//   const nodes = [];
//   const edges = [];
//   const positionOffset = 100;

//   data.forEach((person, index) => {
//     const nodeId = person.id.toString();
//     nodes.push({
//       id: nodeId,
//       type: "subparent",
//       data: { label: `${person.firstName} ${person?.lastName}` },
//       position: { x: 0, y: index * positionOffset },
//     });

//     if (person.parents && person.parents.length > 0) {
//       person.parents.forEach((parent) => {
//         const parentId = parent.parent.id.toString();
//         edges.push({
//           id: `e${parentId}-${nodeId}`,
//           source: parentId,
//           target: nodeId,
//           type: edgeType,
//         });
//       });
//     }
//   });

//   return { nodes, edges };
// };

// export const { nodes: initialNodes, edges: initialEdges } =
//   createNodesAndEdges(result);
// console.log("peopleeeeeeeeee", people);

// export const { nodes: initialNodes, edges: initialEdges } =
//   createNodesAndEdges(people);

// console.log("Nodes:", nodes);
// console.log("Edges:", edges);

// module.exports = {
//   initialNodes,
//   initialEdges,
// };

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// const fetchData = async () => {
//   try {
//     const response = await axios.get("http://localhost:5000/family");

//     // console.log("inside fetch........", response.data);
//     return response;
//   } catch (err) {
//     console.log("Error:", err);
//     return [];
//   }
// };

// const res = await fetchData();

// const result = res.data;
// // const result = [];

// console.log("resuuuullllllllllltttttttttttt", result);
// console.log(typeof result);

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
          firstName: "Rachel",
          lastName: "Greene",
        },
      },
    ],
    spouseId: null,
  },
  {
    id: 1457,
    firstName: "Rachel",
    lastName: "Greene",
    parents: [],
    spouseId: 14,
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
    spouseId: 1457,
  },
  {
    id: 15,
    firstName: "Mary",
    lastName: "Pritchett",
    parents: [],
    spouseId: 13,
  },
  {
    id: 13,
    firstName: "Frank",
    lastName: "Pritchett",
    parents: [],
    spouseId: 15,
  },
];

// const transformedData = result.map((item) => {
//   return {
//     id: item.id,
//     firstName: item.firstName,
//     lastName: item.lastName,
//     parents: item.parents.map((p) => p.parent), // Extracting parent objects directly
//   };
// });

// export const initialEdges = [
//   { id: "e12", source: "1", target: "2", type: edgeType, animated: true },
//   { id: "e22a", source: "2", target: "2c", type: edgeType, animated: true },
// ];

// { id: "e22a", source: "2a", target: "2c", type: edgeType, animated: true },

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

// const createNodesAndEdges = (data) => {
//   console.log("yordiiiii", data);

//   const nodes = [];
//   const edges = [];
//   const verticalOffset = 100; // Vertical spacing between levels
//   const horizontalOffset = 150; // Horizontal spacing between spouse and person

//   // Keep track of node positions and added nodes
//   const nodePositions = {};
//   const addedNodes = new Set();

//   // Calculate the maximum depth of the tree
//   const calculateDepth = (id, depth = 0) => {
//     const person = data.find((p) => p.id === id);
//     if (!person || !person.parents || person.parents.length === 0) {
//       return depth;
//     }
//     const parentDepths = person.parents.map((p) =>
//       calculateDepth(p.parent.id, depth + 1)
//     );
//     return Math.max(...parentDepths);
//   };

//   // Initialize levels
//   const nodeLevels = {};
//   data.forEach((person) => (nodeLevels[person.id] = calculateDepth(person.id)));

//   // Calculate positions and add nodes
//   data.forEach((person, index) => {
//     const nodeId = person.id.toString();

//     // Skip if node is already added
//     if (addedNodes.has(nodeId)) return;

//     // Determine position for the current node
//     const depth = nodeLevels[nodeId];
//     const position = {
//       x: 0,
//       y: depth * verticalOffset,
//     };
//     nodePositions[nodeId] = position;

//     // Add the person node
//     nodes.push({
//       id: nodeId,
//       type: "subparent",
//       data: {
//         label: `${person.firstName} ${person.lastName}`,
//         spouse: person.spouseId
//           ? data.find((p) => p.id === person.spouseId)?.firstName +
//             " " +
//             data.find((p) => p.id === person.spouseId)?.lastName
//           : null,
//         spouseId: person.spouseId ? person.spouseId.toString() : null,
//       },
//       position,
//     });
//     addedNodes.add(nodeId); // Mark person as added

//     // Add the spouse node if exists and is not already added
//     if (person.spouseId) {
//       const spouse = data.find((p) => p.id === person.spouseId);
//       if (spouse && !addedNodes.has(spouse.id.toString())) {
//         const spouseId = spouse.id.toString();
//         const spousePosition = {
//           x: position.x + horizontalOffset,
//           y: position.y, // Same vertical position as the person
//         };
//         nodePositions[spouseId] = spousePosition;

//         // Add the spouse node
//         nodes.push({
//           id: spouseId,
//           type: "subparent",
//           data: {
//             label: `${spouse.firstName} ${spouse.lastName}`,
//             spouse: null, // No spouse data for the spouse node
//           },
//           position: spousePosition,
//         });
//         addedNodes.add(spouseId); // Mark spouse as added
//       }
//     }

//     // Add edges to parents
//     if (person.parents && person.parents.length > 0) {
//       person.parents.forEach((parent) => {
//         const parentId = parent.parent.id.toString();
//         edges.push({
//           id: `e${parentId}-${nodeId}`,
//           source: parentId,
//           target: nodeId,
//           type: "smoothstep", // Adjust edge type as needed
//         });
//       });
//     }
//   });

//   console.log("object yordi 123", { nodes, edges });

//   return { nodes, edges };
// };
