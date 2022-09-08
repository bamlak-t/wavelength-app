import React from 'react';
import NavigationStack from '@app/navigation/AppStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { IconComponentProvider } from '@react-native-material/core';

const App = () => {
  return (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <NavigationStack />
    </IconComponentProvider>
  );
};

export default App;
