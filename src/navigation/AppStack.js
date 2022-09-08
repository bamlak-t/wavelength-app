import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { AppProvider } from '@app/contexts/AppContext';
import { GameScreen, HomeScreen } from '@app/screens';

const { Navigator, Screen } = createNativeStackNavigator();

const NavigationStack = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <Navigator screenOptions={{ headerShown: false }}>
          <Screen name="home" component={HomeScreen} />
          <Screen name="game" component={GameScreen} />
        </Navigator>
      </AppProvider>
    </NavigationContainer>
  );
};

export default NavigationStack;
