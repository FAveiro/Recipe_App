import React from "react";

//* Utils
import { CapitalizeString } from "../../Utils/CapitalizeString";

//* Import components
import { Heart } from "@phosphor-icons/react";
import { useHover } from "../../Hooks/useHover";
import { ArrowCircleLeft } from "@phosphor-icons/react";

function ExpandCard({
  ExpandCard,
  image,
  label,
  dishType,
  ingredients,
  preparation,
  addbookmark,
  checked,
}) {
  
  const [hoverHeart, setHoveringHeart] = useHover(checked);

  return (
    <div className="flex flex-col justify-around items-center border border-third shadow-lg rounded-lg gap-2 p-2">
      <div className="w-full">
        {/* Return to "normal" card */}
        <div className="flex justify-start items-center h-fit">
          <button
            onClick={() => ExpandCard()}
            className="active:scale-95 flex justify-center items-center"
          >
            <ArrowCircleLeft size={28} color="#37373f" weight="thin" />
          </button>
        </div>
        {/* Tittle */}
        <h1 className="font-lora text-lg text-secondary text-center break-words">
          {label}
        </h1>
      </div>
      {/* Image and ingredients */}
      <div className="flex justify-center items-center gap-5">
        {/* Image and link for recipe */}
        <div className="flex flex-col justify-between items-center gap-2">
          <img src={image} alt={label} className="rounded-lg h-40" />
          <div className="font-montserrat font-medium text-secondary break-words w-2/3">
            <button onClick={() => window.open(preparation)}>
              All information about recipe.
            </button>
          </div>
        </div>
        {/* Ingredients */}
        <div className="flex flex-col">
          {ingredients.map((ingredient, i) => (
            <label
              className="font-montserrat font-medium text-secondary"
              key={i}
            >
              {ingredient}
            </label>
          ))}
        </div>
      </div>
      {/* Dish Type */}
      <div className="flex flex-wrap gap-2">
        {dishType.map((dishType, i) => (
          <label
            className="bg-secondary bg-opacity-10 rounded-lg font-montserrat text-sm font-medium text-secondary text-center break-words p-2"
            key={i}
          >
            {CapitalizeString(dishType)}
          </label>
        ))}
      </div>
      {/* Add to bookmark */}
      <div className="flex justify-center items-center">
        <button
          ref={hoverHeart}
          className="flex justify-center items-center gap-2 active:scale-95"
          onClick={() => addbookmark()}
        >
          <label className="font-montserrat font-medium text-third hover:text-secondary cursor-pointer">
            {checked ? "Remove " : "Add "}
            bookmark
          </label>
          <Heart
            size={22}
            color="#a92323"
            weight={setHoveringHeart ? "fill" : "thin"}
          />
        </button>
      </div>
    </div>
  );
}

export default ExpandCard;
