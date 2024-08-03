import { type } from "os";
import axios from "axios";
import useNodeStore from "@/stores/node-store";

const position = { x: 0, y: 0 };
const edgeType = "smoothstep";

export const createNodesAndEdges = (data) => {
  const nodes = [];
  const edges = [];
  const verticalOffset = 100;
  const horizontalOffset = 150;
  let maxY = 0;

  const addedSpousesIds = new Set();

  let maxDepth = 0;
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
      if (!addedSpousesIds.has(person.id)) {
        addParentNode(
          `add-parent1-${nodeId}`,
          "addparent",
          "Add parent 1",
          baseX - horizontalOffset,
          baseY - verticalOffset,
          nodes,
          nodeId
        );

        addEdge(`add-parent1-${nodeId}`, nodeId, edges);
      }

      if (!addedSpousesIds.has(person.id)) {
        addParentNode(
          `add-parent2-${nodeId}`,
          "addparent",
          "Add parent 2",
          baseX + horizontalOffset,
          baseY - verticalOffset,
          nodes,
          nodeId
        );

        addEdge(`add-parent2-${nodeId}`, nodeId, edges);
      }
    }

    let spouseLabel = null;
    if (person.spouseId) {
      const spouse = data.find((p) => p.id === person.spouseId);
      spouseLabel = `${spouse.firstName} ${spouse.lastName}`;
      // Mark the spouse as added so that we don't add them again
      addedSpousesIds.add(person.spouseId);
    }

    console.log("what is going to be added", nodeId, person);

    if (!addedSpousesIds.has(person.id)) {
      addNode(
        nodeId,
        "subparent",
        `${person.firstName} ${person.lastName}`,
        spouseLabel,
        baseX,
        baseY,
        nodes
      );
    }
    // addNode(
    //   nodeId,
    //   "subparent",
    //   `${person.firstName} ${person.lastName}`,
    //   spouseLabel,
    //   baseX,
    //   baseY,
    //   nodes
    // );

    // addedSpousesIds.add(person.id);

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

function addParentNode(id, type, label, x, y, nodes, nodeId) {
  const nodeData = {
    id,
    type,
    data: { title: label, childId: nodeId },
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
