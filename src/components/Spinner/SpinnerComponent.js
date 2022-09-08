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

  const handleSpinnerChange = (value) => {
    if (0 <= value && value <= 180) {
      choice.current = value > 180 ? 180 : value + 90;
    } else {
      choice.current = value < 270 ? 270 : value - 269;
    }
    console.log('choice', choice.current);
  };

  return (
    <CircleSlider
      value={0}
      dialRadius={customHeight - 20}
      btnRadius={20}
      onValueChange={handleSpinnerChange}
      left={ANGLERANGE.min}
      right={ANGLERANGE.max}
      fillColor={COLORS.white}
    />
  );
};

export default Spinner;

const styles = StyleSheet.create({
  test: {},
});
