import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';  
import AuthPage from "./components/AuthPage";
import LandingPage from "./components/Home";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
