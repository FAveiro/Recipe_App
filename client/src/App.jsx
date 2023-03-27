import React from "react";
import "./App.css";

//* Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//* Cookies
import { useCookies } from "react-cookie";

//* Pages
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import CreateRecipe from "./Pages/CreateRecipe";
import SavedRecipe from "./Pages/SavedRecipe";

function App() {
  const [cookies] = useCookies(["acess_token"]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={cookies.acess_token ? <Home /> : <Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipe" element={<SavedRecipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
