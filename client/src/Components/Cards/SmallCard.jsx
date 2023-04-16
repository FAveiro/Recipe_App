import React from "react";

//* Utils
import { CapitalizeString } from "../../Utils/CapitalizeString";

//* Import components
import { Heart, ReadCvLogo } from "@phosphor-icons/react";
import { useHover } from "../../Hooks/useHover";

function SmallCard({
  ExpandCard,
  image,
  label,
  dishType,
  addbookmark,
  checked,
}) {
  const [hoverImage, setHovering] = useHover();
  const [hoverRecipe, setHoveringRecipe] = useHover();
  const [hoverHeart, setHoveringHeart] = useHover(checked);

  return (
    <div className="flex flex-col justify-around items-center border border-third shadow-lg rounded-lg gap-2 p-5 w-96 h-96 scale-90">
      <div
        ref={hoverImage}
        className="flex justify-center items-center w-[60%]"
      >
        <img
          src={image}
          alt={label}
          className={`rounded-lg ${
            setHovering ? "brightness-[0.4]" : "brightness-100"
          }`}
        />
        {/* Show buttons when hover the image */}
        {setHovering && (
          <div className="absolute z-{1} flex justify-center items-center gap-3">
            {/* Read recipe */}
            <button
              ref={hoverRecipe}
              onClick={() => ExpandCard()}
              className="w-1/3 flex flex-col justify-center items-center active:scale-95"
            >
              <ReadCvLogo
                size={32}
                color="#a92323"
                weight={setHoveringRecipe ? "fill" : "thin"}
              />
              <label className="font-montserrat font-medium text-third cursor-pointer">
                Read recipe
              </label>
            </button>
            {/* Add to bookmark */}
            <button
              onClick={() => addbookmark()}
              ref={hoverHeart}
              className="w-1/3 flex flex-col justify-center items-center active:scale-95"
            >
              <Heart
                size={32}
                color="#a92323"
                weight={setHoveringHeart ? "fill" : "thin"}
              />
              <label className="font-montserrat font-medium text-third cursor-pointer">
                {checked ? "Remove " : "Add "}
                bookmark
              </label>
            </button>
          </div>
        )}
      </div>
      <h1 className="font-lora text-lg text-secondary text-center break-words px-2">
        {label}
      </h1>
      <div className="flex flex-wrap gap-2">
        {dishType &&
          dishType.map((dishType, i) => (
            <label
              className="bg-secondary bg-opacity-10 rounded-lg font-montserrat text-sm font-medium text-secondary text-center break-words p-2"
              key={i}
            >
              {CapitalizeString(dishType)}
            </label>
          ))}
      </div>
    </div>
  );
}

export default SmallCard;
