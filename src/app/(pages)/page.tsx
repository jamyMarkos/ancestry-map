"use client";
import PageHeader from "@/components/Header/DynamicHeader";
import PersonDetail from "@/components/SavedDataSection/PersonDetail";
import LayoutFlow from "@/reactflow";
import { globalStore } from "@/stores/global-store";
import "@xyflow/react/dist/style.css";
export default function Home() {
  const { peopleDetailModal } = globalStore();
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
