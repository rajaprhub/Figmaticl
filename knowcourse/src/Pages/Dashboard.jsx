import React, { useEffect, useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";

import { Sidebar } from "../Componets/Sidebar";
import { Knowledge } from "../Componets/Knowledge";



export const Dashboard = () => {


    
  return (
    <>  
         <h1> Dashboard</h1>  
   <Box>
    <Flex
     mb={2}
     p={1}
     border={"1px solid gray"}
     w="99%"
     m='auto'
     gap={2}
     flexDir={{ base: "column", sm: "column", md: "row" }}
    >
     <Box flex={1}>
          <Sidebar/>
     </Box>

      <Box flex={6}>
         <Knowledge/>
      </Box>
 
    </Flex>
  </Box>

         




    </>
  )
}
