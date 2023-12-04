import React from 'react';
import { Link } from 'react-router-dom';
import { ChakraProvider, Box, Text, Button } from '@chakra-ui/react';

function UserMatching() {
  return (
    <ChakraProvider>
      <Box textAlign="center" paddingTop="20">
        <Text fontSize="2xl">Match With Users</Text>
          <Button variant="primary" style={{ background: 'blue', color: 'white', margin: '10px' }}>
            Match Here!
          </Button>
      </Box>
    </ChakraProvider>
  );
}

export default UserMatching;