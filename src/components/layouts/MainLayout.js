import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Helmet} from "react-helmet";
import  { Toaster } from 'react-hot-toast';
import "./mainLayout.css"
const MainLayout = (props) => {
  return (
    <div style={{width:"100%",overflow:"hidden"}}>
    <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
        <meta name="keywords" content={props.keywords}></meta>
        <meta name="author" content={props.title}></meta>
    </Helmet>
      <div className="d-flex flex-column min-vh-100" style={{position:"relative"}}>
        <Header />
        <div style={{ minHeight: "80vh"}} className="mTop ">
          
          <Toaster/>
          {props.children}</div>
      </div>
    </div>
  );
};
MainLayout.defaultProps={
  title:"JOURNEYS",
  keywords:"HTML, CSS, JavaScript",
  author:"Aryan Bisht"

}
export default MainLayout;
