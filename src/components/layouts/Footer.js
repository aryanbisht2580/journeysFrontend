import React from 'react'
import styles from "./footer.module.css"
import twit from "./icons/twitter.png"
import face from "./icons/facebook.png"
import snap from "./icons/snapchat.png"
import insta from "./icons/instagram.png"
import yout from "./icons/youtube.png"
const Footer = () => {
  return (
    <div className={`text-light p-3 mt-auto ${styles.footer}`} >
        <div className={styles.footComp}>
          <h3>Contact with us</h3>
          <ul className={styles.list}>
            <li className={styles.li}><a href=''><img src={twit} className={styles.icon}></img></a></li>
            <li className={styles.li}><a href=''><img src={face} className={styles.icon}></img></a></li>
            <li className={styles.li}><a href=''><img src={insta} className={styles.icon}></img></a></li>
            <li className={styles.li}><a href=''><img src={yout} className={styles.icon}></img></a></li>
            <li className={styles.li}><a href=''><img src={snap} className={styles.icon}></img></a></li>
          </ul>
        </div>

        <div className={styles.footComp}>
          <h3>Trending Now</h3>
        </div>
        <div className={styles.footComp}>
          meet
        </div>
        <div className={styles.footComp}>
          IPSY
        </div>
        <div className={styles.footComp}>
          About
        </div>
        <div className={styles.footComp}>
          Help
        </div>
    </div>
  )
}

export default Footer