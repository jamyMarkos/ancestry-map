import React, { useCallback, useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { GrZoomIn } from "react-icons/gr";
import { GrZoomOut } from "react-icons/gr";
import {
  ReactFlow,
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
  type Node,
  type Edge,
  Connection,
} from "@xyflow/react";
import dagre from "dagre";
import useNodeStore from "@/stores/node-store";
import { createNodesAndEdges } from "@/reactflow/flowData/nodes-edges-tree";

import "@xyflow/react/dist/style.css";
import AddParentNode from "./nodes/AddPrentNode";
import SubNodeParent from "./nodes/SubNodeParent";
import AddBirthNode from "./nodes/AddBirthNode";
import BirthNode from "./nodes/BithNode";
import AddTree from "./nodes/AddTree";
import AddChildNode from "./nodes/AddChildNode";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;
const nodeTypes = {
  addparent: AddParentNode,
  subparent: SubNodeParent,
  addBirthNode: AddBirthNode,
  firstBirthNode: BirthNode,
  addChildNode: AddChildNode,
  addtree: AddTree,
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

const ReactLayoutFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const fetchPeople = useNodeStore((state) => state.fetchPeople);
  const people = useNodeStore((state) => state.people);

  useEffect(() => {
    console.log("Fetching people");
    fetchPeople();
  }, [fetchPeople]);

  useEffect(() => {
    if (people.length > 0) {
      const { nodes: initialNodes, edges: initialEdges } =
        createNodesAndEdges(people);

      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(initialNodes, initialEdges);

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);

      console.log("Nodes:", nodes);
      console.log("Edges:", edges);
    }
  }, [people, setNodes, setEdges]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds
        )
      ),
    [setEdges]
  );

  return (
    <div className={isFullScreen ? "fullscreen-flow" : "normal-flow"}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        nodeTypes={nodeTypes}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        style={{ height: "100%", width: "100%" }}
      >
        <Panel position="top-right">
          <button onClick={() => zoomIn({ duration: 800 })}>
            <GrZoomIn />
          </button>
          <button onClick={() => zoomOut({ duration: 800 })}>
            <GrZoomOut />
          </button>
          <button
            onClick={toggleFullScreen}
            style={{
              fontWeight: "700",
            }}
          >
            {isFullScreen ? (
              <AiOutlineFullscreenExit />
            ) : (
              <AiOutlineFullscreen />
            )}
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

const LayoutFlow = () => {
  return (
    <ReactFlowProvider>
      <ReactLayoutFlow />
    </ReactFlowProvider>
  );
};

export default LayoutFlow;
