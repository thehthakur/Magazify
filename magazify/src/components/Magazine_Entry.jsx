
"use client";

import { Table } from "flowbite-react";

export default function Magazine_Entry({ mag_arr }) {
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
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {magazine.name}
              </Table.Cell>
              <Table.Cell>{magazine.genre.join(' ')}</Table.Cell>
              <Table.Cell>{magazine.guideline}</Table.Cell>
              <Table.Cell>{magazine.deadline}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

    </div>
  );
}
