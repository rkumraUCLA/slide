import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react'
import { ChakraProvider, Box, Text, Button } from '@chakra-ui/react';

function UserMatching() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/user/getUsers')
      const json = await response.json()

      if(response.ok){
        setUsers(json)
        console.log(json)
      }
    }

    fetchUsers()
  }, [])

  return (
    <ChakraProvider>
      <Box textAlign="center" paddingTop="20">
        <Text fontSize="2xl">Match With Users</Text>
          <Button variant="primary" style={{ background: 'blue', color: 'white', margin: '10px' }}>
            Match Here!
          </Button>
      </Box>
    </ChakraProvider>
  );
}

export default UserMatching;