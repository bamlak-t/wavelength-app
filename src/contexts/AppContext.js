import React, { useState, useContext, useRef } from 'react';
import { useBoolean } from '@react-native-material/core';
import { ANGLE_RANGE } from '@app/constants/CommonConstants';

const AppContext = React.createContext();

export const useTeam = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [currentTeam, setCurrentTeam] = useBoolean(true);
  const [wlTarget, setWlTarget] = useState();
  const choice = useRef();

  const getWlTarget = () => {
    const newTarget = Math.abs(
      Math.floor(Math.random() * (360 - ANGLE_RANGE.min + ANGLE_RANGE.max))
    );
    setWlTarget(newTarget);
    return newTarget;
  };

  return (
    <AppContext.Provider
      value={{
        currentTeam,
        setCurrentTeam,
        wlTarget,
        getWlTarget,
        choice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
