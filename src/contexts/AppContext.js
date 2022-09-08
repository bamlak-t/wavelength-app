import React, { useState, useContext } from 'react';
import { useBoolean } from '@react-native-material/core';

const AppContext = React.createContext();

export const useUser = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [currentTeam, setCurrentTeam] = useBoolean();
  const [userGroups, setUserGroups] = useState();

  return (
    <AppContext.Provider value={{ currentTeam, setCurrentTeam, userGroups, setUserGroups }}>
      {children}
    </AppContext.Provider>
  );
};
