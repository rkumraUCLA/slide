import React from 'react';
import { Link } from 'react-router-dom';
import { ChakraProvider, Box, Button, Flex} from '@chakra-ui/react';
import Footer from './Footer';

function MyEvents() {
  return (
    <ChakraProvider>
      <Box textAlign="center" paddingTop="20">
        <Flex justifyContent="flex-end">
          <Link to="/create-event">
            <Button variant="primary" style={{ background: '#075985', color: 'white', margin: '10px' }}>
              Create Event
            </Button>
          </Link>
        </Flex>
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default MyEvents;
