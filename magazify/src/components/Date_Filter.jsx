"use client"
import React from "react";
import { Datepicker } from "flowbite-react";
import { useFilters } from "./FiltersContext";

function DateFilter() {
  const { setDate } = useFilters();

  const handleDateChange = (event) => {
    console.log(event.target.value);
    setDate(event.target.value);
  };

  return (
    <>
      <Datepicker minDate={new Date()} onSelect={handleDateChange} />
    </>
  );
}

export default DateFilter;
