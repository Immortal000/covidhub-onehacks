import {
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useToast,
  Select,
  RadioGroup,
  HStack,
  Radio,
} from "@chakra-ui/react";
import firebaseInit from "../../firebase/firebaseInit";
import firebaseWrite from "../../firebase/firebaseWrite";

import styles from "../../styles/Home.module.css";

import Navbar from "../../components/navigation/Navbar";

firebaseInit();

export default function Add() {
  const toast = useToast();
  const formSubmit = (e) => {
    e.preventDefault();
    const zipcodeField = e.target.elements["zipcode"];
    const titleField = e.target.elements["title"];
    const messageField = e.target.elements["message"];
    const telephoneField = e.target.elements["telephone"];
    const tagField = e.target.elements["tag"];
    const vaccineField = e.target.elements["vaccine"];

    firebaseWrite(zipcodeField.value, {
      title: titleField.value,
      message: messageField.value,
      telephone: telephoneField.value,
      tag: tagField.value,
      vaccine: vaccineField.value,
    });

    toast({
      title: `Message Published to zipcode ${zipcodeField.value}`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    zipcodeField.value = "";
    titleField.value = "";
    messageField.value = "";
    telephoneField.value = "";
  };

  return (
    <>
      <Navbar />
      <div className={"container"}>
        <form onSubmit={(e) => formSubmit(e)} className={styles.form}>
          <Input type={"text"} placeholder={"Zipcode"} name={"zipcode"} />
          <Input type={"text"} placeholder={"Title"} name={"title"} />
          <Textarea placeholder={"Your Message"} name={"message"} />
          <Input type={"text"} placeholder={"Your Phone Number"} name={"telephone"} />
          <label for="vaccine">How many members in your household have taken the vaccine?</label>
          <Input type={"number"} name={"vaccine"} />
          <RadioGroup name={"tag"} defaultValue={"general"}>
            <HStack spacing="24px">
              <Radio value="food">Food</Radio>
              <Radio value="health">Health</Radio>
              <Radio value="fitness">Fitness</Radio>
              <Radio value="general">General</Radio>
            </HStack>
          </RadioGroup>
          <Input type="submit" value={"Submit Message"} />
        </form>
      </div>
    </>
  );
}
