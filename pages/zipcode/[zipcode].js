import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import firebaseInit from "../../firebase/firebaseInit";
import firebaseWrite from "../../firebase/firebaseWrite";
import firebaseRead from "../../firebase/firebaseRead";
import {
  Box,
  Heading,
  Text,
  Button,
  Tag,
  TagLabel,
  Badge,
  useToast,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

import styles from "../../styles/Home.module.css";

import Navbar from "../../components/navigation/Navbar";

export default function Search({ data, places }) {
  const router = useRouter();
  const { zipcode } = router.query;
  const toast = useToast();

  const [index, setIndex] = useState(0);
  const [zipcodeInfo, setZipcodeInfo] = useState(data.data);
  const id = "count-toast";

  const next = () => {
    if (index + 1 > zipcodeInfo.people.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const previous = () => {
    if (index - 1 < 0) {
      setIndex(zipcodeInfo.people.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    if (!toast.isActive(id)) {
      toast({
        id,
        title: `Current Vaccine Count in zipcode ${zipcode}: ${zipcodeInfo.vaccine}`,
        duration: 6000,
        isClosable: true,
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.messagesContainer}>
          <Box width={"300px"} border={"1px"} borderRadius={"lg"} textAlign={"center"} marginTop={"40px"}>
            <Heading borderBottom={"1px solid black"} padding={"10px"}>
              {zipcodeInfo.people[index].title} <br />
              <Badge colorScheme="green">{zipcodeInfo.people[index].tag}</Badge>
            </Heading>
            <Text padding={"10px"}>{zipcodeInfo.people[index].message}</Text>
            <Popover>
              <PopoverTrigger>
                <Button colorScheme={"teal"} margin={"10px"}>
                  View Contact Information
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Contact Information</PopoverHeader>
                <PopoverBody>{zipcodeInfo.people[index].telephone}</PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
          <Box margin={"10px"} display={"flex"} justifyContent={"center"}>
            <ArrowBackIcon onClick={() => previous()} cursor={"pointer"} fontSize={"30px"} />
            <ArrowForwardIcon onClick={() => next()} cursor={"pointer"} fontSize={"30px"} />
          </Box>
        </div>
        <div>
          <Heading>Your Local Convenience Stores</Heading>
          <div className={styles.placesContainer}>
            {places.map((place) => (
              <div className={styles.place}>
                <Heading>{place.name}</Heading>
                <Text>{place.address}</Text>
                <Button>
                  <a href={`${place.url}`}>Go To Website</a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

Search.getInitialProps = async ({ query }) => {
  const data = await fetch(`http://covidhub.vercel.app/api/${query.zipcode}`);
  const response = await data.json();

  const placeData = await fetch(`http://covidhub.vercel.app/api/places/${query.zipcode}`);
  const placeResponse = await placeData.json();
  return { data: response, places: placeResponse.data };
};
