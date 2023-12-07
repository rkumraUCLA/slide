import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChakraProvider, Box, Text, Button } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/useAuthContext';

function FindEvents() {
  const [events, setEvents] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events/');
      const json = await response.json();

      if (response.ok) {
        setEvents(json);
        console.log(json);
      }
    };

    if (user) {
      fetchEvents();
    }
  }, []);

  return (
    <ChakraProvider>
      <Box mt="100px" bg="white" className='home' ml={4} mr={4}>
        <Box vclassName='events' display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={4}>
          {events &&
            events.map((event) => (
              <Link key={event._id} to={`/event/${event._id}`} style={{ textDecoration: 'none' }}>
                <Box
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  mb={4}
                  bg="#f0f9ff"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  textAlign="center"
                  transition="background-color 0.3s ease-in-out"
                  _hover={{ bg: '#bee3f8' }}
                >
                  <Text fontSize="lg" fontWeight="bold" mb={2}>
                    {event.title}
                  </Text>
                  <Text>
                    Sport: {event.sport}
                  </Text>
                  <Text>
                    Open Spots: {event.spotsOpen}
                  </Text>
                  <Button
                    bgGradient="linear(to-r, #7dd3fc, #075985)"
                    textColor="white"
                    size="sm"
                    mt={2}
                    _hover={{ bgGradient: 'linear(to-r, #56a9e1, #05436d)' }}
                  >
                    View Details
                  </Button>
                </Box>
              </Link>
            ))}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default FindEvents;
