
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
    title: "Sales & Marketing",
    date: "23/03/2023",
    lessons: "2",
    duration: "15",
     knowtype: "Sales "
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

  // const [kdata,setkdata] = useState([...knowdata]) 
    
  return (
    <> 
      
         
       <Flex pb={1} h={16} justify={"space-between"} alignItems={'center'} 
        // border={"1px solid blue"}
         >
            <Box ml={4}><h4>KNOWLEDGE </h4></Box>
            <Box>
             <Flex justify={"space-around"} gap={"20px"}  alignItems={"center"} >
                <Button  color='white' bg='skyblue'> Create Course</Button>
                <Image height={5} borderRadius= '50%' 
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8RpdIORbQ7JPuMt9CmVcuhLa2vEBcTaKnEA&usqp=CAU' />
                
                 <Box pr={2}>
                   <i  class="fa fa-ellipsis-v"></i>
                 </Box>
               
             </Flex>
           </Box>
        </Flex>

         <Box pt={1} bg='whitesmoke'
          //  border={"1px solid red"}
         >
              
          <Flex  m={2}  h={16} justify={"space-between"} alignItems={'center'} 
          //  border={"1px solid gray"} 
           >
              <Box ml={3}>
             <Flex   justify={"space-around"} gap={5}  alignItems={"center"} >
                <Text  fontWeight= 'bold' fontSize ='20px'  > All</Text>
                <Text   fontWeight= 'bold' fontSize ='20px'   > Live</Text>
                <Text   fontWeight= 'bold' fontSize ='20px'   > Draft</Text>
                <Text   fontWeight= 'bold' fontSize ='20px'   > Archived</Text>
             </Flex>
            </Box>

             <Box border='1px' borderColor='gray.200' bg='gray'  mr={2}> 
             <select >
             <option>Select Team</option>
             <option value="LH">Price: Low to High</option>
             <option value="HL">Price: High to Low</option>
            <option></option>
            </select>
             
             </Box>
          </Flex>

       <Box  m={2}  p={2} 
      //  border={"1px solid blue"} 
       >
         <SimpleGrid   className={styles.maincarddiv} >

          {knowdata.map((elem) => (
             <Box className={styles.procard}  key= {elem.id}
             pb={3} 
            // boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
           >
              <img   className={styles.imagebox}  src={elem.mainImage}/>
               <div className={styles.Procardd} >
                        <h6>  {elem.title} </h6>
                         <span className={styles.procarddate}> Last Updated : {elem.date} </span>
                    <Box pt={1}   pb={1} className={styles.duration}>    
                         <span>  Lesson : {elem.lessons}</span> 
                         <span> Minutes : {elem.duration}</span>
                    </Box>

                    <Box className={styles.protype}>    
                         <span> {elem.knowtype}</span> 
    
                    </Box>
               </div>

          </Box>
         ))}
        </SimpleGrid>

      </Box>
      
    </Box>
   
    </>
  )
}
