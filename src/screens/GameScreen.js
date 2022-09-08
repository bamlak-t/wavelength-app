import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, ImageBackground, Animated, Dimensions } from 'react-native';
import { useUser } from '@app/contexts/AppContext';
import { Stack, Button, Spacer, Text, Box, useBoolean } from '@react-native-material/core';
import { Spinner, PromptComponent, CoverComponent } from '@app/components';
import { COLORS } from '@app/constants/ColorConstants';

const { width } = Dimensions.get('window');
const customWidth = width * 0.95;
const customHeight = customWidth / 2;

const Screen = ({ route, navigation }) => {
  const { currentTeam, setCurrentTeam } = useUser();
  const { maxPoints } = route.params;
  const [showWL, setShowWL] = useBoolean(false);
  const showWLDuration = 5000;
  const showTransDuration = 1000;

  const rotateAngle = useRef(new Animated.Value(0.5));
  const showWLTimer = useRef(new Animated.Value(showWLDuration));

  const spin = rotateAngle.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  console.log('maxPoints', maxPoints);

  const mapTeamName = (bool) => {
    return bool ? 'Team 2' : 'Team 1';
  };

  const goBackToHome = () => {
    navigation.navigate('home');
  };

  useEffect(() => {
    Animated.timing(rotateAngle.current, {
      toValue: showWL ? 0.5 : 0,
      duration: showTransDuration,
      useNativeDriver: true,
    }).start();
  }, [showWL]);

  const handleReady = () => {
    setShowWL.toggle();

    Animated.timing(showWLTimer.current, {
      toValue: 0,
      duration: showWLDuration,
      useNativeDriver: true,
    }).start(() => {
      setShowWL.toggle();
    });
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
        <Box w={customWidth} h={customHeight} m={4} style={styles.spinner}>
          <Box w={'100%'} h={customWidth} m={4} style={styles.semiCircle}>
            <CoverComponent props={{ rotateValue: spin }}>
              <Spinner />
            </CoverComponent>
            {/* {showWL ? <Spinner /> : <CoverComponent props={{ rotateValue: spin }} />} */}
          </Box>
        </Box>
        <Stack m={40} center>
          <Box w={230} h={70} style={styles.readyBtnBg}>
            <Button
              title={showWL ? 'Done' : 'Ready'}
              color={COLORS.white}
              onPress={handleReady}
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
  semiCircle: {
    backgroundColor: COLORS.mainRed,
    borderColor: COLORS.white,
    borderRadius: customHeight,
    alignSelf: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    backgroundColor: COLORS.transparent,
    overflow: 'hidden',
    alignSelf: 'center',
  },
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
