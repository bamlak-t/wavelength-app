import React from 'react';
import { StyleSheet, Modal, Dimensions } from 'react-native';
import { Button, Surface, Text, VStack, Icon, Flex } from '@react-native-material/core';
import { COLORS } from '@app/constants/ColorConstants';

const { width } = Dimensions.get('window');
const customWidth = width * 0.8;

const Component = ({ props }) => {
  const { gameOver, winningTeam, handleStartAgain } = props;
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={gameOver}
      onRequestClose={() => {
        handleStartAgain();
      }}
      style={styles.modal}
    >
      <Flex style={styles.modal}>
        <Surface elevation={5} category="medium" style={styles.container}>
          <VStack fill spacing={5} divider={true} m={4} style={styles.message}>
            <Icon name="trophy" size={customWidth / 2} color="gold" />
            <Text variant="h4" style={styles.title}>
              {winningTeam} won!
            </Text>
            <Button
              title="Again?"
              color={COLORS.mainRed}
              onPress={handleStartAgain}
              style={styles.againBtn}
              titleStyle={styles.againText}
            />
          </VStack>
        </Surface>
      </Flex>
    </Modal>
  );
};

export default Component;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: customWidth,
    height: 300,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  message: {
    width: customWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  againBtn: {
    width: customWidth / 2,
    height: 50,
    justifyContent: 'center',
  },
  againText: {
    color: COLORS.white,
    fontSize: 20,
  },
});
