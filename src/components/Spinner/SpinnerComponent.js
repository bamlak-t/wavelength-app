import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableHighlight, Dimensions, Animated } from 'react-native';
import { Box } from '@react-native-material/core';
import { COLORS } from '@app/constants/ColorConstants';
import { ANGLE_RANGE } from '@app/constants/CommonConstants';
import CircleSlider from './CircleSlider';
import { useTeam } from '@app/contexts/AppContext';

const { width } = Dimensions.get('window');
const customWidth = width * 0.95;
const customHeight = customWidth / 2;

const Spinner = () => {
  const { currentTeam, setCurrentTeam, wlTarget, getWlTarget, choice } = useTeam();

  const handleSpinnerChange = (value) => {
    if (0 <= value && value <= 180) {
      choice.current = value > 180 ? 180 : value + 90;
    } else {
      choice.current = value < 270 ? 270 : value - 269;
    }
  };

  return (
    <CircleSlider
      value={0}
      dialRadius={customHeight - 20}
      btnRadius={20}
      onValueChange={handleSpinnerChange}
      left={ANGLE_RANGE.min}
      right={ANGLE_RANGE.max}
      fillColor={COLORS.white}
      wlTargetAngle={wlTarget + 100}
    />
  );
};

export default Spinner;
