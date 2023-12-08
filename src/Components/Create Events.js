import sportsOptions from './sportsOptions';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [title, setTitle] = useState('');
  const [sport, setSport] = useState('');
  const [eventDate, setEventDate] = useState(null);
  const [spotsTotal, setPeopleNeeded] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  const [location, setLocation] = useState('');
  const [eventTime, setEventTime] = useState(null);
  // console.log(jsonId)

  const navigate = useNavigate();

  function arrayToString(arr, separator = ', ') {
    if (!Array.isArray(arr)) {
      return String(arr); // If it's not an array, convert to a string
    }
    return arr.join(separator);
  }

  const handleNextQuestion = () => {
    setError(null);

    // Check for errors based on the current question
    switch (currentQuestion) {
      case 0:
        if (title.length <= 4) {
          setError('Title must be at least 5 characters.');
          return;
        }
        break;
      case 1:
        if (sport.length === 0) {
          setError('Please choose at least one sport.');
          return;
        }
        break;
      case 2:
        if (eventDate == null) {
          setError('Please enter a date');
          return;
        }
        break;
      case 3:
        if (isNaN(spotsTotal) || spotsTotal <= 0 || spotsTotal > 1000000) {
          setError(
            'Amount of People Needed must be a number between 1 and 1,000,000.'
          );
          return;
        }
        break;
      case 6:
        if (description.length <= 9) {
          setError('Description must be at least 10 characters.');
          return;
        }
        break;

      case 4:
        if (location.length === 0) {
          setError('Please enter a location.');
          return;
        }
        break;

      case 5:
        if (eventTime == null) {
          setError('Please enter a time.');
          return;
        }
        break;

      default:
        break;
    }

    setCurrentQuestion(currentQuestion + 1);
  };

  const handleCreateEvent = async (e) => {
    setError(null);
    e.preventDefault();
    // Perform action to create the event using the provided data
    console.log({ title, sport, spotsTotal, description, eventDate });

    const newEvent = {
      title,
      sport,
      spotsTotal,
      description,
      eventDate,
      location,
      eventTime,
    };

    const response = await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify(newEvent),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();
    console.log(json._id)
    
    const eventId = json._id;
    const jsonId = {myEvents: eventId}
    console.log(JSON.stringify(jsonId))

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      try {
        const response2 = await fetch(`/api/user/addEvent/${userId}`, {
          method: 'PATCH',
          body: JSON.stringify(jsonId),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response2.ok) {
          throw new Error('Network response was not ok');
        }

        const updatedUser = await response2.json();
        console.log('User updated:', updatedUser);
      } catch (error) {
        console.error('Failed to add event:', error);
      }
      setError(null);
      console.log('new event added', json);
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
    setCurrentQuestion(0);
    setIsSubmitted(false);
  };

  const isValidAnswerToQuestion6 = () => {
    if (description.length >= 10) {
      return true;
    }
    setError('Description must be at least 10 characters.');
    return false;
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
        onClick={(e) => {
          if (currentQuestion < 6) {
            handleNextQuestion();
          } else if (currentQuestion === 6 && isValidAnswerToQuestion6()) {
            handleCreateEvent(e);
          }
        }}
      >
        {currentQuestion < 6 ? 'Next Question' : 'Submit'}
      </Button>
    );
  };

  const renderCurrentQuestion = () => {
    if (isSubmitted) {
      return <p>Congratulations! Your event has been created!</p>;
    }

    switch (currentQuestion) {
      case 0:
        return (
          <FormControl>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
        );
      case 1:
        return (
          <FormControl>
            <FormLabel htmlFor="sport">Choose a Sport</FormLabel>
            {console.log('Options:', sportsOptions)}
            <Select
              id="sports"
              options={sportsOptions}
              isMulti
              onChange={(selectedOptions) =>
                setSport(
                  arrayToString(
                    selectedOptions.map((option) => option.label)
                  )
                )
              }
            ></Select>
          </FormControl>
        );
      case 2:
        return (
          <FormControl>
            <FormLabel htmlFor="eventDate">Date</FormLabel>
            <DatePicker
              id="eventDate"
              selected={eventDate ? new Date(eventDate) : null}
              onChange={(date) => setEventDate(date)}
              dateFormat="MM/dd/yyyy"
              minDate={new Date()} // Optional: Set the minimum date to today
              // You can customize the DatePicker further based on your needs
            />
          </FormControl>
        );
      case 3:
        return (
          <FormControl>
            <FormLabel htmlFor="spotsTotal">Amount of People Needed</FormLabel>
            <Input
              id="spotsTotal"
              type="number"
              value={spotsTotal}
              onChange={(e) => setPeopleNeeded(e.target.value)}
            />
          </FormControl>
        );
      case 6:
        return (
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
              id="description"
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </FormControl>
        );
      case 4:
        return (
          <FormControl>
            <FormLabel htmlFor="location">Location</FormLabel>
            <Input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormControl>
      );

      case 5:
        return (
          <FormControl>
            <FormLabel htmlFor="eventTime">Time</FormLabel>
            <DatePicker
              id="eventTime"
              selected={eventTime ? new Date(eventTime) : null}
              onChange={(time) => setEventTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
            />
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
                {error && (
                  <p style={{ color: 'red', marginTop: '10px' }}>
                    Error: {error}
                  </p>
                )}
                {renderButtons()}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </ChakraProvider>
  );
};

export default CreateEvent;
