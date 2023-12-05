import React from 'react';
import { Link } from 'react-router-dom';
import { ChakraProvider, Box, Text, Button } from '@chakra-ui/react';
import Footer from './Footer';


function Leaderboard() {
  return (
    <ChakraProvider>
      <Box bg="#f0f9ff" textAlign="center" paddingTop="20">
        <Text fontSize="2xl">TODO</Text>
        <Footer/>
      </Box>
    </ChakraProvider>
  );
}

export default Leaderboard;

