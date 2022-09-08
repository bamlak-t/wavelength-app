import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableHighlight, Dimensions, Animated } from 'react-native';
import { Box } from '@react-native-material/core';
import { COLORS } from '@app/constants/ColorConstants';
// import CircleSlider from 'react-native-circle-slider';
import CircleSlider from './CircleSlider';

const { width } = Dimensions.get('window');
const customWidth = width * 0.95;
const customHeight = customWidth / 2;
const ANGLERANGE = {
  min: 280,
  max: 80,
};

const Spinner = () => {
  const choice = useRef();
  // const rotateAngle = useRef(new Animated.Value(0));
  // Animated.timing(rotateAngle.current, {
  //   toValue: 1,
  //   duration: 5000,
  //   useNativeDriver: true,
  // }).start();
  // const spin = rotateAngle.current.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '360deg'],
  // });

  const handleSpinnerChange = (value) => {
    if (0 <= value && value <= 180) {
      choice.current = value > 180 ? 180 : value + 90;
    } else {
      choice.current = value < 270 ? 270 : value - 269;
    }
  };

  return (
    <Box w={customWidth} h={customHeight} m={4} style={styles.spinner}>
      <Box w={'100%'} h={customWidth} m={4} style={styles.semiCircle}>
        <CircleSlider
          value={0}
          dialRadius={customHeight - 20}
          btnRadius={20}
          onValueChange={handleSpinnerChange}
          left={ANGLERANGE.min}
          right={ANGLERANGE.max}
          fillColor={COLORS.white}
        />
      </Box>
    </Box>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  spinner: {
    backgroundColor: COLORS.transparent,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  semiCircle: {
    backgroundColor: COLORS.mainRed,
    borderColor: COLORS.white,
    borderRadius: customHeight,
    alignSelf: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  slider: {
    transform: [{ rotate: '-90deg' }],
    dialRadius: customWidth,
  },
});
