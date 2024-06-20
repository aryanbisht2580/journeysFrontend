
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home";
import PageNoteFound from "./pages/pagenotfound";
import Policy from "./pages/policy";
import About from "./pages/about";
import Contact from "./pages/contact";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";
import ProtectedDash from "./components/Routes/protected";
import ForgetPassEmail from "./pages/Auth/forgotPassEmail";
import ForgetPassCode from "./pages/Auth/forgotPassCode";
import UserDashboard from "./pages/user/userDashboard";
import AdminDashboard from "./pages/admin/adminDashboard";
import ProtectedAdminDash from "./components/Routes/protectedAdmin";
import AdminDetails from "./components/admin/adminDetails";
import CreateCategory from "./components/admin/createCategory";
import CreateProduct from "./components/admin/createProduct";
import EditProduct from "./components/admin/editProduct";
import UserDetails from "./components/user/userDetails";
import Orders from "./components/user/order";
import UpdateProduct from "./components/admin/updateProduct";
import SingleProduct from "./pages/singleProduct";
import CategoryProducts from "./pages/categoryProducts";
import CartPage from "./pages/cartPage";
import EditUser from "./pages/user/editUser";
import CheckOut from "./pages/checkOut/checkout";
import AdminOrders from "./components/admin/adminOrders";
import NavTest from "./components/layouts/navtest";

function App() {
  const router=createBrowserRouter([
    {path:"/",element:<Home/>},
    {path:"/cart",element:<CartPage/>},
    {path:"/register",element:<Register/>},
    {path:"/product/:slug",element:<SingleProduct/>},
    {path:"/login",element:<Login/>},
    {path:"/about",element:<About/>},
    {path:"/contact",element:<Contact/>},
    {path:"/pageNotFound",element:<PageNoteFound/>},
    {path:"/policy",element:<Policy/>},
    {path:"/forgetPassEmail",element:<ForgetPassEmail/>},
    {path:"/category/:slug",element:<CategoryProducts/>},
    {path:"/checkout",element:<CheckOut/>},

    {path:"/forgotPassCode",element:<ForgetPassCode/>},
    {path:"/dashboard",element:<ProtectedDash/>,children:[
      {path:"user",element:<UserDashboard/>,children:[
        {path:"userDetails",element:<UserDetails/>},
        {path:"orders",element:<Orders/>},
        {path:"editProfile",element:<EditUser/>}
      ]}
    ]},
    {path:"/dashboard",element:<ProtectedAdminDash/>,children:[
      {path:"admin",element:<AdminDashboard/>,children:[
        {path:"adminDetails",element:<AdminDetails/>},
        {path:"createCategory",element:<CreateCategory/>},
        {path:"createProduct",element:<CreateProduct/>},
        {path:"editProduct",element:<EditProduct/>},
        {path:"updateProduct/:slug",element:<UpdateProduct/>},
        {path:"orders",element:<AdminOrders/>}
      ]}
    ]},
    {path:"test",element:<NavTest/>},

    {path:"*",element:<PageNoteFound/>}
  ])
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
