// import React, { useEffect } from 'react';
// import { StyleSheet, Animated } from 'react-native';
// import { Button, Surface, Text, TextInput, VStack, Switch } from '@react-native-material/core';
// import { withAnchorPoint } from 'react-native-anchor-point';
// import { COLORS } from '../../constants/ColorConstants';

// const Component = ({ props }) => {
//   const { rotateValue, width, height } = props;

//   useEffect(() => {
//     console.log(rotateValue, width, height);
//   }, []);

//   const getTransform = () => {
//     let transform = {
//       transform: [{ perspective: 400 }, { rotateZ: rotateValue }],
//     };
//     return withAnchorPoint(transform, { x: 0.5, y: 1 }, { width, height });
//   };

//   return <Animated.View style={[styles.arrow, getTransform()]} />;
// };

// export default Component;

// const styles = StyleSheet.create({
//   arrow: {
//     flex: 1,
//     backgroundColor: COLORS.black,
//     width: 20,
//     alignSelf: 'center',
//   },
// });
