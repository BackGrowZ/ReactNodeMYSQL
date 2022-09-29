import './App.css';
import { BrowserRouter } from "react-router-dom";

import Nav from "./components/NavBar";
import Routeur from "./components/Router";

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routeur />
    </BrowserRouter>
  );
}

export default App;
