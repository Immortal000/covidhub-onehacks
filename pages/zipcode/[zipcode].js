import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import firebaseInit from "../../firebase/firebaseInit";
import firebaseWrite from "../../firebase/firebaseWrite";
import firebaseRead from "../../firebase/firebaseRead";
import { Box, Heading, Text } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";

export default function Search({ data }) {
  const router = useRouter();
  const { zipcode } = router.query;
  console.log(data);

  const [index, setIndex] = useState(0);
  const [zipcodeInfo, setZipcodeInfo] = useState(data.data);

  return (
    <div>
      <h1>{zipcodeInfo.people[index].title}</h1>
      <p>{zipcodeInfo.people[index].message}</p>
      <p>{zipcodeInfo.people[index].telephone}</p>

      <button onClick={() => setIndex(index + 1)}>Next</button>
    </div>
  );
}

Search.getInitialProps = async ({ query }) => {
  const data = await fetch(`http://localhost:3000/api/${query.zipcode}`);
  const response = await data.json();
  return { data: response };
};
