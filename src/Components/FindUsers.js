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
      <div style={{ textAlign: 'right' }}>
        <Link to="/findusermatch" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" style={{ background: '#075985', color: 'white'}} mt={20}>
            Find your match!
          </Button>
        </Link>
      </div>

      <Box bg="#f0f9ff" className="home" mt={20} ml={4} mr={4}>
        {/* Search Bar */}
        <Input
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
