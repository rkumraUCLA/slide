import React from 'react';
import { ChakraProvider, Box, Text } from '@chakra-ui/react';

function Home() {
  return (
    <ChakraProvider>
      {/* Use Chakra UI components to structure your layout */}
      <Box textAlign="center" position="relative" height="100vh">
        <Box position="absolute" top="30%" left="80%" transform="translate(-50%, -50%)">
          <Text fontSize="2xl">Where People and Plans Align</Text>
        </Box>
        <Box position="absolute" top="50%" left = "40%" transform="translate(-50%, -50%)">
            <Text fontSize="2xl">Picture of Slide?</Text>
        </Box>
        <Box position="absolute" bottom="20" left="50%" transform="translateX(-50%)">
          <Text fontSize="2xl">Ready, Set, Slide! Connect, Schedule, and Slide into Engaging Events</Text>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default Home;
