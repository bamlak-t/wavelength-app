import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, HStack, Box } from '@react-native-material/core';
import { COLORS } from '@app/constants/ColorConstants';

const Component = ({ props }) => {
  const { prompt } = props;

  return (
    <Box w={300} h={120} p={20} style={styles.container}>
      <HStack spacing={10} style={styles.prompt} divider={true} dividerStyle={styles.divider}>
        <Text style={styles.promptText} variant="h5">
          {prompt[0]}
        </Text>
        <Text style={styles.promptText} variant="h5">
          {prompt[1]}
        </Text>
      </HStack>
    </Box>
  );
};

export default Component;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.mainRed,
    alignSelf: 'center',
    borderRadius: 20,
  },
  prompt: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: 'center',
  },
  promptText: {
    flex: 1,
    color: COLORS.black,
    textAlign: 'center',
  },
  divider: {
    color: COLORS.black,
    height: 80,
    width: 2,
  },
});
