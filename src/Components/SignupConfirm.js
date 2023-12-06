import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function SignupConfirm() {
  console.log("HELLO");
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      mt={20}
      ml={10}
      mr={10}
      bgGradient="linear(to-r, #f0f9ff, #38bdf8, #075985)"
    >
      <Text fontSize="xl" fontWeight="bold" color="#082f49">
        Congratulations! You have slid into this event!
      </Text>
    </Box>
  );
}

export default SignupConfirm;
