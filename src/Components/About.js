import React from 'react';
import { ChakraProvider, Box, Text } from '@chakra-ui/react';


function About() {
    return (
        <ChakraProvider>
          <Box textAlign="center" paddingTop="20">
            <Text fontSize="2xl">TODO</Text>
          </Box>
        </ChakraProvider>
      );

}

export default About;