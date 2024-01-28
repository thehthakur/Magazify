import React from "react";
import MagazineList from "@/components/Magazine_List";
import Genre_Filter from "@/components/Genre_Filter";
import Date_Filter from "@/components/Date_Filter";
import { FiltersProvider } from "@/components/FiltersContext";

export default async function Home() {
  async function getMagazines() {
    try {
      const res = await fetch("http://localhost:5000/magazine");
      const data = await res.json();

      return data;
    } catch (error) {
      console.error("Error fetching magazines:", error);
      throw error;
    }
  }

  try {
    const magazines = await getMagazines();

    return (
      <FiltersProvider>
        <>
          <div className="flex flex-row justify-center mt-5">
            <Genre_Filter />
            <Date_Filter />
          </div>

          <MagazineList mag_arr={magazines} />
        </>
      </FiltersProvider>
    );
  } catch (error) {
    console.error("Error in MagazineList component:", error);
    return <p className="text-center">Error loading magazines</p>;
  }
}
