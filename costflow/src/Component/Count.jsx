import React from 'react'
import { useState,useEffect } from 'react' ;
import '../Styles/Count.css' ;

const resobj =  { 1 : {name: "None" , bgcolor :"whitesmoke"},
                  2 : {name: "Basic" , bgcolor :"#91D4A8"},
                  3 : {name: "Advance" , bgcolor :"#E9BE74"},
                  4 : {name: "Complex" , bgcolor :"#F57F6C"},
               }

export const Count = () => {
  const [count,setCount] = useState(1) ;
  const reduce = ()=>{ setCount(count - 1) }
  const add    = ()=>{ setCount(count + 1) }

 
  return (
    <> 
           <div  className='btnsdiv'>  
            <button  className='minusbtn'  disabled = {count == 1} onClick={reduce}> - </button>
             <section className='nbacname'>
               <span style={ {backgroundColor: `${ resobj[count].bgcolor}`}}> {resobj[count].name} </span>
             </section>
            <button className='plusbtn' disabled = {count == 4}  onClick={add}> + </button>
         </div>
    </>
  )
}

