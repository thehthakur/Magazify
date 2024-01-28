"use client";
import { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import { useFilters } from "./FiltersContext";
import Link from "next/link";

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
        console.log(deadlineBeforeSelectedDate)
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
            {filteredList.map((magazine) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={magazine.id} // Assuming you have an "id" property for each magazine
              >
                <Table.Cell className="whitespace-nowrap font-medium text-black-900 dark:text-white">
                  <Link href="/form">{magazine.name}</Link>
                </Table.Cell>

                <Table.Cell>{magazine.genres.join(" ")}</Table.Cell>
                <Table.Cell>{magazine.basicguidelines}</Table.Cell>

                <Table.Cell>
                  {formatDate(
                    magazine.submission_deadline
                  ).toLocaleDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {mag_arr.length === 0 && (
        <p className="text-center">No magazines available</p>
      )}
    </div>
  );
}
