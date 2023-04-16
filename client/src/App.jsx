import React, { useState } from "react";
import "./App.css";

//* Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//* Cookies
import { useCookies } from "react-cookie";

//* Pages
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Bookmarks from "./Pages/Bookmarks";

//* Context
import { UserInfomationContext } from "./Contexts/UserInfo";

function App() {
  const [cookies] = useCookies(["access_token"]);
  const [userInfo, setUserInfo] = useState(localStorage.getItem("username"));

  return (
    <div>
      <UserInfomationContext.Provider value={{ userInfo, setUserInfo }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={cookies.access_token ? <Home /> : <Auth />}
            />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </Router>
      </UserInfomationContext.Provider>
    </div>
  );
}

export default App;
