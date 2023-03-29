import React from "react";
import "./App.css";

//* Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//* Cookies
import { useCookies } from "react-cookie";

//* Pages
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Bookmarks from "./Pages/Bookmarks";
import Settings from "./Pages/Settings";

function App() {
  const [cookies] = useCookies(["access_token"]);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={cookies.access_token ? <Home /> : <Auth />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
