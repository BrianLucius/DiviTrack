import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';  
import AuthPage from "./components/AuthPage";
import Home from "./components/Home";
import PortfolioPage from "./components/Portfolio";
import AddSymbolPage from "./components/AddSymbol";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="home" element={<Home />} >
          <Route index element={<PortfolioPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="add" element={<AddSymbolPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
