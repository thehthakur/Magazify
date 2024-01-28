import Link from "next/link";
import { Table } from "flowbite-react";

export default function Magazine_Entry({ filteredList }) {
  const formatDate = (dateString) => {
    const fullDateString = dateString + " 2024";
    return new Date(fullDateString);
  };

  return (
    <>
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
            {formatDate(magazine.submission_deadline).toLocaleDateString()}
          </Table.Cell>
        </Table.Row>
      ))}
    </>
  );
}
