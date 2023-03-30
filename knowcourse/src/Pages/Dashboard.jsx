import React, { useEffect, useState } from "react";
import { Box, Flex,Text, Image } from "@chakra-ui/react";

import { Sidebar } from "../Componets/Sidebar";
import { Knowledge } from "../Componets/Knowledge";

import styles from '../Styles/dashboard.module.css'


export const Dashboard = () => {


    
  return (
    <>  
    <div className={styles.dashbdiv}>
   
      <div className={styles.sidebardiv}>
          <Sidebar/>
      </div>

     <div className={styles.knowledgediv}> 
         <Knowledge/>
      </div>
 
    
   </div>

         




    </>
  )
}
