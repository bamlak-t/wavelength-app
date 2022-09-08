import React, { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { useUser } from '@app/contexts/AppContext';
import { Icon, Stack, Button, Spacer, Text, Box } from '@react-native-material/core';
import { Spinner, PromptComponent } from '@app/components';
import { COLORS } from '@app/constants/ColorConstants';
import Slider from '@react-native-community/slider';

const Screen = ({ navigation }) => {
  const [maxPoints, setMaxPoints] = useState(0);

  const handleStartGame = () => {
    console.log('start game');
    navigation.navigate('game', { maxPoints });
  };

  return (
    <ImageBackground
      source={require('@app/assets/images/wl-large1.jpg')}
      resizeMode="cover"
      style={styles.image}
    >
      <Stack center fill spacing={5} style={styles.background}>
        <Spacer />

        <Text variant="h3" style={styles.teamName}>
          Welcome
        </Text>
        <Text variant="h5" style={styles.teamName}>
          Max Points : {maxPoints}
        </Text>
        <Slider
          style={styles.pointSlider}
          minimumValue={0}
          maximumValue={15}
          minimumTrackTintColor={COLORS.white}
          maximumTrackTintColor={COLORS.black}
          thumbTintColor={COLORS.white}
          step={1}
          onValueChange={(value) => setMaxPoints(value)}
        />
        <Stack m={40} center>
          <Box w={230} h={70} style={styles.readyBtnBg}>
            <ImageBackground
              source={require('@app/assets/images/main-bg1.jpg')}
              resizeMode="cover"
              style={styles.image}
            >
              <Button
                title="START GAME"
                color={COLORS.transparent}
                onPress={handleStartGame}
                style={styles.readyBtn}
                titleStyle={styles.readyBtnText}
              />
            </ImageBackground>
          </Box>
        </Stack>
        <Spacer />
        <Text variant="h6" style={styles.teamName}>
          B.T.
        </Text>
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
  pointSlider: {
    height: 50,
    width: 350,
    transform: [{ scaleY: 2 }],
  },
  pointsInput: {
    fontSize: 20,
  },
  readyBtnBg: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
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
