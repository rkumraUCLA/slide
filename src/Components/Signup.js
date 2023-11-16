import React from 'react';
import {
  Container,
  Stack,
  Heading,
  Text,
  Button,
  Link as ChakraLink,
  Box,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Flex,
} from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <ChakraProvider>
      <Container
        maxW="lg"
        py={{
          base: '12',
          md: '24',
        }}
        px={{
          base: '0',
          sm: '8',
        }}
      >
        <Stack spacing="8">
          <Flex
            direction="column"
            align="center"
          >
            <Heading
              size={{
                base: 'xs',
                md: 'lg',
              }}
              style={{
                textAlign: 'center',
                padding: '0px',
              }}
            >
              Sign up for an account
            </Heading>
            <Text color="muted">Have an Account?</Text>
            <ChakraLink as={Link} to="/login">
              <Button variant="link" colorScheme="black">
                Log in
              </Button>
            </ChakraLink>
          </Flex>
          <Box
            py={{
              base: '0',
              sm: '8',
            }}
            px={{
              base: '4',
              sm: '10',
            }}
            bg={{
              base: 'transparent',
              sm: 'bg-surface',
            }}
            boxShadow={{
              base: 'none',
              sm: 'md',
            }}
            borderRadius={{
              base: 'none',
              sm: 'xl',
            }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
              <FormControl>
                  <FormLabel htmlFor="fullname">Full Name</FormLabel>
                  <Input id="username" type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input id="username" type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input id="password" type="password" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                  <Input id="confirmPassword" type="password" />
                </FormControl>
              </Stack>
              <Divider />
              <Stack spacing="6">
                <Button
                  variant="primary"
                  style={{
                    background: 'blue',
                    color: 'white',
                    margin: '10px',
                  }}
                >
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </ChakraProvider>
  );
}

export default Signup;
