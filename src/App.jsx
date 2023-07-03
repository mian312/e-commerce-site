import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar'
import Body from './components/Home/Body';
import Deals from './components/Home/Deals';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path='/' element={<Body />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
