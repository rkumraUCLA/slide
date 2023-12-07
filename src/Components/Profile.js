// Profile.jsx
import sportsOptions from './sportsOptions';
import { useAuthContext } from '../hooks/useAuthContext';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import {
  ChakraProvider,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Center,
  VStack,
  HStack,
} from '@chakra-ui/react';


function arrayToString(arr, separator = ', ') {
  if (!Array.isArray(arr)) {
    return String(arr); // If it's not an array, convert to a string
  }
  return arr.join(separator);
}


function Profile() {
  const { user } = useAuthContext();
  const [userProf, setUser] = useState(null);
  const userId = localStorage.getItem('userId');
  const [fullName, setName] = useState('');
  const [age, setAge] = useState('');
  const [sports, setSports] = useState('');
  const [transformedSports, setTSports] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`/api/user/getUserById/${userId}`);
      const json = await response.json();

      console.log(json.sports)

      if (response.ok) {
        setTSports(json.sports.map(sport => ({ value: sport, label: sport })))
        console.log(transformedSports)
        setSports(json.sports)
        setName(json.fullName)
        setAge(json.age)
        // setFormData({
        //   name: json.fullName,
        //   sports: [],
        //   age: json.age || '',
        // })

        ;
      }
    };
  
    if (user) {
      fetchProfile();
    }
  }, [user]);


  // const [formData, setFormData] = useState({
  //   name: '',
  //   sports: [],
  //   age: ''
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // const handleSportChange = (strings) => {
  //   // const selectedOptions = arrayToString(
  //   //   e.selectedOptions.map((option) => option.label)
  //   // )
  //   // const selectedOptions = Array.from(e.target.selectedOptions).map(
  //   //   (option) => option.value
  //   // );

  //   console.log(formData)
  //   setFormData({
  //     ...formData,
  //     sports: strings,
  //   });
  // };

  // const handleSkillLevelChange = (index, value) => {
  //   const updatedSports = [...formData.sports];
  //   updatedSports[index].skillLevel = value;

  //   setFormData({
  //     ...formData,
  //     sports: updatedSports,
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({fullName, age, sports}));
    console.log(userId)
    try {
      const response = await fetch(`/api/user/updateProfile/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({fullName, age, sports}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      else{
        const updatedUser = await response.json();
        console.log('User updated:', updatedUser);
      }
  
    } catch (error) {
      console.error('Failed to udpate user');
    }

    
    // You can perform any action with the form data here (e.g., send it to the server).
  };


  return (
    <ChakraProvider>
      <Center bg="#f0f9ff">
        <VStack mt="20" spacing="4" align="center" justify="center" p="4" borderRadius="lg" boxShadow="lg" w="lg" maxW="100%" bg="whiteAlpha.800">
          <Text fontSize="2xl" fontWeight="bold" mb="3">
            Profile Settings
          </Text>

          <form onSubmit={handleSubmit}>
            <FormControl id="name" isRequired mb="3">
              <FormLabel fontSize="lg">First Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={fullName}
                onChange={(e) => setName(e.target.value)}
                fontSize="lg"
              />
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="sports">Sports You Play</FormLabel>
                {/* {console.log('Options:', sportsOptions)}  */}
                <Select
                  id="sports"
                  value = {transformedSports}
                  options={sportsOptions}
                  isMulti
                  onChange={(selectedOptions) =>
                    {
                      setSports((e) => selectedOptions.map((option) => option.value))
                      setTSports(selectedOptions)
                    }
                  }
                ></Select>
              </FormControl>
              {/* {/* <Select
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
              /> */}
            {/* </FormControl> */}

            {/* {formData.sports.map((sport, index) => (
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
            ))} */}

            <FormControl id="age" isRequired mb="3">
              <FormLabel fontSize="lg">Age</FormLabel>
              <Input
                type="number"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                fontSize="lg"
              />
            </FormControl>

            <Button align="center" type="submit" bg="#075985" color="#075985" textColor="white" mt="4" fontSize="lg">
              Save Profile
            </Button>
          </form>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default Profile;
