import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
          {/* <Route path="/" element={<div style={{ minHeight: '120px' }}>
              <div class="collapse collapse-horizontal" id="collapseWidthExample">
                <div class="card card-body" style={{ width: '300px' }}>
                  This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.
                </div>
              </div>
            </div>}/> */}
            

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
