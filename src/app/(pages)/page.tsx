"use client";
import PageHeader from "@/components/Header/DynamicHeader";
import PersonDetail from "@/components/SavedDataSection/PersonDetail";
import LayoutFlow from "@/reactflow";
import { globalStore } from "@/stores/global-store";
import "@xyflow/react/dist/style.css";
import useNodeStore from "../../stores/node-store";
import { use, useEffect } from "react";
import { createNodesAndEdges } from "@/reactflow/flowData/nodes-edges-tree";
export default function Home() {
  const fetchPeople = useNodeStore((state) => state.fetchPeople);
  const people = useNodeStore((state) => state.people);
  const { peopleDetailModal } = globalStore();

  // useEffect(() => {
  //   console.log("Fetching people");
  //   fetchPeople();
  // }, [fetchPeople]);

  // useEffect(() => {
  //   if (people.length > 0) {
  //     const { nodes, edges } = createNodesAndEdges(people);
  //     console.log("Nodes:", nodes);
  //     console.log("Edges:", edges);
  //   }
  // }, [people]);

  return (
    <>
      <PageHeader heading="Family" />
      <div className="w-full h-[calc(100vh-72px)] p-5 flex gap-5">
        <div
          className={`${peopleDetailModal ? "w-[calc(100%-264px)]" : "w-full"}`}
        >
          <LayoutFlow />
        </div>
        {peopleDetailModal && <PersonDetail />}
      </div>
    </>
  );
}
