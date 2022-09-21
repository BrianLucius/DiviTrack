import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';  
import AuthPage from "./components/AuthPage";
import PortfolioPage from "./components/PortfolioPage";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </div>
  );
}

export default App;
