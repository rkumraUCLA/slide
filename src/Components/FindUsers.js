import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Table, Link as ChakraLink, Tbody, Tr, Th, Td, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import Footer from './Footer';

function FindUsers() {
  const [users, setUsers] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch('/api/user/getLeaderboard');
      const json = await response.json();

      if (response.ok) {
        setUsers(json);
      }
    };

    if (user) {
      fetchLeaderboard();
    }
  }, [user]);

  const filteredUsers = users
    ? users.filter((userD) => userD.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <ChakraProvider>
    <div style={{ textAlign: 'center', paddingTop: '15vh' }}>
      <Link to="/findusermatch" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          color="primary"
          style={{
            background: 'linear-gradient(to right, #7dd3fc, #075985)',
            color: 'white',
            fontSize: '1.5em',  // Increase font size as needed
            padding: '15px 15px',  // Adjust padding as needed
          }}
        >
          Find your match!
        </Button>
      </Link>
    </div>
    <Box
      bgGradient="linear(to-b, #7dd3fc, #075985)"
      className="home"
      mt="20px"
      paddingLeft="10px"
      paddingRight="10px"
      paddingTop="10px"
    >       
     {/* Search Bar */}
        <Input
          bg="white"
          type="text"
          placeholder="Search by full name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          mb={4}
        />

        <Table variant="simple" size="md">
          <Tbody>
            {filteredUsers.map((userD) => (
              <Tr key={userD._id} onClick={() => handleUserClick(userD)}>
                <Td fontSize="lg" fontWeight="bold">
                  {userD.fullName}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Modal isOpen={selectedUser !== null} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>User Information</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Display user info */}
              {selectedUser && (
                <div>
                  <p>Name: {selectedUser.fullName}</p>
                  <p>Age: {selectedUser.age}</p>
                  <p>Events Attended: {selectedUser.eventsCreated}</p>
                  <p>Instagram: {selectedUser.userName}</p>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleCloseModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Footer />
    </ChakraProvider>
  );
}

export default FindUsers;
