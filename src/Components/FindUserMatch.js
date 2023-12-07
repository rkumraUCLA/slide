import React, { useState, useEffect } from 'react';
import { Box, Text, SimpleGrid, Skeleton } from '@chakra-ui/react'; // Add any other Chakra-UI components you may need
import { useAuthContext } from '../hooks/useAuthContext';

function FindUserMatch() {
  const [matchedUsers, setMatchedUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`/api/user/getUserById/${userId}`);
        const userData = await response.json();
        const sportsArray = userData.sports;

        const usersResponse = await fetch('/api/user/getUsers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sports: sportsArray }),
        });

        const usersData = await usersResponse.json();

        if (usersResponse.ok) {
          setMatchedUsers(usersData.users);
        } else {
          console.error('API Error:', usersData); // Log any error response
        }
      } catch (error) {
        console.error('Fetch Error:', error); // Log fetch-related errors
      } finally {
        setLoading(false);
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
      <Text fontSize="xl" mb={4}>
        Matched Users
      </Text>
      
      {loading ? (
        <SimpleGrid columns={3} spacing={4}>
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} height="120px" borderRadius="md" />
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={3} spacing={4}>
          {matchedUsers && matchedUsers.length > 0 ? (
            matchedUsers.map((user) => (
              <Box key={user._id} borderWidth="1px" borderRadius="md" p={4}>
                <Text>{user.userName}</Text>
              </Box>
            ))
          ) : (
            <Text>No matched users found.</Text>
          )}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default FindUserMatch;
