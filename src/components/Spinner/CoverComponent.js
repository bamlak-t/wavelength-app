import React, { useEffect } from 'react';
import { StyleSheet, Animated, Dimensions, ImageBackground } from 'react-native';
import { Button, Surface, Text, TextInput, VStack, Switch } from '@react-native-material/core';
import { withAnchorPoint } from 'react-native-anchor-point';

const { width } = Dimensions.get('window');
const customWidth = width * 0.95;
const customHeight = customWidth / 2;

const Component = ({ props, children }) => {
  const { rotateValue } = props;

  const getTransform = () => {
    let transform = {
      transform: [{ perspective: 400 }, { rotateZ: rotateValue }],
    };
    return withAnchorPoint(transform, { x: 0.5, y: 1 }, { customWidth, customHeight });
  };

  return (
    <Animated.View style={[styles.cover, getTransform()]}>
      <ImageBackground
        source={require('@app/assets/images/main-bg1.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        {children}
      </ImageBackground>
    </Animated.View>
  );
};

export default Component;

const styles = StyleSheet.create({
  cover: {
    // flex: 1,
    width: customWidth,
    height: customWidth,
    alignSelf: 'center',
    borderRadius: customHeight,
    overflow: 'hidden',
  },
  image: {
    height: customHeight,
    width: customWidth,
    // justifyContent: 'center',
  },
});
