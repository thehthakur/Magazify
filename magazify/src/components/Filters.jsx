"use client";
import { Dropdown } from "flowbite-react";
import { Datepicker } from "flowbite-react";

function Filters() {
  return (
    <div className="flex flex-row justify-center mt-5">
      <Dropdown label="Genre" dismissOnClick={false}>
        <Dropdown.Item>Mystery</Dropdown.Item>
        <Dropdown.Item>Speculative</Dropdown.Item>
        <Dropdown.Item>Poetry</Dropdown.Item>
        <Dropdown.Item>Non-Fiction</Dropdown.Item>
        <Dropdown.Item>Translation</Dropdown.Item>
      </Dropdown>

      <Datepicker minDate={new Date()} />
    </div>
  );
}

export default Filters;
