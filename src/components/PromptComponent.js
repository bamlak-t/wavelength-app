import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, HStack, Box, Divider } from '@react-native-material/core';
import { COLORS } from '@app/constants/ColorConstants';
import { PROMPT_BANK } from '@app/constants/PromptBank';

const Component = () => {
  console.log('PROMPT_BANK', PROMPT_BANK);

  const randIdx = Math.floor(Math.random() * PROMPT_BANK.length);
  const prompt = PROMPT_BANK[randIdx];

  console.log('prompt', prompt);

  return (
    <Box w={300} h={150} p={20} style={styles.container}>
      <HStack spacing={10} style={styles.prompt} divider={true} dividerStyle={styles.divider}>
        <Text style={styles.promptText} variant="h3">
          {prompt[0]}
        </Text>
        <Text style={styles.promptText} variant="h3">
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
