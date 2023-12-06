import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChakraProvider, Box, Text, Button } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/useAuthContext';
import Footer from './Footer';



function Leaderboard() {
  const [users, setUsers] = useState(null);
  const {user} = useAuthContext()
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch('/api/user/getLeaderboard') //, {
      //   headers: {
      //     'Authorization': 'Bearer ${user.token}'
      //   }
      // })
      const json = await response.json();

      if (response.ok) {
        setUsers(json);
        console.log(json);
      }
    };

    if(user){
      fetchLeaderboard();
    }

  }, []);
  return (
    <ChakraProvider>
      <Box bg="#f0f9ff" className='home' mt={20} ml={4} mr={4}>
        <Box className='events'>
          {users &&
            users.map((userD) => (
              <Box key={userD._id} p={4} borderWidth="1px" borderRadius="md" mb={4}>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  {userD.fullName}
                </Text>
                <Text>
                  Age: {userD.age}
                </Text>
                <Text>
                  Events Created: {userD.eventsCreated}
                </Text>
              </Box>
            ))}
        </Box>
      </Box>
      <Footer/>
    </ChakraProvider>
  );
}

export default Leaderboard;

