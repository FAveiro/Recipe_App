import React, { useState } from "react";

//* Import components
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { List } from "@phosphor-icons/react";
import { useCookies } from "react-cookie";

function Header({ navbar }) {
  const navigate = useNavigate();
  
  const [cookies, setCookies] = useCookies(["access_token"]);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const [openMenu, setOpenMenu] = useState(false);

  const navbarValues = [
    {
      text: "Log Out",
      function() {
        setCookies("access_token", "");
        localStorage.removeItem("userID");
        navigate("/");
      },
    },
    {
      text: "Settings",
      function() {
        navigate("/settings");
      },
    },
    {
      text: "Bookmarks",
      function() {
        navigate("/bookmarks");
      },
    },
  ];

  const navbarHorizontal = () => {
    return (
      <div className="gap-5 col-start-5 flex flex-row-reverse">
        {navbarValues.map((option, i) => (
          <button
            onClick={() => option.function()}
            key={i}
            className="bg-third bg-opacity-50 p-2 rounded-xl text-sm lg:text-base font-montserrat font-medium text-secondary shadow-lg active:scale-95"
          >
            {option.text}
          </button>
        ))}
      </div>
    );
  };

  const navbarVertical = () => {
    return (
      <div className="col-start-5 flex flex-col items-end">
        <button
          className="active:scale-95"
          onClick={() => setOpenMenu(!openMenu)}
        >
          <List size={28} color="#37373f" />
        </button>
        {openMenu && (
          <div className="flex flex-col-reverse items-end gap-2 w-24 sm:w-28 mt-2 p-2 rounded-xl bg-third bg-opacity-50 shadow-lg">
            {navbarValues.map((option, i) => (
              <button
                onClick={() => option.function()}
                key={i}
                className="text-xs sm:text-sm font-montserrat font-medium text-secondary active:scale-95 hover:text-opacity-70"
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-4 mx-10 mt-10">
      <button className="col-start-1 h-fit w-fit" onClick={() => navigate("/")}>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-lora font-bold text-third">
          <span className="text-secondary">Recipe</span>
          App
        </h1>
      </button>
      {navbar === true
        ? isDesktopOrLaptop
          ? navbarHorizontal()
          : navbarVertical()
        : null}
    </div>
  );
}

export default Header;
