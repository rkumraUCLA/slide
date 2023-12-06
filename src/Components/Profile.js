// Profile.jsx
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
import Footer from './Footer';


function Profile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any action with the form data here (e.g., send it to the server).
    console.log(formData);
  };

  return (
    <ChakraProvider>
      <Center bg="#f0f9ff">
        <VStack mt="20" spacing="4" align="center" justify="center" p="4" borderRadius="lg" boxShadow="lg" w="lg" maxW="100%" bg="whiteAlpha.800">
          <Text fontSize="2xl" fontWeight="bold" mb="3">
            Profile Settings
          </Text>

          <form onSubmit={handleSubmit}>
            <FormControl id="firstName" isRequired mb="3">
              <FormLabel fontSize="lg">First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                fontSize="lg"
              />
            </FormControl>

            <FormControl id="lastName" isRequired mb="3">
              <FormLabel fontSize="lg">Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                fontSize="lg"
              />
            </FormControl>

            <FormControl id="favoriteSports" isRequired mb="3">
              <FormLabel fontSize="lg">Favorite Sports</FormLabel>
              <Select
                name="favoriteSports"
                isMulti
                value={formData.sports.map((sport) => ({ value: sport.sport, label: sport.sport }))}
                onChange={handleSportChange}
                fontSize="lg"
                options={[
                  { value: 'football', label: 'Football' },
                  { value: 'basketball', label: 'Basketball' },
                  { value: 'tennis', label: 'Tennis' },
                  // Add more sports as needed
                ].map((option) => ({ ...option, label: <span>{option.label}</span> }))}
              />
            </FormControl>

            {formData.sports.map((sport, index) => (
              <HStack key={index} spacing="4">
                <FormControl id={`skillLevel-${index}`} isRequired>
                  <FormLabel fontSize="lg">
                    Skill Level for {sport.sport}
                  </FormLabel>
                  <Select
                    name={`skillLevel-${index}`}
                    value={sport.skillLevel}
                    onChange={(e) => handleSkillLevelChange(index, parseInt(e.target.value))}
                    fontSize="lg"
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

            <FormControl id="age" isRequired mb="3">
              <FormLabel fontSize="lg">Age</FormLabel>
              <Input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                fontSize="lg"
              />
            </FormControl>

            <FormControl id="location" isRequired mb="3">
              <FormLabel fontSize="lg">Location</FormLabel>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                fontSize="lg"
              />
            </FormControl>

            <FormControl id="bio" isRequired mb="3">
              <FormLabel fontSize="lg">Bio</FormLabel>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                fontSize="lg"
              />
            </FormControl>

            <Button align="center" type="submit" bg="#075985" color="#075985" textColor="white" mt="4" fontSize="lg">
              Save Profile
            </Button>
          </form>
        </VStack>
      </Center>
      <Footer/>
    </ChakraProvider>
  );
}

export default Profile;
