import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Stack,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Divider,
  Flex,
} from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';

const CreateEvent = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [title, setTitle] = useState('');
  const [sport, setSport] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [spotsTotal, setPeopleNeeded] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleCreateEvent = async(e) => {
    e.preventDefault()
    // Perform action to create the event using the provided data
    console.log({ title, sport, spotsTotal, description, eventDate });

    const newEvent = { title, sport, spotsTotal, description, eventDate }
    
    const response = await fetch('/api/events',{
      method:'POST',
      body: JSON.stringify(newEvent),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok){
      setError(null)
      console.log('new event added', json)
    }

    setIsSubmitted(true);
  };

  const handleCreateAnotherEvent = () => {
    // Reset state variables to start a new event creation
    setTitle('');
    setSport('');
    setEventDate('');
    setPeopleNeeded('');
    setDescription('');
    setCurrentQuestion(1);
    setIsSubmitted(false);
  };

  const renderButtons = () => {
    if (isSubmitted) {
      return (
        <Stack spacing={4} direction="row">
          <Button
            variant="primary"
            style={{
              background: 'blue',
              color: 'white',
              margin: '10px',
            }}
            onClick={() => navigate('/myevents')}
          >
            Back to My Events
          </Button>
          <Button
            variant="primary"
            style={{
              background: 'blue',
              color: 'white',
              margin: '10px',
            }}
            onClick={handleCreateAnotherEvent}
          >
            Create Another Event
          </Button>
        </Stack>
      );
    }

    return (
      <Button
        variant="primary"
        style={{
          background: 'blue',
          color: 'white',
          margin: '10px',
        }}
        onClick={currentQuestion < 5 ? handleNextQuestion : handleCreateEvent}
      >
        {currentQuestion < 5 ? 'Next Question' : 'Submit'}
      </Button>
    );
  };

  const renderCurrentQuestion = () => {
    if (isSubmitted) {
      return <p>Congratulations! Your event has been created!</p>;
    }

    switch (currentQuestion) {
      case 1:
        return (
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
        );
      case 2:
        return (
          <FormControl>
            <FormLabel htmlFor="sport">Sport</FormLabel>
            <Input id="sport" type="text" value={sport} onChange={(e) => setSport(e.target.value)} />
          </FormControl>
        );
      case 3:
        return (
          <FormControl>
            <FormLabel htmlFor="eventDate">Date</FormLabel>
            <Input id="eventDate" type="text" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
          </FormControl>
        );
      case 4:
        return (
          <FormControl>
            <FormLabel htmlFor="spotsTotal">Amount of People Needed</FormLabel>
            <Input id="spotsTotal" type="number" value={spotsTotal} onChange={(e) => setPeopleNeeded(e.target.value)} />
          </FormControl>
        );
      case 5:
        return (
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormControl>
        );
      default:
        return null;
    }
  };



  return (
    <ChakraProvider>
      <Container
        maxW="lg"
        py={{
          base: '12',
          md: '24',
        }}
        px={{
          base: '0',
          sm: '8',
        }}
      >
        <Stack spacing="8">
          <Flex
            direction="column"
            align="center"
          >
            <Heading
              size={{
                base: 'xs',
                md: 'lg',
              }}
              style={{
                textAlign: 'center',
                padding: '0px',
              }}
            >
              Create a new event
            </Heading>
            <Divider />
          </Flex>
          <Stack
            py={{
              base: '0',
              sm: '8',
            }}
            px={{
              base: '4',
              sm: '10',
            }}
            bg={{
              base: 'transparent',
              sm: 'bg-surface',
            }}
            boxShadow={{
              base: 'none',
              sm: 'md',
            }}
            borderRadius={{
              base: 'none',
              sm: 'xl',
            }}
          >
            <Stack spacing="6">
              {renderCurrentQuestion()}
              <Divider />
              <Stack spacing="6">
                {renderButtons()}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </ChakraProvider>
  );
}

export default CreateEvent;