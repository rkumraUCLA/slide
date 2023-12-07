import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/useAuthContext';

function FindUserMatch() {
  const [matchedUsers, setMatchedUsers] = useState(null);
  const userId = localStorage.getItem('userId');
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchUsers = async () => {
      const sportsArray = ["Aerial Silks"];

      try {
        const response = await fetch('/api/user/getUsers', {
          method: 'POST',
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
      <Text fontSize="xl" fontWeight="bold" color="#082f49">
        Matched Users
      </Text>
      {matchedUsers ? (
        <ul>
          {matchedUsers.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <Text>No matched users yet.</Text>
      )}
    </Box>
  );
}

export default FindUserMatch;
