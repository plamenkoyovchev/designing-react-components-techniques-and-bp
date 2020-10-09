import React, { createContext } from "react";
import useRequest from "../hooks/useRequest";

const DataContext = createContext();

const DataProvider = ({ children, baseUrl, pathName }) => {
  const state = useRequest(baseUrl, pathName);
  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};

export { DataContext, DataProvider };
