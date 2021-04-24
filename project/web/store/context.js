import React from "react";

export const initialValues = {
  sectorList: [],
};

const AppContext = React.createContext({ ...initialValues });

export default AppContext;
