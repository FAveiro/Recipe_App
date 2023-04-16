import React from "react";

//* Import components
import Cards from "../Cards";
import { ArrowCircleUp, ArrowCircleLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

function ShowBookmark({ data, change }) {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-third shadow-lg bg-opacity-30 rounded-lg px-2 py-5 my-10">
      {/* Return to search recipe */}
      <div className="pt-2">
        <button
          onClick={() => navigate("/")}
          className="active:scale-95 flex justify-center items-center"
        >
          <ArrowCircleLeft size={32} color="#37373f" weight="thin" />
        </button>
      </div>
      <div className="flex justify-center items-center text-xl md:text-4xl font-lora font-bold text-secondary">
        Bookmark
      </div>
      {/* Show each */}
      <div className="flex flex-wrap justify-center items-center gap-2 place-items-center pt-10">
        {data &&
          data.map((bookmark, i) => (
            <Cards key={i} recipe={bookmark.information} check={true} change={change} />
          ))}
      </div>
      {/* Top of the page */}
      {data.lenght >= 20 && (
        <div className="flex justify-end items-center">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            className="active:scale-95"
          >
            <ArrowCircleUp size={32} color="#37373f" weight="fill" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ShowBookmark;
