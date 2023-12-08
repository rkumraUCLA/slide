// Footer.jsx

//We wanted to implement a footer, but had issues with fixing it to the bottom of the page regardless of viewport size.
// Keeping this code here just to record that we did try and that we are eager to learn how to properly implement it later.

import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="#082f49" color="white" p={6} textAlign="center" position="relative" bottom="0" left="0" right="0" marginTop="auto">
      <Text>&copy; Ur mom. We don't know how to copyright this.</Text>
    </Box>
  );
};

export default Footer;
