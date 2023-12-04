// FindEvents.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChakraProvider, Box, Text, Button } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/useAuthContext';

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
      <Box className='home' mt={20} ml={4} mr={4}>
        <Box className='events'>
          {events &&
            events.map((event) => (
              <Box key={event._id} p={4} borderWidth="1px" borderRadius="md" mb={4}>
                <Text fontSize="lg" fontWeight="bold">
                  {event.title}
                </Text>
                <Text>
                  Sport: {event.sport}, Open Spots: {event.spotsOpen}
                </Text>
                <Link to={`/event/${event._id}`}>
                  <Button mt={2} colorScheme="teal" size="sm">
                    View Details
                  </Button>
                </Link>
              </Box>
            ))}
        </Box>
      </Box>
    </ChakraProvider>
  );
};
export default FindEvents;
