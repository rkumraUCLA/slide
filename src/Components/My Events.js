// MyEvents.js

import React from 'react';
import { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { ChakraProvider, Box, Text, Button } from '@chakra-ui/react';

const MyEvents = () => {
  const [events, setEvents] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events/')
      const json = await response.json()

      if(response.ok){
        setEvents(json)
        console.log(json)
      }
    }

    fetchEvents()
  }, [])

  return (
      <ChakraProvider>
        {/* Use Chakra UI components to structure your layout */}
        <Box textAlign="center" paddingTop="20">
          <Text fontSize="2xl">TODO</Text>
          <Text >{events && events.map((events) => (
            <p key ={events._id}></p>
          ))}</Text>
        </Box>
      </ChakraProvider>
    );

}

export default MyEvents;
