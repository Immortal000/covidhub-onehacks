import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import firebaseInit from "../firebase/firebaseInit";
import firebaseWrite from "../firebase/firebaseWrite";
import firebaseRead from "../firebase/firebaseRead";

import { useState } from "react";
import { Input, Button, Box, Heading, Text, Image, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";
import Wave from "react-wavify";
import { SearchIcon } from "@chakra-ui/icons";

firebaseInit();
export default function Home() {
  const [zipcode, setZipcode] = useState("");

  const [index, setIndex] = useState(0);
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <Heading fontSize="80px">CovidHub</Heading>
        <Stack spacing={4}>
          <InputGroup>
            <Input backgroundColor={"white"} placeholder="Enter Zipcode" onChange={(e) => setZipcode(e.target.value)} />
            <InputRightElement
              children={
                <a href={`http://covidhub.vercel.app/zipcode/${zipcode}`}>
                  <SearchIcon />
                </a>
              }
            />
          </InputGroup>
        </Stack>
      </div>
    </div>
  );
}
