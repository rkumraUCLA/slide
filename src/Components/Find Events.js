// FindEvents.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChakraProvider, Box, Text, Button } from '@chakra-ui/react';

function FindEvents() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events/');
      const json = await response.json();

      if (response.ok) {
        setEvents(json);
        console.log(json);
      }
    };

    fetchEvents();
  }, []);

  return (
    <ChakraProvider>
      <Box className='home' mt={20} ml={4} mr={4}>
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
                  <Button colorScheme="teal" size="sm" mt={2}>
                    View Details
                  </Button>
                </Link>
              </Box>
            ))}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default FindEvents;
