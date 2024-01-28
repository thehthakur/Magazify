"use client";
import { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { useFilters } from "./FiltersContext";
import Magazine_Entry from "./Magazine_Entry";

export default function MagazineList({ magazines }) {
  const { selectedGenre, selectedDate } = useFilters();

  const formatDate = (dateString) => {
    const fullDateString = dateString + " 2024";
    return new Date(fullDateString);
  };

  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    // Filter the magazines based on selectedGenre and selectedDate
    const filteredMagazines = magazines.filter((magazine) => {
      const formattedSelectedDate = new Date(selectedDate).toLocaleDateString();
      const formattedMagazineDate = formatDate(magazine.submission_deadline).toLocaleDateString()
      console.log(magazine.genres.includes(selectedGenre))
      return (
        magazine.genres.includes(selectedGenre) &&
        formattedMagazineDate > formattedSelectedDate
      );
    });
    setFilteredList(filteredMagazines);
  }, [selectedGenre]);

  return (
    <div className=" mx-auto my-5 w-3/4 pt-10 border-2 rounded-md drop-shadow-xl">
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Magazine Name</Table.HeadCell>
            <Table.HeadCell>Genre</Table.HeadCell>
            <Table.HeadCell>Guideline</Table.HeadCell>
            <Table.HeadCell>Deadline</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            <Magazine_Entry filteredList={filteredList} />
          </Table.Body>
        </Table>
      </div>

      {magazines.length === 0 && (
        <p className="text-center">No magazines available</p>
      )}
    </div>
  );
}
