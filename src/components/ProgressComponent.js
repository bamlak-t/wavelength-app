import React from 'react';
import { Box, Text } from '@react-native-material/core';

const Component = ({ props }) => {
  const { progress, fillColor } = props;

  return (
    <Box w={'100%'} h={30} style={{ backgroundColor: fillColor, justifyContent: 'center' }}>
      <Box
        w={progress + '%'}
        h={20}
        minW={30}
        maxW={'100%'}
        style={{ backgroundColor: 'white', borderTopEndRadius: 10, borderBottomEndRadius: 10 }}
      >
        <Text variant="h7" style={{ alignSelf: 'flex-end', color: 'black' }}>
          {progress > 100 ? 100 : progress}%
        </Text>
      </Box>
    </Box>
  );
};

export default Component;
