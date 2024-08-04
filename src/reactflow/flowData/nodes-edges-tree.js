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
  const nodesWithChildren = new Set();

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
    if (person.firstName === "Jane") console.log("want jane", person);
    const nodeId = person.id.toString();
    const depth = nodeLevels[person.id];
    const baseX = 0;
    const baseY = depth * verticalOffset;
    // Add the "Add Parent" nodes only if this person has no parents
    if (person?.parents.length === 0) {
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

      if (!addedSpousesIds.has(person.id) && person.spouseId) {
        addParentNode(
          `add-parent2-${person.spouseId}`,
          "addparent",
          "Add parent 2",
          baseX + horizontalOffset,
          baseY - verticalOffset,
          nodes,
          person.spouseId
        );

        addEdge(`add-parent2-${person.spouseId}`, nodeId, edges);
      }
    }

    let spouseLabel = null;
    if (person.spouseId) {
      const spouse = data.find((p) => p.id === person.spouseId);
      spouseLabel = `${spouse?.firstName} ${spouse?.lastName}`;
      // Mark the spouse as added so that we don't add them again
      addedSpousesIds.add(person.spouseId);
    }

    if (!addedSpousesIds.has(person.id)) {
      addNode(
        nodeId,
        "subparent",
        `${person.firstName} ${person.lastName}`,
        spouseLabel,
        person?.spouseId,
        baseX,
        baseY,
        nodes
      );
    }

    // Edges to parents
    person.parents.forEach((parent) => {
      addEdge(parent?.parent?.id?.toString(), nodeId, edges);
    });

    // Add "+ Add Child" nodes for each node that has children
    if (!nodesWithChildren.has(person.id)) {
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
    data: { title: label, childId: nodeId },
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
