import React, { useRef } from 'react';
import ReactGA from 'react-ga'; // for google analytics
//styles
import {
  Flex,
  Button,
  Avatar,
  Text,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  RadioButtonGroup,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  useDisclosure
} from '@chakra-ui/core';

export default function NavBar({
  history,
  isLoading,
  setSearchResults,
  trackFilters,
  setTrackFilters,
  typeFilters,
  setTypeFilters
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // use to navigate to review form
  const navToReviewForm = () => {
    history.push('/dashboard/add-review');
    ReactGA.event({
      category: 'Review',
      action: `Add new review`
    });
  };

  const logout = () => {
    localStorage.clear('token');
    localStorage.clear('userId');
    history.push('/');
  };

  const handleInputChange = event => {
    event.preventDefault();
    setSearchResults(event.target.value);
  };

  // We could get this fronm the DB if we had endpoints
  const types = [
    { id: 1, criteria: 'type', name: 'Interview' },
    { id: 2, criteria: 'type', name: 'Company' }
  ];

  const tracks = [
    { id: 1, criteria: 'track', name: 'WEB' },
    { id: 2, criteria: 'track', name: 'UX' },
    { id: 3, criteria: 'track', name: 'DS' },
    { id: 4, criteria: 'track', name: 'IOS' },
    { id: 5, criteria: 'track', name: 'AND' }
  ];

  const handleFilter = e => {
    e.criteria === 'type'
      ? typeFilters.includes(e.name)
        ? setTypeFilters(typeFilters.filter(item => item !== e.name))
        : setTypeFilters([...typeFilters, e.name])
      : trackFilters.includes(e.name)
      ? setTrackFilters(trackFilters.filter(item => item !== e.name))
      : setTrackFilters([...trackFilters, e.name]);
    e.selected = !e.selected;
  };

  return (
    <Flex
      maxW='1440px'
      w='100%'
      px='40px'
      background='#FFFFFF'
      top='0'
      position='fixed'
      overflow='hidden'
      zIndex='999'
      direction='column'
    >
      <Flex align='center' justify='space-between' pt='1%'>
        <Flex align='center'>
          <h1> Allay </h1>
        </Flex>
        <Flex>
          {/* Hamburger Menu */}
          <Box ref={btnRef} cursor='pointer' onClick={onOpen}>
            <Image
              size='40px'
              src={require('../../icons/hamburger-blue.svg')}
            />
          </Box>
          <Drawer
            isOpen={isOpen}
            placement='right'
            size='xs'
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent bg='#344CD0'>
              <DrawerCloseButton
                color='white'
                border='none'
                bg='#344CD0'
                fontSize='2em'
              />
              <DrawerHeader>
                <Flex justifyContent='center' mt='15%'>
                  <Image
                    size='150px'
                    src={require('../../icons/user-logout.svg')}
                  />
                </Flex>
                <Flex
                  justifyContent='center'
                  mt='5%'
                  color='white'
                  fontWeight='light'
                  fontSize='1.5em'
                >
                  {localStorage.getItem('username')}
                </Flex>
              </DrawerHeader>
              <Flex
                background='#FFFFFF'
                mt='3%'
                color='#494B5B'
                border='none'
                py='4%'
                cursor='pointer'
                align='center'
                justifyContent='center'
                isLoading={isLoading}
                onClick={logout}
              >
                <Image
                  size='40px'
                  mr='7%'
                  src={require('../../icons/logout-gray.svg')}
                />
                <Text fontSize='1.8em'>Sign out</Text>
              </Flex>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Flex>

      {/* Search Bar */}
      <Flex align='center' justify='space-between' pt='1%'>
        <InputGroup w='30%'>
          <InputRightElement
            children={<Icon name='search-2' color='#344CD0' />}
          />
          <Input
            width='100%'
            placeholder='Search by company'
            type='text'
            rounded='20px'
            borderColor='rgba(149, 149, 149, 0.2)'
            borderWidth='1px'
            onChange={handleInputChange}
          />
        </InputGroup>
        <Button
          background='#344CD0'
          color='#FFFFFF'
          rounded='6px'
          border='none'
          size='lg'
          isLoading={isLoading}
          onClick={navToReviewForm}
        >
          Add Review
        </Button>
      </Flex>

      <Flex
        align='space-around'
        justify='space-around'
        p='1%'
        width='100%'
        margin='0 auto'
      >
        <RadioButtonGroup
          display='flex'
          align='center'
          justifyContent='center'
          spacing={12}
          isInline
          onChange={handleFilter}
        >
          {types.map(type => (
            <Button
              key={type.id}
              size='sm'
              rounded='full'
              padding='0.5% 3%'
              color='#17171B'
              variantColor={
                typeFilters.includes(type.name) ? 'selected' : 'unselected'
              }
              value={type}
            >
              {type.name}
            </Button>
          ))}

          {tracks.map(track => (
            <Button
              key={track.id}
              size='sm'
              rounded='full'
              padding='0.5% 3%'
              color='#17171B'
              variantColor={
                trackFilters.includes(track.name) ? 'selected' : 'unselected'
              }
              value={track}
            >
              {track.name}
            </Button>
          ))}
        </RadioButtonGroup>
      </Flex>
    </Flex>
  );
}
