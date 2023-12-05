// FindEvents.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChakraProvider, Box, Text, Button } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/useAuthContext';
import Footer from './Footer';


function FindEvents() {
  const [events, setEvents] = useState(null);
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events/') //, {
      //   headers: {
      //     'Authorization': 'Bearer ${user.token}'
      //   }
      // })
      const json = await response.json();

      if (response.ok) {
        setEvents(json);
        console.log(json);
      }
    };

    if(user){
      fetchEvents();
    }

  }, []);

  return (
    <ChakraProvider>
      <Box bg="#f0f9ff" className='home' mt={20} ml={4} mr={4}>
        <Box className='events'>
          {events &&
            events.map((event) => (
              <Box key={event._id} p={4} borderWidth="1px" borderRadius="md" mb={4}>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  {event.title}
                </Text>
                <Text>
                  Sport: {event.sport}
                </Text>
                <Text>
                  Open Spots: {event.spotsOpen}
                </Text>
                <Link to={`/event/${event._id}`}>
                  <Button bgGradient="linear(to-r, #7dd3fc, #075985)" textColor="white" size="sm" mt={2}>
                    View Details
                  </Button>
                </Link>
              </Box>
            ))}
        </Box>
        <Footer/>
      </Box>
    </ChakraProvider>
  );
}

export default FindEvents;
