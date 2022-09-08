import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { Stack } from '@react-native-material/core';
import CircleSlider from '@app/components/Spinner/CircleSlider';
import { COLORS } from '@app/constants/ColorConstants';

const Screen = () => {
  const handleSpinnerChange = (value) => {
    let choice = 0;
    if (0 <= value && value <= 180) {
      choice = value > 180 ? 180 : value + 90;
    } else {
      choice = value < 270 ? 270 : value - 269;
    }
    console.log('choice', choice);
  };

  return (
    <Stack fill center style={{ backgroundColor: 'pink' }}>
      <CircleSlider
        value={90}
        onValueChange={handleSpinnerChange}
        left={270}
        right={90}
        fillColor={COLORS.white}
      />
    </Stack>
  );
};

export default Screen;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
