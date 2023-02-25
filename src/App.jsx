import "./App.css";
import Home from "./Components/Home/Home";
import {Route,Routes} from "react-router-dom" ;
import View from "./Components/View/View";

function App() {
 
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:id" element={<View/>} />
      </Routes>
    </div>
  );
}

export default App;
