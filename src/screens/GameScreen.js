import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, ImageBackground, Animated, Dimensions } from 'react-native';
import { useTeam } from '@app/contexts/AppContext';
import {
  Stack,
  Button,
  Spacer,
  Text,
  Box,
  useBoolean,
  Icon,
  HStack,
} from '@react-native-material/core';
import {
  Spinner,
  PromptComponent,
  CoverComponent,
  ProgressComponent,
  GameOverComponent,
  ShowScoresComponent,
} from '@app/components';
import { COLORS } from '@app/constants/ColorConstants';
import { PROMPT_BANK } from '@app/constants/PromptBank';

const { width } = Dimensions.get('window');
const customWidth = width * 0.95;
const customHeight = customWidth / 2;

const Screen = ({ route, navigation }) => {
  const { currentTeam, setCurrentTeam, wlTarget, getWlTarget, choice } = useTeam();
  const { maxPoints } = route.params;
  const [showWL, setShowWL] = useBoolean(false);
  const rotateAngle = useRef(new Animated.Value(0));
  const closeness = useRef(0);

  const [teamPhase, setTeamPhase] = useBoolean(false);
  const [enemyTeam, setEnemyTeam] = useBoolean(false);
  const [gameOver, setGameOver] = useBoolean(false);
  const [showScores, setShowScores] = useBoolean(false);

  const [teamScores, setTeamScores] = useState({ teamA: 0, teamB: 0 });
  const [shouldBe, setShouldBe] = useState(0);
  const [prompt, setPrompt] = useState(['', '']);
  const [scoreUpdate, setScoreUpdate] = useState({ points: 0, team: true });

  const POINTS = {
    MAX: 3,
    MID: 1,
    MIN: 0,
  };
  const showWLDuration = 3000;
  const showTransDuration = 1000;

  const spin = rotateAngle.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const mapTeamName = () => {
    return currentTeam ? 'Team A' : 'Team B';
  };

  const keyToTeamName = (key) => {
    return key === 'teamA' ? 'Team A' : 'Team B';
  };

  const goBackToHome = () => {
    navigation.navigate('home');
  };

  const calculateCloseness = () => {
    const result = Math.abs(choice.current - wlTarget);
    closeness.current = result;
    if (result <= 20) {
      return true;
    }
    if (wlTarget > choice.current) {
      setShouldBe('higher');
    } else {
      setShouldBe('lower');
    }
    return false;
  };

  const getPoints = (result) => {
    if (result <= 10) {
      return POINTS.MAX;
    } else if (result <= 20) {
      return POINTS.MID;
    } else {
      return POINTS.MIN;
    }
  };

  const givePoints = (enemy = false) => {
    const points = enemy ? POINTS.MID : getPoints(closeness.current);
    const current = enemy ? !currentTeam : currentTeam;
    const team = current ? 'teamA' : 'teamB';
    const newPoints = teamScores[team] + points;
    if (newPoints >= maxPoints) {
      setGameOver.toggle();
      return;
    }
    setScoreUpdate({ points, team: keyToTeamName(team) });
    setTeamScores({ ...teamScores, [team]: newPoints });
    setShowScores.toggle();
    setCurrentTeam.toggle();
    setTeamPhase.toggle();
  };

  const getNewPrompt = () => {
    setPrompt(PROMPT_BANK[Math.floor(Math.random() * PROMPT_BANK.length)]);
  };

  useEffect(() => {
    Animated.timing(rotateAngle.current, {
      toValue: showWL ? 0.5 : 0,
      duration: showTransDuration,
      useNativeDriver: true,
    }).start();
  }, [showWL]);

  useEffect(() => {
    getNewPrompt();
  }, [currentTeam]);

  const handleReady = () => {
    getWlTarget();
    setShowWL.toggle();

    setTimeout(() => {
      setShowWL.toggle();
      setTeamPhase.toggle();
    }, showWLDuration);
  };

  const handleDone = () => {
    const close = calculateCloseness();
    if (!close) {
      setEnemyTeam.toggle();
    } else {
      givePoints();
    }
  };

  const handleEnemyTeamSelect = (guess) => {
    givePoints(guess === shouldBe);
    setEnemyTeam.toggle();
  };

  return (
    <ImageBackground
      source={require('@app/assets/images/wl-large1.jpg')}
      resizeMode="cover"
      style={styles.image}
    >
      <GameOverComponent
        props={{
          gameOver: gameOver,
          winningTeam: mapTeamName(),
          handleStartAgain: goBackToHome,
        }}
      />
      {!gameOver && <ShowScoresComponent props={{ showScores, setShowScores, scoreUpdate }} />}

      <Stack fill spacing={5} style={styles.background}>
        <ProgressComponent
          props={{
            progress: Math.round((teamScores.teamA / maxPoints) * 100),
            fillColor: COLORS.darkRed,
          }}
        />
        <ProgressComponent
          props={{
            progress: Math.round((teamScores.teamB / maxPoints) * 100),
            fillColor: COLORS.darkBlue,
          }}
        />
        <Text variant="h2" style={styles.teamName}>
          {mapTeamName()}
        </Text>
        <Box w={customWidth} h={customHeight} m={4} style={styles.spinner}>
          <Box w={'100%'} h={customWidth} m={4} style={styles.semiCircle}>
            <CoverComponent props={{ rotateValue: spin }}>
              <Spinner />
            </CoverComponent>
          </Box>
        </Box>
        <Stack m={40} center>
          {enemyTeam ? (
            <HStack spacing={50}>
              <Box w={130} h={100} style={styles.lower}>
                <Button
                  title="Lower"
                  color={COLORS.white}
                  onPress={() => handleEnemyTeamSelect('lower')}
                  style={styles.enemyTeamSelectBtn}
                  titleStyle={styles.readyBtnText}
                />
              </Box>
              <Box w={130} h={100} style={styles.higher}>
                <Button
                  title="Higher"
                  color={COLORS.white}
                  onPress={() => handleEnemyTeamSelect('higher')}
                  style={styles.enemyTeamSelectBtn}
                  titleStyle={styles.enemyTeamSelectText}
                />
              </Box>
            </HStack>
          ) : (
            <Box w={230} h={70} style={styles.readyBtnBg}>
              {showWL ? (
                <Icon name="clock" size={50} color={COLORS.mainRed} />
              ) : (
                <Button
                  title={teamPhase ? 'Done' : 'Ready'}
                  color={COLORS.darkBlue}
                  onPress={teamPhase ? handleDone : handleReady}
                  style={styles.readyBtn}
                  titleStyle={styles.enemyTeamSelectText}
                />
              )}
            </Box>
          )}
        </Stack>
        <Stack m={30} center>
          <PromptComponent props={{ prompt }} />
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
    backgroundColor: COLORS.white,
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
  lower: {
    backgroundColor: COLORS.darkRed,
    justifyContent: 'center',
    borderRadius: 20,
    padding: 10,
  },
  higher: {
    backgroundColor: COLORS.darkBlue,
    justifyContent: 'center',
    borderRadius: 20,
    padding: 10,
  },
  enemyTeamSelectBtn: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  enemyTeamSelectText: {
    fontSize: 15,
  },
});
