import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/auth";
import { Create } from "./pages/create-recipe";
import { Save } from "./pages/saved-recipes";
import { Register } from "./pages/register";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path = "/register" element={< Register />} />
          <Route path="/create-recipe" element={<Create />} />
          <Route path="/saved-recipes" element={<Save />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
