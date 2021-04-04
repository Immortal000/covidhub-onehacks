import { useState } from "react";
import Link from "next/link";

import {
  FormControl,
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { PhoneIcon, CheckIcon, SearchIcon, AddIcon } from "@chakra-ui/icons";
import styles from "./navbar.module.css";

export default function Navbar() {
  const [query, setQuery] = useState("");
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link href={"/"}>
          <Text fontSize="3xl" cursor={"pointer"}>
            CovidHub
          </Text>
        </Link>
      </div>
      <div className={styles.search}>
        <Stack spacing={4}>
          <InputGroup>
            <Input placeholder="Enter Zipcode" onChange={(e) => setQuery(e.target.value)} />
            <InputRightElement
              children={
                <a href={`http://covidhub.vercel.app/zipcode/${query}`}>
                  <SearchIcon />
                </a>
              }
            />
          </InputGroup>
        </Stack>
      </div>
      <div>
        <Link href="http://covidhub.vercel.app/add">
          <IconButton colorScheme="blue" aria-label="Add Message" icon={<AddIcon />} />
        </Link>
      </div>
    </div>
  );
}
