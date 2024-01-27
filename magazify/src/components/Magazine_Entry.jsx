"use client";

import { Table } from "flowbite-react";

export default function Magazine_Entry({ mag_arr }) {
  const formatDate = (dateString) => {
    const fullDateString = dateString + " 2024";
    return new Date(fullDateString);
  };

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Magazine Name</Table.HeadCell>
          <Table.HeadCell>Genre</Table.HeadCell>
          <Table.HeadCell>Guideline</Table.HeadCell>
          <Table.HeadCell>Deadline</Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {mag_arr.map((magazine) => (
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={magazine.id} // Assuming you have an "id" property for each magazine
            >
              <Table.Cell className="whitespace-nowrap font-medium text-black-900 dark:text-white">
                {magazine.name}
              </Table.Cell>

              <Table.Cell>{magazine.genres.join(" ")}</Table.Cell>
              <Table.Cell>{magazine.basicguidelines}</Table.Cell>

              <Table.Cell>
                {formatDate(magazine.submission_deadline).toLocaleDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
