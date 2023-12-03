import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Text } from '@chakra-ui/react';

function FindEvents() {
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/events')
      .then((response) => {
        console.log('Response:', response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('Content-Type');

        if (!contentType || !contentType.includes('text/html')) {
          throw new Error('Invalid content type. Expected HTML.');
        }

        return response.text();
      })
      .then((htmlData) => {
        console.log('HTML Content:', htmlData);
        document.getElementById('yourHtmlContainerId').innerHTML = htmlData;
      })
      .catch((error) => {
        console.error('Error:', error);
        setError(error.message);
      });
  }, []);

  return (
    <ChakraProvider>
      <Box textAlign="center" paddingTop="20">
        <Text fontSize="2xl"></Text>
        {error ? (
          <p>Error fetching events: {error}</p>
        ) : (
          <div id="yourHtmlContainerId"></div>
        )}
      </Box>
    </ChakraProvider>
  );
}

export default FindEvents;
