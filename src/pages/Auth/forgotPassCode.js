import React, { useState } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import styles from "./register.module.css"
import toast from "react-hot-toast";
import { json, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/slices/authSlice";
const ForgetPassCode = () => {
    const [otp, setOtp] = useState();
    const [pass, setPass] = useState();
    const [show, setShow] = useState(false);
    const nav = useNavigate();
    const {code,codeUser}=useSelector(authSelector);
    const auth=useSelector(authSelector);
    
    const handleSubmit = (e) => {
        // console.log(otp);
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API}/api/auth/setForgetPassword`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(
                {
                    userCode:otp,
                    newPassword:pass,
                    user:codeUser,
                    code
                }
            )
        }).then((res)=>res.json()).then((x)=>{
            if(x.success){
                setTimeout(()=>{
                    toast.success(x.message);
                },500)
                nav("/login");
            }
            else{
                setTimeout(()=>{
                    toast.error(x.message);
                },500)
            }
            setOtp("");
            setPass("")
        })
    }
    return (
        <MainLayout>
            <div className={styles.center}>
                <h1>Reset Password</h1>
                <form className={styles.form} onSubmit={handleSubmit} >
                    <div className="mb-3 ">
                        <label htmlFor="otp" className="form-label">Enter OTP</label>
                        <input type="number" className="form-control" id="otp" onChange={(e) => setOtp(e.target.value)} value={otp}
                            required />
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="pass" className="form-label">Enter Password</label>
                        <input type="password" className="form-control" id="pass" onChange={(e) => setPass(e.target.value)} value={pass}
                            required />
                    </div>

                    <button type="submit" className="btn btn-primary">Change Password</button>
                    {show ? <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div> : ""}
                </form>



            </div>

        </MainLayout>
    );
};

export default ForgetPassCode;
