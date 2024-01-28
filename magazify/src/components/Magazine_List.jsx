"use client";
import { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { useFilters } from "./FiltersContext";
import Magazine_Entry from "./Magazine_Entry";

export default function MagazineList({ mag_arr }) {
  const { selectedGenre, selectedDate } = useFilters();
  const formatDate = (dateString) => {
    const fullDateString = dateString + " 2024";
    return new Date(fullDateString);
  };

  const [filteredList, setFilteredList] = useState(mag_arr);

  useEffect(() => {
    const filteredList = mag_arr.filter((magazine) => {
      const genreMatches = magazine.genres.includes(selectedGenre);
      // Check if the magazine deadline is before the selected date
      const deadlineBeforeSelectedDate =
        formatDate(magazine.submission_deadline).toLocaleDateString() <
        selectedDate;
      // Return true if both conditions are met
      return genreMatches && deadlineBeforeSelectedDate;
    });
    setFilteredList(filteredList);
  }, [mag_arr, selectedGenre, selectedDate]);

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

      {mag_arr.length === 0 && (
        <p className="text-center">No magazines available</p>
      )}
    </div>
  );
}
