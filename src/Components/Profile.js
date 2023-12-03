import React from 'react';
import { ChakraProvider, Box, Text } from '@chakra-ui/react';


function Profile() {
    return (
        <ChakraProvider>
          <Box textAlign="center" paddingTop="20">
            <Text fontSize="2xl">Implement Profile Settings</Text>
          </Box>
        </ChakraProvider>
      );

}

export default Profile