import ban from "./banner.json"
import React, { useEffect, useRef, useState } from 'react'
import styles from "./bannerStyle.module.css"
import nike from "./imgs/newnike.png"
import adi from "./imgs/adi.jpg"
import puma from "./imgs/puma.png"
import newbal from "./imgs/balance.png"
import "./banner.css"
const Banner = () => {
  const [index,setIndex]=useState(0);
  let count=null;

  useEffect(() => {
    count= setInterval(() => {
      setIndex((i) => (i + 1 === 4 ? 0 : i + 1));
    }, 3000);

    return () => clearInterval(count);
  }, []);
  return (
 <div style={{display:"flex",flexDirection:"row",width:"100%",alignItems:"center"}} className="p-2">
  

  <div className="btn btn-primary m-2 showButton" onClick={()=>{setIndex((i) => (i - 1 === -1 ? 3 : i - 1))}}>
  <i class="fa-solid fa-arrow-left"></i>
  </div>
    
    <div className={`imageSize ${styles.slideContainer}`}>
  <div className={styles.innerContain} style={{transform:`translateX(-${index*100}%)`}}>
    <img src={adi}  className={styles.slides}></img>
    <img src={nike}  className={styles.slides}></img>
    <img src={puma}  className={styles.slides}></img>
    <img src={newbal}  className={styles.slides}></img>
  </div>
</div>
<div className="btn btn-primary m-2 showButton" onClick={()=>setIndex((i) => (i + 1 === 4 ? 0 : i + 1))}>
 <i class="fa-solid fa-arrow-right"></i>
 </div>
 </div>

    
  )
}

export default Banner