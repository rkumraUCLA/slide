import React from 'react';
import Select from 'react-select';
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
  const [userName, setUser] = useState('')
  const [fullName, setName] = useState('')
  const [age, setAge] = useState('')
  const [sports, setSports] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password, userName, fullName, age, sports)
  }

  const sportsOptions = [
    { value: 'aikido', label: 'Aikido' },
    { value: 'archery', label: 'Archery' },
    { value: 'badminton', label: 'Badminton' },
    { value: 'baseball', label: 'Baseball' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'bmx', label: 'BMX' },
    { value: 'boxing', label: 'Boxing' },
    { value: 'cricket', label: 'Cricket' },
    { value: 'cycling', label: 'Cycling' },
    { value: 'diving', label: 'Diving' },
    { value: 'equestrian', label: 'Equestrian' },
    { value: 'fencing', label: 'Fencing' },
    { value: 'football', label: 'Football' },
    { value: 'golf', label: 'Golf' },
    { value: 'gymnastics', label: 'Gymnastics' },
    { value: 'handball', label: 'Handball' },
    { value: 'ice hockey', label: 'Ice Hockey' },
    { value: 'judo', label: 'Judo' },
    { value: 'karate', label: 'Karate' },
    { value: 'lacrosse', label: 'Lacrosse' },
    { value: 'martial arts', label: 'Martial Arts' },
    { value: 'mountain biking', label: 'Mountain Biking' },
    { value: 'rowing', label: 'Rowing' },
    { value: 'rugby', label: 'Rugby' },
    { value: 'sailing', label: 'Sailing' },
    { value: 'skateboarding', label: 'Skateboarding' },
    { value: 'skiing', label: 'Skiing' },
    { value: 'snowboarding', label: 'Snowboarding' },
    { value: 'soccer', label: 'Soccer' },
    { value: 'surfing', label: 'Surfing' },
    { value: 'swimming', label: 'Swimming' },
    { value: 'table tennis', label: 'Table Tennis' },
    { value: 'taekwondo', label: 'Taekwondo' },
    { value: 'tennis', label: 'Tennis' },
    { value: 'track and field', label: 'Track and Field' },
    { value: 'triathlon', label: 'Triathlon' },
    { value: 'volleyball', label: 'Volleyball' },
    { value: 'water polo', label: 'Water Polo' },
    { value: 'weightlifting', label: 'Weightlifting' },
    { value: 'wrestling', label: 'Wrestling' },
    { value: 'squash', label: 'Squash' }, // Adjusted to maintain alphabetical order
  ]

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
                    <FormLabel htmlFor="fullName">Full Name</FormLabel>
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
                      id="userName" 
                      type="text" 
                      onChange={(e) => setUser(e.target.value)}
                      value={userName}
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
                  <FormControl>
                    <FormLabel htmlFor="Age">Age</FormLabel>
                    <Input 
                      id="age" 
                      type="number" 
                      onChange={(e) => setAge(e.target.value)}
                      value={age}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="sports">Sports You Play</FormLabel>
                    <Select
                      id="sports" 
                      options={sportsOptions} 
                      isMulti
                      onChange={(selectedOptions) => 
                        setSports(selectedOptions.map(option => option.value))
                      }
                    >
                    </Select>
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
