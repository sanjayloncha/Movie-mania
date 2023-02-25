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
  let [like, setLike] = useState("false");
  let [count, setCount] = useState(1);
  let { id } = useParams();
  let viewedMovies = JSON.parse(localStorage.getItem("viewedMovieList")) || [];

  let style = {
    background: "black",
    height: "100vh",
  };

  let likeBtn = () => {
    // if (like) {
    //   setLike(false);
    // } else {
    //   setLike(true);
    // }
    let index = viewedMovies.findIndex((elem) => elem.movieId === id);
    if (index !== -1) {
      console.log(viewedMovies[index].like);
      if (viewedMovies[index].like === "true") {
        viewedMovies[index].like = "false";
        setLike(false);
        localStorage.setItem("viewedMovieList", JSON.stringify(viewedMovies));
      } else {
        viewedMovies[index].like = "true";
        setLike(true);
        localStorage.setItem("viewedMovieList", JSON.stringify(viewedMovies));
      }
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
        let view = { movieId: id, count: 1, like: "false" };
        viewedMovies.push(view);
        localStorage.setItem("viewedMovieList", JSON.stringify(viewedMovies));
      } else {
        let index = viewedMovies.findIndex((elem) => elem.movieId === id);
        console.log(index);
        if (index == -1) {
          let view = { movieId: id, count: 1 };
          viewedMovies.push(view);
        } else {
          viewedMovies[index].count += 1;
          setCount(viewedMovies[index].count);
        }
        localStorage.setItem("viewedMovieList", JSON.stringify(viewedMovies));
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
          <Text>View : {count}</Text>
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
              {like ? "unlike" : "like"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}
