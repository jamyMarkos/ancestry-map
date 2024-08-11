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

  const addedSpousesIds = new Set();
  const nodesWithChildren = new Set();
  const addedChildNodes = new Set();
  // Step 1: Determine which nodes have children
  data.forEach((person) => {
    if (person.parents) {
      person.parents.forEach((parent) => {
        nodesWithChildren.add(parent?.parent?.id);
      });
    }
  });

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

    const spouse = person.spouseId
      ? data.find((p) => p.id === person.spouseId)
      : null;

    const isHusband = spouse && person.gender === "male"; // Assuming gender field or other logic to determine husband

    // Calculate positions for "Add Parent" nodes
    const addParentX1 = isHusband
      ? baseX - horizontalOffset
      : baseX + horizontalOffset;
    const addParentX2 = isHusband
      ? baseX - 2 * horizontalOffset
      : baseX + 2 * horizontalOffset;

    // Add the "Add Parent" nodes only if this person has no parents
    if (person?.parents.length === 0) {
      if (!addedSpousesIds.has(person.id)) {
        const subParentX =
          person.gender === "male"
            ? baseX - horizontalOffset
            : baseX + horizontalOffset;

        addParentNode(
          `add-parent1-${nodeId}`,
          "addparent",
          "Add parent 1",
          subParentX,
          baseY - verticalOffset,
          nodes,
          nodeId
        );

        addEdge(`add-parent1-${nodeId}`, nodeId, edges);
      }
    }

    let spouseLabel = null;
    if (person.spouseId) {
      const spouse = data.find((p) => p.id === person.spouseId);
      spouseLabel = `${spouse?.firstName} ${spouse?.lastName}`;
      // Mark the spouse as added so that we don't add them again
      addedSpousesIds.add(spouse.id);
    }

    const subParentX =
      person.gender === "male"
        ? baseX - horizontalOffset
        : baseX + horizontalOffset;

    if (!addedSpousesIds.has(person.id)) {
      const spouse = data.find((p) => p.id === person.spouseId);

      addNode(
        nodeId,
        "subparent",
        `${person.firstName} ${person.lastName}`,
        spouseLabel,
        person?.spouseId,
        subParentX,
        baseY,
        nodes
      );

      if (person?.gender === "male") {
        // Edges to parents
        person.parents.forEach((parent) => {
          addEdge(parent?.parent?.id?.toString(), nodeId, edges);
        });
      }

      // If spouse has no parents, add the "Add Parent" nodes
      if (spouse?.parents.length === 0) {
        const isSpouseHusband = spouse?.gender === "male";
        const spouseAddParentX = isSpouseHusband ? addParentX2 : addParentX1;
        addParentNode(
          `add-parent2-${person.spouseId}`,
          "addparent",
          "Add parent 2",
          spouseAddParentX,
          baseY - verticalOffset,
          nodes,
          person.spouseId
        );
        addEdge(`add-parent2-${person.spouseId}`, nodeId, edges);
      }

      // Add edges to spouse's parents  (if they exist)
      if (person.spouseId) {
        const spouse = data.find((p) => p.id === person.spouseId);
        spouse.parents.forEach((parent) => {
          addEdge(parent?.parent?.id?.toString(), nodeId, edges);
        });
      }

      if (person?.gender === "female") {
        // Edges to parents
        person.parents.forEach((parent) => {
          addEdge(parent?.parent?.id?.toString(), nodeId, edges);
        });
      }
    }

    // Add "+ Add Child" nodes for each node that has children
    if (
      !nodesWithChildren.has(person.id) &&
      (person.spouseId === null || !nodesWithChildren.has(person.spouseId)) &&
      !addedChildNodes.has(person.id) &&
      !addedChildNodes.has(person.spouseId)
    ) {
      addChildNode(
        `add-child-${person.id}`,
        "addChildNode",
        "Add Child",
        baseX,
        baseY + verticalOffset,
        nodes,
        person.id
      );
      addEdge(person.id.toString(), `add-child-${person.id}`, edges);
    }
    // Mark both the person and spouse as having the "+ Add Child" node
    addedChildNodes.add(person.id);
    if (person.spouseId) {
      addedChildNodes.add(person.spouseId);
    }
  });

  return { nodes, edges };
};

// Helper functions
function calculateDepth(id, data, depth = 0) {
  const person = data.find((p) => p.id === id);
  if (!person || !person.parents || person.parents.length === 0) {
    return depth;
  }
  const parentDepths = person.parents.map((parent) =>
    calculateDepth(parent?.parent?.id, data, depth + 1)
  );
  return Math.max(...parentDepths);
}

// Add a child node
function addChildNode(id, type, label, x, y, nodes, parentId) {
  const nodeData = {
    id,
    type,
    data: { title: label, parentId: parentId },
    position: { x, y },
  };
  nodes.push(nodeData);
}

function addParentNode(id, type, label, x, y, nodes, nodeId) {
  const nodeData = {
    id,
    type,
    data: { title: label, childId: String(nodeId) },
    position: { x, y },
  };
  nodes.push(nodeData);
}

function addNode(id, type, personLabel, spouseLabel, spouseId, x, y, nodes) {
  const nodeData = {
    id,
    type,
    data: { label: personLabel, spouse: spouseLabel, spouseId, personId: id },
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

export const initialBirthEdges = [
  { id: "e12", source: "3", target: "3", type: edgeType },
];

/////////////////////////////////////////////////////////////

export const PeopleDetailNode = [
  {
    id: "4",
    type: "addBirthNode",
    position: { x: 0, y: 0 },
    data: { label: "Add Parent Sukuna" },
  },
];

export const PeopleDetailEdge = [
  { id: "e12", source: "5", target: "5", type: edgeType },
];
