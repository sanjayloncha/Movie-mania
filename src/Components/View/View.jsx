import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Image,
  Stack,
  Heading,
  Button,
} from "@chakra-ui/react";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";

export default function View() {
  let [state, setState] = useState({});
  let [like, setLike] = useState(false);
  let { id } = useParams();
  let viewedMovies = JSON.parse(localStorage.getItem("viewedMovieList")) || [];

  let style = {
    background: "black",
    height: "100vh",
  };

  let likeBtn = () => {
    if (like) {
      setLike(false);
    } else {
      setLike(true);
    }
  };
  useEffect(() => {
    getData(id);
  }, []);

  let getData = async (id) => {
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=b56058299cbea0093f5ccfb9e43c52a4&language=en-US`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      setState(data);

      if (viewedMovies.length === 0) {
        let view = { id: id, count: 1 };
        viewedMovies.push(view);
        localStorage.setItem("viewedMovieList", JSON.stringify(viewedMovies));
    } else {
          console.log(viewedMovies);
        // viewedMovies.filter((element) => {
        //   // console.log(element) ;
        //   if (element.id == id) {
        //     element.count += 1;
        //     return;
        //   }
        //   // localStorage.setItem("viewedMovieList", JSON.stringify(viewedMovies));
        // });
        // localStorage.setItem("viewedMovieList", JSON.stringify(viewedMovies));
        // console.log(viewedMovies) ;
      }
    } catch (error) {
      console.log("error occured");
    }
  };
  const releaseYear = state.release_date
    ? state.release_date.substring(0, 4)
    : "";
  //   console.log(releaseYear) ;

  return (
    <Flex
      style={style}
      color="white"
      p="50px"
      bg="black"
      alignItems="center"
      justifyContent="center"
    >
      <Box w="500px" h="300px">
        <Image
          src={`https://image.tmdb.org/t/p/w500${state.backdrop_path}`}
          w="100%"
          h="300px"
          margin={"auto"}
          boxShadow={"0 0 10px black"}
          borderRadius={"2px"}
        />
      </Box>
      <Box textAlign="justify" m="20px" w="900px">
        <Stack mt="6" spacing="3">
          <Heading size="md">{state.title}</Heading>
          <Text> {releaseYear} </Text>
          <Text>Ratings : {state.vote_average}</Text>
          <Text>{state.overview}</Text>
          <Text>View : 1</Text>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="50%"
          >
            <Button color="blue.600" fontSize="2xl">
              <Link to="/"> Close </Link>
            </Button>
            <Button color="blue.600" fontSize="2xl" onClick={likeBtn}>
              {like ? "liked" : "like"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}
