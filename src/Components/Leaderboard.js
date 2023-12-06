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
      <Box bg="#f0f9ff" textAlign="center" paddingTop="20">
        <Text fontSize="2xl">TODO</Text>
        <Footer/>
      </Box>
    </ChakraProvider>
  );
}

export default Leaderboard;

