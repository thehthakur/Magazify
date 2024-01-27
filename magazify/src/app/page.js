import React from "react";
import Filters from "@/components/Filters";
import MagazineList from "@/components/Magazine_List";
import Magazine_Entry from "@/components/Magazine_Entry";

export default function Home() {
  return (
    <>
      <Filters />
      <MagazineList />
    </>
  );
}
