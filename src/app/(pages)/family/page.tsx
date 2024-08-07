"use client";
import React, { useCallback, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useReactFlow,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
} from "@xyflow/react";
import dagre from "dagre";
import { createNodesAndEdges } from "@/reactflow/flowData/nodes-edges-tree";
import "@xyflow/react/dist/style.css";
import AddParentNode from "@/reactflow/nodes/AddParentNode";
import SubNodeParent from "@/reactflow/nodes/SubNodeParent";
import AddBirthNode from "@/reactflow/nodes/AddBirthNode";
import BirthNode from "@/reactflow/nodes/BirthNode";
import useNodeStore from "@/stores/node-store";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;
const nodeTypes = {
  addparent: AddParentNode,
  subparent: SubNodeParent,
  addBirthNode: AddBirthNode,
  firstBirthNode: BirthNode,
};

const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  direction = "TB"
) => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node: Node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node: Node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};

const LayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const people = useNodeStore((state) => state.people);

  useEffect(() => {
    if (people.length > 0) {
      const { nodes: initialNodes, edges: initialEdges } =
        createNodesAndEdges(people);

      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(initialNodes, initialEdges);

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    }
  }, [people, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    []
  );
  const onLayout = useCallback(
    (direction: any) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
      nodeTypes={nodeTypes}
    >
      <Panel position="top-right">
        <button onClick={() => onLayout("TB")}>vertical layout</button>
        <button onClick={() => onLayout("LR")}>horizontal layout</button>
      </Panel>
    </ReactFlow>
  );
};

export default LayoutFlow;
