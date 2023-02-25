import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Grid, GridItem, Image, Text } from "@chakra-ui/react";

export default function Display() {
  let movie = useSelector((data) => {
    return data.movies;
  });

  return (
    <Box>
      {movie.length !== 0 ? (
        <Grid
          gridAutoRows="minmax(100px, auto)"
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
          gridGap={5}
        >
          {movie.map((item, id) => {
            return (
              <GridItem
                maxW="80%"
                color="white"
                boxShadow={"0 0 10px black"}
                rounded="lg"
                overflow="hidden"
                p="3"
                m="0px auto"
                key={id}
              >
                <Link to={`/view/${item.id}`} >
                <Box
                  h="full"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                    alt="Image not found"
                    w="100%"
                    h="300px"
                    borderRadius={"2px"}
                  />
                  <Text fontWeight="bold" bg="gray.900" w="100%" p="10px" borderRadius="5px" >{item.original_title}</Text>
                  
                </Box>
                </Link>
              </GridItem>
            );
          })}
        </Grid>
      ) : null}
    </Box>
  );
}
