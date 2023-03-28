  import React,{ useState,useEffect }  from 'react'
  import "../Styles/Cost.css";
  import { Count } from './Count';

 export const Boltcost = ( ) => {



 return (
   <> 
       <div className= 'container costbreak '>

        <div className='container summary'>
             <section  style={{ fontSize: "80px" ,fontWeight: "700"}}>
               5  <sub  style={{ fontSize: "15px", }} >  Pages </sub>
              </section>
             <section> <span style={{ fontSize: "24px" ,fontWeight: "700"}}> $300</span> <br />
              <span className='numbinfos'>Page Design</span>  </section>
             <section>  <span style={{ fontSize: "24px" ,fontWeight: "700"}}> $200 </span> <br /> 
              <span className='numbinfos' >Interactions & Animations</span>
             </section>
             <section>  <span style={{ fontSize: "24px" ,fontWeight: "700"}}>  $100  </span> <br /> 
             <span className='numbinfos'>CMS/Dynamic Data /Intagrations</span>
             </section>
             <section>  <span style={{ fontSize: "18px" ,fontWeight: "700"}} >Sub Total</span>  <br /> 
             <span style={{ fontSize: "40px" ,fontWeight: "700"}} >  $800</span>   </section>
        </div>
       <hr/>
       <table className="table borderless">
        <thead>
              <tr>
                <th>Pages </th>
                <th>Design </th>
                <th>Interactions & Animations </th>
                <th>Interaction </th>
                <th>Cost </th>
              </tr>
        </thead>
       
        <tbody>
          <tr>
           <th><span className='pagenum'> 01. </span><span className='pagenames'>Home</span></th>
           <td>   <Count/> </td>
           <td>   <Count/></td>
           <td>   <Count/></td>
           <td>$200</td>
         </tr>

         <tr>
           <th><span className='pagenum'> 02. </span><span className='pagenames'>Service</span></th>
           <td>   <Count/></td>
           <td>   <Count/></td>
           <td>   <Count/></td>
           <td>$200</td>
         </tr>

         <tr>
           <th><span className='pagenum'>03. </span><span className='pagenames'>About Us</span></th>
           <td>   <Count/></td>
           <td>   <Count/></td>
           <td>   <Count/></td>
           <td>$200</td>
         </tr>

         <tr>
           <th><span className='pagenum'> 04. </span><span className='pagenames'>Partners</span></th>
           <td>   <Count/></td>
           <td>   <Count/></td>
           <td>   <Count/></td>
           <td>$200</td>
         </tr>

         <tr>
           <th><span className='pagenum'> 05. </span><span className='pagenames'>Contact Us</span></th>
           <td>   <Count/></td>
           <td>   <Count/></td>
           <td>   <Count/></td>
           <td>$200</td>
         </tr>


       </tbody>

       </table> 
    </div>

      </>
    )
  }
  
      
