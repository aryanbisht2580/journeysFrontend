import React, { useEffect } from 'react'
import MainLayout from '../components/layouts/MainLayout'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import styles from "./pageNotFound.module.css"
const PageNoteFound = () => {
  const nav=useNavigate();
  return (
    <MainLayout>
        <div className={styles.outdiv}>
          <h1 className={`${styles.fof} ${styles.space}`}>404</h1>
          <h3 className={styles.space}>OOPS ! Page Not Found</h3>
          <button onClick={()=>nav(-1) } style={{marginTop:"20px", padding:"10px"}}>Go Back</button>
        </div>
    </MainLayout>
  )
}

export default PageNoteFound