import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/useAuthContext';

function FindUserMatch() {
  const [matchedUsers, setMatchedUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`/api/user/getUserById/${userId}`);
      const userData = await response.json();
      const sportsArray = userData.sports;
      console.log(sportsArray);
      try {
        const response = await fetch('/api/user/getUsers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sports: sportsArray }),
        });

        const json = await response.json();
        console.log('API Response:', json);

        if (response.ok) {
          setMatchedUsers(json);
        } else {
          console.error('API Error:', json); // Log any error response
        }
      } catch (error) {
        console.error('Fetch Error:', error); // Log fetch-related errors
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      mt={20}
      ml={10}
      mr={10}
      bgGradient="linear(to-r, #f0f9ff, #38bdf8, #075985)"
    >
      <Text>TODO</Text>
    </Box>
  );
}

export default FindUserMatch;












/*import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/useAuthContext';


function FindUserMatch() {
  const [matchedUsers, setMatchedUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const userId = localStorage.getItem('userId');
      const response = await fetch(`/api/user/getUserById/${userId}`);
      const userData = await response.json();
      const sportsArray = userData.sports;
      console.log(sportsArray);
      try {
        const response = await fetch('/api/user/getUsers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sports: sportsArray }),
        });

        const json = await response.json();
        console.log('API Response:', json);

        if (response.ok) {
          setMatchedUsers(json);
        } else {
          console.error('API Error:', json); // Log any error response
        }
      } catch (error) {
        console.error('Fetch Error:', error); // Log fetch-related errors
      }
    };

    fetchUsers();
  }, []);


  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      mt={20}
      ml={10}
      mr={10}
      bgGradient="linear(to-r, #f0f9ff, #38bdf8, #075985)"
    >
    </Box>
  );
}

export default FindUserMatch;
*/