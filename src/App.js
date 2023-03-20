
import NavBar from "./components/NavBar";
import ProductCards from "./components/ProductCards";
import Slider from "./components/Slider";

import {Routes , Route} from "react-router-dom"
import './components/slider.css';
import About from "./components/About";
import ProductDetails from "./components/ProductDetails";
import PofCat from "./components/PofCat";
function App() {
  return (
    <div className="App">
       <NavBar />
       <Routes>
        <Route path="/" element={
          <>
            <Slider />
            <ProductCards />
          </>
        }
        />
        <Route path="About" element={
        <>
          <About />
        </>} />
        <Route path="Product/:productId" element={<><ProductDetails/></>}/>
        <Route path="Category/:categoryName" element={<><PofCat/></>}/>
       </Routes>
    </div>
  );
}

export default App;
