import React, { useEffect ,useState} from 'react'
import { useNavigate , useLocation} from 'react-router-dom';

const Spinner = (props) => {
    const [count,setCount]=useState(5);
    const nav=useNavigate();
    const location=useLocation();
    useEffect(()=>{
        let intv=setInterval(()=>{
            setCount((prev)=>prev-1);
        },1000)
        count===0 && nav(props.page,{
            state:location.pathname
        })
        return ()=>clearInterval(intv)
    },[count,location,nav])
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"100vh"}}>
            <h1>Redirecting in {count} second</h1>
            <div className="spinner-border" role="status">
                
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>

    )
}

export default Spinner