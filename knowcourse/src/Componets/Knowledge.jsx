
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
import styles from '../Styles/Knowledge.module.css'

const property = {
  imageUrl: 'https://bit.ly/2Z4KKcF',
  imageAlt: 'Rear view of modern home with pool',
  beds: 3,
  baths: 2,
  title: 'Modern home in city center in the heart of historic Los Angeles',
  formattedPrice: '$1,900.00',
  reviewCount: 34,
  rating: 4,
}



let knowdata = [
  {
    id: 1,
    nametype: "Live",
    mainImage: "https://cdn-icons-png.flaticon.com/512/5234/5234318.png",
    title: "Marketing",
    date: "23/03/2023",
    lessons: "2",
    duration: "15",
    knowtype: "Sales"
  },
  {
    id: 2,
    nametype: "Draft",
    mainImage: "https://cdn-icons-png.flaticon.com/512/5234/5234318.png",
    title: "Sales",
    date: "23/03/2023",
    lessons: "2",
    duration: "15",
     knowtype: "Sales"
  },
  {
    id:3,
    nametype: "Archived",
    mainImage: "https://cdn-icons-png.flaticon.com/512/5234/5234318.png",
    title: "Sales",
    date: "23/03/2023",
    lessons: "2",
    duration: "15",
     knowtype: "Sales"
  },
  {
    id: 4,
    nametype: "Live",
    mainImage: "https://cdn-icons-png.flaticon.com/512/5234/5234318.png",
    title: "Marketing",
    date: "23/03/2023",
    lessons: "2",
    duration: "15",
     knowtype: "marketing"
  },
  {
     id: 5,
     nametype: "Live",
     mainImage: "https://cdn-icons-png.flaticon.com/512/5234/5234318.png",
     title: "Sales",
     date: "23/03/2023",
     lessons: "2",
     duration: "15",
     knowtype: "sales"
  },
  {
     id: 6,
    nametype: "Live",
     mainImage: "https://cdn-icons-png.flaticon.com/512/5234/5234318.png",
     title: "Sales",
     date: "23/03/2023",
     lessons: "2",
     duration: "15",
     knowtype: "sales"
   },

]


export const Knowledge = () => {

  // const [kdata,setkdata] = useState([...kdata]) 
    
  return (
    <> 
      
         
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
              
          <Flex  m={2}  h={16} justify={"space-between"} alignItems={'center'}  border={"1px solid gray"} >
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

       <Box  m={2}  p={2} border={"1px solid blue"}>
         <SimpleGrid   className={styles.maincarddiv} >
          {knowdata.map((elem) => (

           <Box className={styles.procard}  key= {elem.id}
            // boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
            >
              <img   className={styles.imagebox}  src={elem.mainImage}/>
              
                  <div className={styles.Procardd} >
                        <h5>  {elem.title} </h5>
                         <h6> Last Updated : {elem.date} </h6>
                    <div style={ {display:"flex", justifyContent : "space-between"}}>    
                         <p>  Lesson : {elem.lessons}</p> 
                         <p> Minutes : {elem.duration}</p>
                    </div>
               </div>

          </Box>
         ))}
        </SimpleGrid>

      </Box>
      
    </Box>
   
    </>
  )
}
