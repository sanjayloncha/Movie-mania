import React, { useState } from "react";
import {
  Box,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Heading,
  InputLeftElement,
} from "@chakra-ui/react";
import {  Search2Icon } from "@chakra-ui/icons";

export default function Search() {
  const [show, setShow] = useState(false);
  const [movie, setMoive] = useState([]);

  const handleClick = () => {
    let seacrhedMovie = document.getElementById("search_input").value
    if (seacrhedMovie.trimStart() === "") {
      alert("Please enter movie name !");
    } else {
      setShow(true);
      setTimeout(() => {
        setShow(false);
        document.getElementById("search_input").value = "";
      }, 2000);
      let movie = document.getElementById("search_input").value;
      getData(movie);
    }
  };
  let getData = async (movie) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=b56058299cbea0093f5ccfb9e43c52a4&language=en-US&query=${movie}&page=1&include_adult=false`;
    let res = await fetch(url);
    let data = await res.json();
    setMoive(data.results) ;
  };

  return (
    <>
      <Box p="20px" color={"white"}>
        <Heading>Movie Mania</Heading>
      </Box>
      <Box w={["80%", "40%", "50%"]} m="auto" mt="10px">
        <InputGroup size="md">
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="gray.300" />}
          />
          <Input
            pr="4.5rem"
            type="text"
            placeholder="Enter movie name..."
            id="search_input"
            bg={"white"}
          />
          <InputRightElement width="4.5rem">
            <Button
              isDisabled={show}
              mr="10px"
              h="1.75rem"
              size="sm"
              onClick={handleClick}
            >
              Search
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </>
  );
}
