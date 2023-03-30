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
                  <h5> DASHBOARD</h5>
                </section>
                <section className={styles.iconanames}>
                <i class="fa fa-graduation-cap"></i>
                  <h5> KNOWLEDGE</h5>
                </section>
                <section className={styles.iconanames}>
                <i class="fa fa-graduation-cap"></i>
                  <h5> MEMBERS</h5>
                </section>
                <section className={styles.iconanames}>
                <i class='fa fa-home'></i>
                  <h5> TEAMS</h5>
                </section>
                <section className={styles.iconanames}>
                  <i class='fa fa-home'></i>
                  <h5> CHAT</h5>
                </section>
             </div>


             <div>
                <section className={styles.iconanames}>
                <i class="fa-solid fa-building"></i>  
                  <h5> SETTINGS</h5>
                </section>
                <section className={styles.iconanames}>
                <i class="fa-solid fa-building"></i>  
                  <h5> COMPANY</h5>
                </section>
                <section className={styles.iconanames}>
                <i class="fa-solid fa-building"></i>  
                  <h5> MY PROFILE</h5>
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
