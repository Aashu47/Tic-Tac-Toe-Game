import React, { createContext, useState } from "react";

// Create the context
export const SearchContext = createContext();

// SearchContext Provider component
export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState(""); // Global search state

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
