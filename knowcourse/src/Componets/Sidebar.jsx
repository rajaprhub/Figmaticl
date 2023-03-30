import React, { useEffect, useState } from "react";
import styles from '../Styles/Sidebar.module.css'

export const Sidebar = () => {


    
  return (
    <div>  
      
         <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQygraxtK9tkJoSw6OQnz2DAlSgrVsttN57SA&usqp=CAU' w="100%"  />
         
          <div className={styles.sourcediv}>

             <div className={styles.homeitems}>
                <section className={styles.iconanames}>
                  <i class='fa fa-home'></i>
                  <h6> DASHBOARD</h6>
                </section>
                <section className={styles.iconanames}>
                <i class="fa fa-graduation-cap"></i>
                  <h6> KNOWLEDGE</h6>
                </section>
                <section className={styles.iconanames}>
                <i class="fa fa-graduation-cap"></i>
                  <h6> MEMBERS</h6>
                </section>
                <section className={styles.iconanames}>
                <i class='fa fa-home'></i>
                  <h6> TEAMS</h6>
                </section>
                <section className={styles.iconanames}>
                  <i class='fa fa-home'></i>
                  <h6> CHAT</h6>
                </section>
             </div>


             <div>
                <section className={styles.iconanames}>
                <i class="fa-solid fa-building"></i>  
                  <h6> SETTINGS</h6>
                </section>
                <section className={styles.iconanames}>
                <i class="fa-solid fa-building"></i>  
                  <h6> COMPANY</h6>
                </section>
                <section className={styles.iconanames}>
                <i class="fa-solid fa-building"></i>  
                  <h6> MY PROFILE</h6>
                </section>
             </div>

          </div>
           
           <div className={styles.powreddiv}> 
             <span>Powered By</span>
              <img  className={styles.powerimg }   src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQygraxtK9tkJoSw6OQnz2DAlSgrVsttN57SA&usqp=CAU' />

           </div>
        
     

        

    </div>
  )
}
