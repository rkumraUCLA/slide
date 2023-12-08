import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChakraProvider, Box, Button, Flex, Text } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/useAuthContext';

function MyEvents() {
  const userId = localStorage.getItem('userId');
  const { user } = useAuthContext();
  const [events, setEvents] = useState(null);
  // const [eventId, setEventId] = useState(null);

  const handleSubmit = async (eventId) => {
    try {
      const jsonId = { myEvents: eventId };
      console.log(JSON.stringify(jsonId));
      console.log(userId);

      const response2 = await fetch(`/api/user/removeEvent/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(jsonId),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response2.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedUser = await response2.json();
      console.log('User updated:', updatedUser);

      // Update the local state by filtering out the removed event
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error('Failed to remove event:', error);
    }
  }

  useEffect(() => {
    const fetchUserEvents = async () => {
      const response = await fetch(`/api/user/getUserEvents/${userId}`);
      const json = await response.json();

      if (response.ok) {
        setEvents(json);
        console.log(json);
      }
    };

    if (user) {
      fetchUserEvents();
    } else {
      console.log("no user");
    }
  }, []);

  return (
    <ChakraProvider>
      <Box bg="white" className="home" mt="102px" ml={4} mr={4} style={{ zIndex: 1 }}>
        <Box
          className="events"
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          gap={4}
          style={{ zIndex: 3 }}
        >
          {events &&
            events.map((event) => (
              <Box
                key={event._id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                mb={4}
                style={{ zIndex: 3, backgroundColor: '#f0f9ff' }}
              >
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  {event.title}
                </Text>
                <Text>Sport: {event.sport}</Text>
                <Text>Date: {new Date(event.eventDate).toLocaleDateString('en-US')}</Text>
                <Text>Time: {event.eventTime}</Text>
                <Text>Location: {event.location}</Text>
                <Text></Text>
                <Button
                  mt={4}
                  bg="#0284c7"
                  color="white"
                  size="sm"
                  onClick={() => handleSubmit(event._id)}
                >
                  Slide Out
                </Button>
              </Box>

            ))}
        </Box>
      </Box>
      <Box textAlign="center" paddingTop="20">
        <Flex justifyContent="flex-end">
          <Link to="/create-event">
            <Button mt="5vh" variant="primary" style={{ background: 'linear-gradient(to right, #7dd3fc, #075985)', color: 'white', margin: '10px', fontSize: '1.5rem', zIndex: 1000 }} size="lg">
              Create Event
            </Button>
          </Link>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default MyEvents;
