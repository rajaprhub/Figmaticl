import React, { useEffect, useState } from "react";
import { Box, Flex,Text, Image } from "@chakra-ui/react";

import { Sidebar } from "../Componets/Sidebar";
import { Knowledge } from "../Componets/Knowledge";



export const Dashboard = () => {


    
  return (
    <>  
         <h1> Dashboard</h1>  
{/* 
         <Flex justifyContent ='space-between' gap={5} flexDirection ='column'>
               <Text fontSize={{  sm: "16px" }}> Lesson  </Text>
               <Text fontSize={{  sm: "14px" }}> Lesson </Text>
          </Flex> */}

   <Box>
    <Flex
     mb={2}
     p={1}
     border={"1px solid gray"}
     w="99%"
     m='auto'
    //  gap={1}
    //  flexDir={{ base: "column", sm: "column", md: "row" }}
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
