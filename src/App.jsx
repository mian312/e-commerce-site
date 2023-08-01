import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar'
import Body from './components/Home/Body';
import Product from './components/ProductScreen/SingleProduct/Product';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/Signup';
import Shipping from './components/Shipping/Shipping';
import NewOrder from './components/Orders/NewOrder';
import OrderHistory from './components/Orders/OrderHistory';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path='/' element={<Body />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/shipping/:step' element={<Shipping />} />
            <Route path='/order/:id' element={<NewOrder />} />
            <Route path='/orderhistory' element={<OrderHistory />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/editprofile' element={<EditProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
