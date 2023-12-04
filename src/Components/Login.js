import React from 'react';
// import {useEffect, useState } from React;
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

function Login() {
  // const [logins, setLogins] = useState(null)

  // useEffect(() => {
  //   const fetchLogins = async () => {
  //     const response = await fetch('https://localhost:4000/api/workouts')
  //     const json = await response.json()
      
  //     if (response.ok){

  //     }
  //   }

  //   fetchLogins()
  // }, [])

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
              Log in to your account
            </Heading>
            <Text color="muted">Don't have an account?</Text>
            <ChakraLink as={Link} to="/signup">
              <Button variant="link" colorScheme="black">
                Sign up
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
                  <FormLabel htmlFor="userName">Username</FormLabel>
                  <Input id="userName" type="text" />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input id="password" type="password" />
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
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </ChakraProvider>
  );
}

export default Login;
