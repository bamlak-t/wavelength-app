import React from 'react';
import { StyleSheet, Modal, Dimensions } from 'react-native';
import { Button, Surface, Text, VStack, Icon, Flex, Spacer } from '@react-native-material/core';
import { COLORS } from '@app/constants/ColorConstants';

const { width } = Dimensions.get('window');
const customWidth = width * 0.8;

const Component = ({ props }) => {
  const { showScores, setShowScores, scoreUpdate } = props;
  console.log('scoreUpdate', scoreUpdate);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showScores}
      onRequestClose={() => {
        setShowScores.toggle();
      }}
      style={styles.modal}
    >
      <Flex style={styles.modal}>
        <Surface elevation={5} category="medium" style={styles.container}>
          <VStack fill spacing={5} divider={true} m={4} style={styles.message}>
            <Icon name="trophy-award" size={customWidth / 2} color="gold" />
            <Text variant="h5" style={styles.title}>
              {scoreUpdate.team} got {scoreUpdate.points} points!
            </Text>
            <Spacer />
            <Button
              title="Close"
              color={COLORS.darkRed}
              onPress={() => setShowScores.toggle()}
              style={styles.showBtn}
              titleStyle={styles.showText}
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
    backgroundColor: COLORS.darkBlue,
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
    color: COLORS.white,
    fontSize: 25,
    fontWeight: 'bold',
  },
  showBtn: {
    width: customWidth / 2,
    height: 50,
    justifyContent: 'center',
  },
  showText: {
    color: COLORS.white,
    fontSize: 20,
  },
});
