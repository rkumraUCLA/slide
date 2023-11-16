import React from 'react';
import { ChakraProvider, Box, Text } from '@chakra-ui/react';


function MyEvents() {
    return (
        <ChakraProvider>
          {/* Use Chakra UI components to structure your layout */}
          <Box textAlign="center" paddingTop="20">
            <Text fontSize="2xl">TODO</Text>
          </Box>
        </ChakraProvider>
      );

}

export default MyEvents