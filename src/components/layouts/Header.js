import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import image from "./icons/logo.png"
import { useDispatch, useSelector } from 'react-redux'
import { authActons, authSelector } from '../../redux/slices/authSlice'
import toast from 'react-hot-toast'
import { searchActions, searchSelecter } from '../../redux/slices/searchSlice'
import { cartSelector } from '../../redux/slices/cartSlice'
import { cartLengthAction, cartLengthSelector } from '../../redux/slices/cartLength'
import './headers.css'
// const Header = () => {
// const dispatch = useDispatch();
// const nav = useNavigate();
// const user = useSelector(authSelector).user;
// const auth=useSelector(authSelector);
// const [search, setSearch] = useState();
// const cartLength=useSelector(cartLengthSelector);
// useEffect(() => {
//   dispatch(searchActions.change(search));
// }, [search])
// const handleSearch = (e) => {
//   setSearch(e.target.value)


// }
// const handleLogOut = () => {
//   dispatch(authActons.clearAuth())
//   setTimeout(() => {
//     toast.success("Logged out successfully!!!")
//   }, 500)
//   nav("/login")
// }
// useEffect(()=>{
//   fetch(`${process.env.REACT_APP_API}/api/cart/getNumber`,{
//     method:"POST",
//     headers:{
//       "Authorization":auth.token,
//       "Content-Type":"Application/json"
//     },
//     body:JSON.stringify({
//       userId:auth.user?._id
//     })
//   }).then((res)=>res.json()).then((x)=>dispatch(cartLengthAction.set(x.count)))
// },[])
//   return (
//     <>
// <nav className="navbar navbar-expand-lg bg-body-tertiary " >
//   <div className="container-fluid">
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon" />
//     </button>
//     <div className="collapse navbar-collapse  d-flex justify-content-between" id="navbarTogglerDemo01">

// <Link to="/" className="navbar-brand" href="#">
//   <img src={image} alt='Logo' className='imageHeight' width="auto" ></img>
// </Link>
// {/^\/$|^\/category\/.*$/.test(window.location.pathname) ? <form class="d-flex" role="search">
//   <input class="form-control me-2 ms-5" type="search" placeholder="Search..." value={search} onChange={(e) => { handleSearch(e) }}></input>
// </form> : ''}
// <ul className="navbar-nav mb-2 mb-lg-0">
//   <li className="nav-item ">
//     <NavLink to={"/"} className="nav-link ">Home</NavLink>
//   </li>
//   <li className="nav-item">
//     <NavLink to={"/pageNotFound"} className="nav-link" >WishList</NavLink>
//   </li>
//   <li className="nav-item">
//     <NavLink to={"/cart"} className="nav-link " >Cart({cartLength})</NavLink>
//   </li>
//   {/* <li>
//     <NavLink to={"/cart"} className="nav-link position-relative me-3" >
//       Cart
//       <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
//         {cartLength}
//         <span class="visually-hidden">unread messages</span>
//       </span>
//     </NavLink>
//   </li> */}
//   {user ?
//     <li class="nav-item dropdown">
//       <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//         {user.role}
//       </a>
//       <ul class="dropdown-menu">
//         <li className="dropdown-item">
//           <NavLink to={"/login"} onClick={handleLogOut} className="nav-link">Logout</NavLink>

//         </li>
//         <li className="dropdown-item">
//           <NavLink to={`/dashboard/${user.role}/${user.role}Details`} className="nav-link">dashboard</NavLink>

//         </li>
//       </ul>
//     </li>
//     :
//     <><li className="nav-item">
//       <NavLink to={"/register"} className="nav-link" >Register</NavLink>
//     </li>
//       <li className="nav-item">
//         <NavLink to={"/Login"} className="nav-link " >Login</NavLink>
//       </li></>
//   }
// </ul>
//           </div>
//         </div>
//       </nav>

//     </>
//   )
// }

// export default Header



function Header() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const user = useSelector(authSelector).user;
  const auth = useSelector(authSelector);
  const [search, setSearch] = useState();
  const cartLength = useSelector(cartLengthSelector);
  useEffect(() => {
    dispatch(searchActions.change(search));
  }, [search])
  const handleSearch = (e) => {
    setSearch(e.target.value)


  }
  const handleLogOut = () => {
    dispatch(authActons.clearAuth())
    setTimeout(() => {
      toast.success("Logged out successfully!!!")
    }, 500)
    nav("/login")
  }
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/api/cart/getNumber`, {
      method: "POST",
      headers: {
        "Authorization": auth.token,
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        userId: auth.user?._id
      })
    }).then((res) => res.json()).then((x) => dispatch(cartLengthAction.set(x.count)))
  }, [])
  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">    <Link to="/" className="navbar-brand" href="#">
          <img src={image} alt='Logo' className='imageHeight' width="auto" ></img>
        </Link></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse d-md-flex flex-row justify-content-between" id="navbarSupportedContent">

          {/^\/$|^\/category\/.*$/.test(window.location.pathname) ? <form class="d-flex rounded" role="search" style={{ width:"200px", border: "1px solid black" }} >
            <input class="form-control "  
           type="search" placeholder="Search..." value={search} onChange={(e) => { handleSearch(e) }}></input>
          </form> : ''}
          <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
            <li className="nav-item ">
              <NavLink to={"/"} className="nav-link ">Home</NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink to={"/pageNotFound"} className="nav-link" >WishList</NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink to={"/cart"} className="nav-link " >Cart({cartLength})</NavLink>
            </li>
            {/* <li>
                <NavLink to={"/cart"} className="nav-link position-relative me-3" >
                  Cart
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                    {cartLength}
                    <span class="visually-hidden">unread messages</span>
                  </span>
                </NavLink>
              </li> */}
            {user ?
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {user.role}
                </a>
                <ul class="dropdown-menu">
                  <li className="dropdown-item">
                    <NavLink to={"/login"} onClick={handleLogOut} className="nav-link">Logout</NavLink>

                  </li>
                  <li className="dropdown-item">
                    <NavLink to={`/dashboard/${user.role}/${user.role}Details`} className="nav-link">dashboard</NavLink>

                  </li>
                </ul>
              </li>
              :
              <><li className="nav-item">
                <NavLink to={"/register"} className="nav-link" >Register</NavLink>
              </li>
                <li className="nav-item">
                  <NavLink to={"/Login"} className="nav-link " >Login</NavLink>
                </li></>
            }
          </ul>
        </div>
      </div>
    </nav>

  );
}

export default Header;
