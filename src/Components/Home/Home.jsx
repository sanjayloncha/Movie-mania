import React from 'react'
import { Box } from "@chakra-ui/react" ;
import Display from '../Display/Display';
import Search from '../Search/Search';

export default function Home() {
  
  return (
    <Box>
      <Search />
      <Display />
    </Box>
  )
}
