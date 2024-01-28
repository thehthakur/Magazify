"use client"
import React, { createContext, useContext, useState } from "react";

const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const setGenre = (genre) => {
    setSelectedGenre(genre);
  };

  const setDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <FiltersContext.Provider
      value={{ selectedGenre, selectedDate, setGenre, setDate }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }
  return context;
};
