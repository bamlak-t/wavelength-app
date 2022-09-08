import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const MainHeader = () => {
  return <Image style={styles.banner} source={require('@app/assets/images/main-bg1.jpg')} />;
};

export default MainHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    height: 300,
    maxHeight: 300,
    width: '100%',
  },
});
