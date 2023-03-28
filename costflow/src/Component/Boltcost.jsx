  import React,{ useState,useEffect }  from 'react'

  import Table from 'react-bootstrap/Table';

  import "../Styles/Cost.css";


export const Boltcost = ( ) => {

   
  
   

    return (
      <> 
    
     <div className= ' costbreak '>
          
         {/* <thead>
            <tr>
              <th  style={{ fontSize: "55px"}} >5
                <sub  style={{ fontSize: "15px", }} >  Pages </sub>
              </th>
              <td> <span>  $300</span> <br /> <span>Page Design</span> </td>
              <td> <span> $200 </span> <br />  <span>Interactions & Animations</span> </td>
              <td> <span>  $100  </span> <br /> <span>CMS/Dynamic Data /Intagrations</span>  </td>
              <th>  <span>Sub Total</span>  <br /> <span>  $800</span>  </th>
            </tr>
          </thead>
       
          <hr/> */}

         <Table  className=' borderless'>
            
          <thead > 
            <tr>
               <th className='dpages' >Pages </th>
               <th>Design </th>
               <th>Interactions & Animations </th>
               <th className='dpages'>Interaction </th>
               <th className='dcost'>Cost </th>
            </tr>
          </thead>
                 {/* **************   */}
         <tbody>
         
          <tr>
             <th className='dpages'> 01. <span className='pagenames'>Home</span></th>

             <td> <div className='nbacdata'>
                  <button className='reducebtn'
                    
                     >-</button>
                  <span className='nbacchang' >None</span>
                  <button className='incbtn' 
                  >+</button>
               </div></td>

               <td> <div className='nbacdata'>
                  <button className='reducebtn'>-</button>
                  <span className='nbacchang' > advance</span>
                  <button className='incbtn'
                  >+</button>
               </div></td>

                <td> <div className='nbacdata'>
                  <button className='reducebtn' >-</button>
                  <span className='nbacchang' > complex</span>
                  <button className='incbtn' 
                  >+</button>
               </div></td>

             <td  className='dcost' >$200</td>
          </tr>

         </tbody>
          

              

        </Table>

    </div>

      </>
    )
  }
  
      
