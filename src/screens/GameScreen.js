import React, { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { useUser } from '@app/contexts/AppContext';
import { Stack, Button, Spacer, Text, Box } from '@react-native-material/core';
import { Spinner, PromptComponent } from '@app/components';
import { COLORS } from '@app/constants/ColorConstants';

const Screen = ({ route, navigation }) => {
  const { currentTeam, setCurrentTeam } = useUser();
  const { maxPoints } = route.params;

  console.log('maxPoints', maxPoints);

  const mapTeamName = (bool) => {
    return bool ? 'Team 2' : 'Team 1';
  };

  const goBackToHome = () => {
    navigation.navigate('home');
  };

  return (
    <ImageBackground
      source={require('@app/assets/images/wl-large1.jpg')}
      resizeMode="cover"
      style={styles.image}
    >
      <Stack fill spacing={5} style={styles.background}>
        <Text variant="h2" style={styles.teamName}>
          {mapTeamName(currentTeam)}
        </Text>
        <Spinner />
        <Stack m={40} center>
          <Box w={230} h={70} style={styles.readyBtnBg}>
            <Button
              title="Ready"
              color={COLORS.white}
              onPress={setCurrentTeam.toggle}
              style={styles.readyBtn}
              titleStyle={styles.readyBtnText}
            />
          </Box>
        </Stack>
        <Stack m={30} center>
          <PromptComponent />
        </Stack>
        <Spacer />
        <Button title="Back" color={COLORS.white} onPress={goBackToHome} />
      </Stack>
    </ImageBackground>
  );
};

export default Screen;

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.transparent,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  teamName: {
    color: COLORS.white,
    fontWeight: 'bold',
    textShadowColor: COLORS.black,
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 2,
    alignSelf: 'center',
  },
  readyBtnBg: {
    backgroundColor: COLORS.mainRed,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  readyBtn: {
    width: 200,
    height: 50,
    justifyContent: 'center',
  },
  readyBtnText: {
    fontSize: 20,
  },
});
