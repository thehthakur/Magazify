"use client";
import React, { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import { useFilters } from "./FiltersContext";

function GenreFilter() {
  const { setGenre } = useFilters();
  const [defaultGenre, setDefaultGenre] = useState("Fiction");

  useEffect(() => {
    setGenre(defaultGenre);
  }, [setGenre, defaultGenre]);

  const handleGenreChange = (selectedGenre) => {
    setGenre(selectedGenre);
  };

  return (
    <>
      <Dropdown label="Genre" dismissOnClick={false}>
        <Dropdown.Item onClick={() => handleGenreChange("Fiction")}>
          Fiction
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleGenreChange("Poetry")}>
          Poetry
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => handleGenreChange("Creative Non-Fiction")}
        >
          Creative Non-Fiction
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleGenreChange("Translation")}>
          Translation
        </Dropdown.Item>
      </Dropdown>
    </>
  );
}

export default GenreFilter;
