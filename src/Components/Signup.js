import React from 'react';
import { useState } from 'react';
import { useSignup } from "../hooks/useSignup"

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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUser] = useState('')
  const [fullName, setName] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password, username, fullName)
  }

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
          <form onSubmit = {handleSubmit}>
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
                    <Input 
                      id="fullName" 
                      type="text" 
                      onChange={(e) => setName(e.target.value)}
                      value={fullName}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input 
                      id="username" 
                      type="text" 
                      onChange={(e) => setUser(e.target.value)}
                      value={username}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input 
                      id="email" 
                      type="email" 
                      onChange={(e) => setEmail(e.target.value)} 
                      value = {email}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input 
                      id="password" 
                      type="password" 
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
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
                    onClick= {handleSubmit}
                    disabled = {isLoading}
                  >
                    Sign up
                  </Button>
                  {error && <div className="error">(error)</div>}
                </Stack>
              </Stack>
            </Box>
          </form>  
        </Stack>
      </Container>
    </ChakraProvider>
  );
}

export default Signup;
