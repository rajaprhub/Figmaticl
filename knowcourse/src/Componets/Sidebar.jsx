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
import { IconName } from "react-icons/bs";

import React, { useEffect, useState } from "react";
import styles from '../Styles/Sidebar.module.css'

export const Sidebar = () => {


    
  return (
    <>  
      
      <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQygraxtK9tkJoSw6OQnz2DAlSgrVsttN57SA&usqp=CAU' w="100%" h={55} />
        
          <div className={styles.abovdiv}>

             <div>
               <div>
                 <span>DASHBOARD</span>
               </div>
               <div>
                 <span>KNOWLEDGE</span>
               </div>

               <div>
                 <span>MEMBERS</span>
               </div>
               <div>
                 <span>KNOWLEDGE</span>
               </div>
             </div>


             <div>
                <div>
                 <span>DASHBOARD</span>
               </div>
               <div>
                 <span>DASHBOARD</span>
               </div>
               <div>
                 <span>DASHBOARD</span>
               </div>
             </div>

          </div>

          <div>

          </div>



    </>
  )
}
