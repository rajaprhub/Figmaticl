
import {   Box,
  Square,
  Image,
  Heading,
  Flex,
  Avatar,
  SimpleGrid,
  Text ,
  Center,
  Divider,
  Button,
  Grid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";



let knowdata = [
  {
    "id": 1,
    "nametype": "Live",
    "mainImage": "https://cdn-icons-png.flaticon.com/512/5234/5234318.png",
    "title": "Sales",
    "date": "23/03/2023",
    "lessons": "2",
    "duration": "15",
    "knowtype": "sales"
  },
  {
    "id": 1,
    "nametype": "Live",
    "mainImage": "https://cdn-icons-png.flaticon.com/512/5234/5234318.png",
    "title": "Sales",
    "date": "23/03/2023",
    "lessons": "2",
    "duration": "15",
    "knowtype": "marketing"
  },
  {
    "id": 1,
    "nametype": "Live",
    "mainImage": "https://cdn-icons-png.flaticon.com/512/5234/5234318.png",
    "title": "Sales",
   "date": "23/03/2023",
    "lessons": "2",
    "duration": "15",
    "knowtype": "sales"
  },
  {
    "id": 1,
    "nametype": "Live",
    "mainImage": "https://cdn-icons-png.flaticon.com/512/5234/5234318.png",
    "title": "Sales",
   "date": "23/03/2023",
    "lessons": "2",
    "duration": "15",
    "knowtype": "marketing"
  },
  {
    "id": 1,
    "nametype": "Live",
    "mainImage": "https://cdn-icons-png.flaticon.com/512/5234/5234318.png",
    "title": "Sales",
    "date": "23/03/2023",
    "lessons": "2",
    "duration": "15",
   "knowtype": "sales"
  },
  {
    "id": 1,
    "nametype": "Live",
    "mainImage": "https://cdn-icons-png.flaticon.com/512/5234/5234318.png",
    "title": "Sales",
     "date": "23/03/2023",
    "lessons": "2",
    "duration": "15",
    "knowtype": "marketing"
  },

]





export const Knowledge = () => {


  // const [kdata,setkdata] = useState([...kdata]) 
    
  return (
    <div> 
      
         
       <Flex mb={3} h={16} justify={"space-between"} alignItems={'center'}  border={"1px solid blue"} >
            <Box ml={4}>Knowledge</Box>
            <Box>
             <Flex justify={"space-around"} gap={"20px"}  alignItems={"center"} >
               <Button> Create Course</Button>
                <Button> Image</Button>
                <Button> icon</Button>
             </Flex>
           </Box>
        </Flex>

         <Box mb={1} border={"1px solid red"}>
              
         <Flex  m={2}  h={16} justify={"space-between"} alignItems={'center'}  border={"1px solid blue"} >
         
            <Box ml={3}>
             <Flex   justify={"space-around"} gap={5}  alignItems={"center"} >
                <Text> All</Text>
                <Text> Live</Text>
                <Text> Draft</Text>
                <Text> Archived</Text>
             </Flex>
            </Box>

             <Box mr={2}>Input Field</Box>
          </Flex>

         
       <Box  m={2} mt={2}  p={2}  alignItems={"left"}  border={"1px solid blue"}>

          <Grid
        templateColumns='repeat(4, 1fr)'
        gap={10}
        mr={8} 
        // columns={{
        //   base: 1,
        //   sm: 2,
        //   md: 2,
        //   xl: 3,
        //   "2xl": 3,
        // }}
        // w="75%"
        // // margin={"auto"}
        // ml={5}
        // spacing={5}
      >
        {knowdata.map((elem) => (

          <Box
            key={elem.id}
            border="1px solid red"
            p={2}
            h={280}
            borderRadius={1}
            textAlign="left"
            // boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
          >
            <Image src={elem.mainImage} w="100%" h={"50%"} />
            <Box
              fontSize={{
                base: "18px",
                sm: "12px",
                md: "20px",
                xl: "18px",
                "2xl": "20px",
              }}
              mb={1}
             
            >
              {elem.title}
            </Box>

            <Text
              fontSize={{
                sm: "12px",
               }}
              mb={1}
            >
              Last Updated : {elem.date}
            </Text>
            
            <Flex  mb={2} gap={5} >
            <Box
              fontSize={{
                sm: "14px",
               }}
              mb={1}
            >
              Lesson : {elem.lessons}
            </Box>

            <Box
              fontSize={{
                sm: "14px",
               }}
              mb={1}
            >
              Minutes  : {elem.duration}
            </Box>
             </Flex>
           
          
          </Box>
        ))}
      </Grid>

      </Box>
      

        </Box>
   
    </div>
  )
}
