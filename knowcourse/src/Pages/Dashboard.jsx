import React, { useEffect, useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";

import { Sidebar } from "../Componets/Sidebar";
import { Knowledge } from "../Componets/Knowledge";



export const Dashboard = () => {


    
  return (
    <>  
         <h1> Dashboard</h1>  
   <Box>
   
    <br />
    <Flex
     mt={10}
     gap={2}
     w={"99%"}
     margin={"auto"}
     flexDir={{ base: "column", sm: "column", md: "row" }}
    >
     <Box flex={1}>
          <Sidebar/>
     </Box>

      <Box flex={3}>
         <Knowledge/>
      </Box>
 
    </Flex>
 </Box>

         




    </>
  )
}
