import React from 'react';
import { Link } from 'react-router-dom';
import { ChakraProvider, Box, Text, Button } from '@chakra-ui/react';

function MyEvents() {
  return (
    <ChakraProvider>
      <Box textAlign="center" paddingTop="20">
        <Text fontSize="2xl">My Events Page</Text>
        <Link to="/create-event">
          <Button variant="primary" style={{ background: 'blue', color: 'white', margin: '10px' }}>
            Create Event
          </Button>
        </Link>
      </Box>
    </ChakraProvider>
  );
}

export default MyEvents;

