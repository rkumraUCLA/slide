import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Select,
  Center,
  VStack,
  HStack,
} from '@chakra-ui/react';

function Profile() {
  const [formData, setFormData] = useState({
    photo: null,
    sports: [],
    age: '',
    location: '',
    bio: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSportChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );

    const sportsWithSkill = selectedOptions.map((sport) => ({
      sport,
      skillLevel: 1,
    }));

    setFormData({
      ...formData,
      sports: sportsWithSkill,
    });
  };

  const handleSkillLevelChange = (index, value) => {
    const updatedSports = [...formData.sports];
    updatedSports[index].skillLevel = value;

    setFormData({
      ...formData,
      sports: updatedSports,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any action with the form data here (e.g., send it to the server).
    console.log(formData);
  };

  return (
    <ChakraProvider>
      <Center minH="100vh">
        <VStack spacing="8" align="start" p="8" borderRadius="lg" boxShadow="lg" w="xl" maxW="90%" >
          <Text fontSize="5xl" fontWeight="bold" mb="5">
            Profile Settings
          </Text>
          <form onSubmit={handleSubmit}>
            <FormControl id="photo" isRequired mb="7">
              <FormLabel fontSize="2xl">Profile Photo</FormLabel>
              <Input
                type="file"
                name="photo"
                onChange={handlePhotoChange}
                fontSize="xl"
              />
            </FormControl>

            <FormControl id="favoriteSports" isRequired mb="7">
  <FormLabel fontSize="2xl">Favorite Sports</FormLabel>
  <Select
    name="favoriteSports"
    isMulti  // Enable multiple selections
    value={formData.sports.map((sport) => ({ value: sport.sport, label: sport.sport }))} // Format the value for multi-select
    onChange={handleSportChange}
    fontSize="3xl"
    options={[
      { value: 'football', label: 'Football' },
      { value: 'basketball', label: 'Basketball' },
      { value: 'tennis', label: 'Tennis' },
      // Add more sports as needed
    ].map((option) => ({ ...option, label: <span>{option.label}</span> }))} // Ensure each option has a label property
  />
</FormControl>

            {formData.sports.map((sport, index) => (
              <HStack key={index} spacing="4">
                <FormControl id={`skillLevel-${index}`} isRequired>
                  <FormLabel fontSize="2xl">
                    Skill Level for {sport.sport}
                  </FormLabel>
                  <Select
                    name={`skillLevel-${index}`}
                    value={sport.skillLevel}
                    onChange={(e) =>
                      handleSkillLevelChange(index, parseInt(e.target.value))
                    }
                    fontSize="2xl"
                  >
                    {[1, 2, 3, 4, 5].map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </HStack>
            ))}

            <FormControl id="age" isRequired >
              <FormLabel fontSize="2xl">Age</FormLabel>
              <Input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                fontSize="lg"
              />
            </FormControl>

            <FormControl id="location" isRequired>
              <FormLabel fontSize="2xl">Location</FormLabel>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                fontSize="lg"
              />
            </FormControl>

            <FormControl id="bio" isRequired>
              <FormLabel fontSize="2xl">Bio</FormLabel>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                fontSize="lg"
              />
            </FormControl>

            <Button type="submit" colorScheme="teal" mt="6" fontSize="xl">
              Save Profile
            </Button>
          </form>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default Profile;





/*

import React from 'react';
import { ChakraProvider, Box, Text } from '@chakra-ui/react';


function Profile() {
    return (
        <ChakraProvider>
          <Box textAlign="center" paddingTop="20">
            <Text fontSize="2xl">Implement Profile Settings</Text>
          </Box>
        </ChakraProvider>
      );

}

export default Profile

*/
