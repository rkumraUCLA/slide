import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Text } from '@chakra-ui/react';

function FindEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/events')
      .then((response) => {
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setEvents(data))
      .catch((error) => setError(error.message));

  }, []);

  return (
    <ChakraProvider>
      <Box textAlign="center" paddingTop="20">
        <Text fontSize="2xl">Find Events</Text>
        {error ? (
          <p>Error fetching events: {error}</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li key={event._id}>
                <h3>{event.title}</h3>
                <p>Sport: {event.sport}</p>
                <p>Spots Open: {event.spotsOpen}</p>
                {/* Add more details as needed */}
              </li>
            ))}
          </ul>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default FindEvents;
