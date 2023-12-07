import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/useAuthContext';
import Footer from './Footer';

function Leaderboard() {
  const [users, setUsers] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch('/api/user/getLeaderboard');
      const json = await response.json();

      if (response.ok) {
        setUsers(json);
        console.log(json);
      }
    };

    if (user) {
      fetchLeaderboard();
    }
  }, []);

  return (
    <ChakraProvider>
      <Box bg="#f0f9ff" className="home" mt={20} ml={4} mr={4}>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Full Name</Th>
              <Th>Age</Th>
              <Th>Events Attended</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users &&
              users.map((userD, index) => (
                <Tr key={userD._id}>
                  <Td>{index + 1}</Td>
                  <Td fontSize="lg" fontWeight="bold">
                    {userD.fullName}
                  </Td>
                  <Td>{userD.age}</Td>
                  <Td>{userD.eventsCreated}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
      <Footer />
    </ChakraProvider>
  );
}

export default Leaderboard;
