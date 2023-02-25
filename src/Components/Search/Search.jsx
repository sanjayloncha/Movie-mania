import React from "react";
import { movieAction } from "../../Redux/Action/action";
import { useDispatch } from "react-redux";
import {
  Box,
  InputGroup,
  Input,
  Heading,
  InputLeftElement,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export default function Search() {
  let dispatch = useDispatch();

  const find = () => {
    let seacrhedMovie = document.getElementById("search_input").value;
    if (seacrhedMovie.trimStart() === "") {
      alert("Please enter movie name !");
    } else {
      let movie = document.getElementById("search_input").value;
      getData(movie);
    }
  };
  let getData = async (movie) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=b56058299cbea0093f5ccfb9e43c52a4&language=en-US&query=${movie}&page=1&include_adult=false`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      if (data.results.length !== 0) {
        movieAction(data.results, dispatch);
      }else{
        console.log("error occured");
        alert("Enter valid movie name")
      }
    } catch (error) {
      console.log("error occured");
    }
  };

  return (
    <>
      <Box p="20px" color={"white"}>
        <Heading>Movie Mania</Heading>
      </Box>
      <Box w={["80%", "40%", "50%"]} m="auto" mt="10px" mb="100px">
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
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                find();
              }
            }}
          />
        </InputGroup>
      </Box>
    </>
  );
}
