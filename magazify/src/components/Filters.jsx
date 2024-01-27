"use client";
import { Dropdown } from "flowbite-react";

function Filters() {
  return (
    <div className="flex flex-row justify-center mt-5">
      <Dropdown label="Genre" dismissOnClick={false}>
        
        <Dropdown.Item>Fiction</Dropdown.Item>
        <Dropdown.Item>Poetry</Dropdown.Item>
        <Dropdown.Item>Creative Non-Fiction</Dropdown.Item>
        <Dropdown.Item>Translation</Dropdown.Item>
      </Dropdown>

      <Dropdown label="Deadline" dismissOnClick={false}>
        <Dropdown.Item>Jan</Dropdown.Item>
        <Dropdown.Item>Feb</Dropdown.Item>
        <Dropdown.Item>March</Dropdown.Item>
        <Dropdown.Item>April</Dropdown.Item>
        <Dropdown.Item>May</Dropdown.Item>
        <Dropdown.Item>June</Dropdown.Item>
        <Dropdown.Item>July</Dropdown.Item>
        <Dropdown.Item>August</Dropdown.Item>
        <Dropdown.Item>September</Dropdown.Item>
        <Dropdown.Item>October</Dropdown.Item>
        <Dropdown.Item>November</Dropdown.Item>
        <Dropdown.Item>December</Dropdown.Item>
      </Dropdown>
    </div>
  );
}

export default Filters;
