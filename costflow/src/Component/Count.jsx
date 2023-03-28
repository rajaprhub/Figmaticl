import React from 'react'
import { useState,useEffect } from 'react' ;
import '../Styles/Count.css' ;
const resobj = { 1 : "None" , 2 : "Basic", 3 : "Advance", 4 : "Complex" }

export const Count = () => {
  const [count,setCount] = useState(1) ;
  const reduce = ()=>{ setCount(count - 1) }
  const add    = ()=>{ setCount(count + 1) }
  const [name, setName] = useState('None');

  return (
    <> 
           <div  className='btnsdiv'>  
            <button className='minusbtn'  disabled = {count == 1} onClick={reduce}> - </button>
             <section className='nbacname'>
               <span>{ resobj[count]} </span>
             </section>
            <button className='plusbtn' disabled = {count == 4}  onClick={add}> + </button>
         </div>
    </>
  )
}

