import React from 'react';
import { Link } from 'react-router-dom';
import { ChakraProvider, Box, Text, Button } from '@chakra-ui/react';
import Footer from './Footer';


function MyEvents() {
  return (
    <ChakraProvider>
      <Box textAlign="center" paddingTop="20">
        <Text fontSize="2xl">My Events Page</Text>
        <Link to="/create-event">
          <Button variant="primary" style={{ background: '#075985', color: 'white', margin: '10px' }}>
            Create Event
          </Button>
        </Link>
        <Footer/>
      </Box>
    </ChakraProvider>
  );
}

export default MyEvents;

