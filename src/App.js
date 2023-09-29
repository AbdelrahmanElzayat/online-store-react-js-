import { useEffect } from 'react';
import './App.css';
import {Routes, Route, useLocation} from "react-router-dom";
import Footer from "./components/footer/Footer"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Signup from "./pages/SignUp/Signup"
import Shop from "./pages/Shop/Shop"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import Cart from "./pages/cart/Cart"
import Checkout from "./pages/Checkout/Checkout"
import ProtectedRoute from './protectedRouters/ProtectedRoute';
import AllProducts from './Admin/AllProducts';
import AddProduct from './Admin/AddProduct';
import Dashboard from './Admin/Dashboard';
import AdminNav from './Admin/AdminNav';
import Users from './Admin/Users';
import useAuth from './custom-hooks/useAuth';
import Header2 from './components/header/Header2';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './rtk/slices/productSlice';
import Per from './Admin/Per';
import NotFound from './pages/notFound/NotFound';


function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const {currentUser} = useAuth(null);
  
  useEffect(()=>{
    dispatch(fetchProducts());
  },[])

  return (
    <>
    {
      location.pathname.startsWith("/dashboard") ? <AdminNav/> : 
      // <Header />
      <Header2/>
    }
    
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/shop' element={ <Shop /> } />
        <Route path='/shop/:id' element={ <ProductDetails /> } />
        <Route path='/cart' element={ <Cart /> } />

        <Route path='/' element={<ProtectedRoute/>}>
           <Route path='checkout' element={<Checkout/>} />
           <Route path='dashboard/all-products' element={currentUser?.uid === "xb8paUosNSajUoGN8NmbDxkQ7rY2" ? <AllProducts/> : currentUser?.uid === undefined || currentUser?.uid === null ? <h1>please wait</h1> : <Per/>} />
           <Route path='dashboard/add-products' element={currentUser?.uid === "xb8paUosNSajUoGN8NmbDxkQ7rY2" ?<AddProduct/>: currentUser?.uid === undefined || currentUser?.uid === null  ? <h1>please wait</h1> : <Per/>} />
           <Route path='dashboard/users' element={currentUser?.uid === "xb8paUosNSajUoGN8NmbDxkQ7rY2" ?<Users/>: currentUser?.uid === undefined || currentUser?.uid === null ? <h1>please wait</h1> : <Per/>} />
           <Route path='dashboard' element={currentUser?.uid === "xb8paUosNSajUoGN8NmbDxkQ7rY2" ?<Dashboard/>: currentUser?.uid === undefined || currentUser?.uid === null  ? <h1>please wait</h1> : <Per/>} />
           {/* <Route path='dashboard/orders' element={currentUser?.uid === "xb8paUosNSajUoGN8NmbDxkQ7rY2" ?<AllProducts/>: currentUser?.uid === undefined || currentUser?.uid === null  ? <h1>please wait</h1> : <h1>you haven't permession to access this page</h1>} /> */}
        </Route>
        <Route path='/login' element={ <Login /> } />
        <Route path='/signup' element={ <Signup /> } />
        <Route path='*' element={<NotFound/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
