import { Table } from "flowbite-react";
import Magazine_Entry from "./Magazine_Entry";

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

export default async function MagazineList() {
  try {
    const magazines = await getMagazines();

    return (
      <div className=" mx-auto my-5 w-3/4 pt-10 border-2 rounded-md drop-shadow-xl">
        <Magazine_Entry mag_arr={magazines} />

        {magazines.length === 0 && (
          <p className="text-center">No magazines available</p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error in MagazineList component:", error);
    // Handle the error or render an error message as needed
    return <p className="text-center">Error loading magazines</p>;
  }
}
