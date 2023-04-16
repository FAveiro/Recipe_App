import React, { useState, useContext } from "react";

//* Import components
import axios from "axios";
import Cards from "../Cards";
import { ArrowCircleUp, ArrowCircleLeft } from "@phosphor-icons/react";
import { Rings } from "react-loader-spinner";

//* Import context
import { RecipesContext } from "../../Contexts/Recipes";
import { UserInfomationContext } from "../../Contexts/UserInfo";

function ShowRecipe({ removeData }) {
  const { userInfo } = useContext(UserInfomationContext);

  const { recipeData, setRecipeData } = useContext(RecipesContext);

  const [loading, setLoading] = useState(false);

  const recipesApi = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3001/recipes/nextpage`,
        {
          params: { urlNextPage: recipeData.nextPage, user: userInfo },
        }
      );
      const newObj = {
        data: recipeData.data.concat(response.data.data.hits),
        checkRecipe: recipeData.checkRecipe.concat(response.data.checkedInfo),
        status: response.status,
        nextPage: response.data.data._links.next
          ? response.data.data._links.next.href
          : null,
      };
      setRecipeData(newObj);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col bg-third shadow-lg bg-opacity-30 rounded-lg px-2 py-5 my-10">
      {/* Return to search recipe */}
      <div className="pt-2">
        <button
          onClick={() => removeData()}
          className="active:scale-95 flex justify-center items-center"
        >
          <ArrowCircleLeft size={32} color="#37373f" weight="thin" />
        </button>
      </div>
      <div className="flex justify-center items-center text-xl md:text-4xl font-lora font-bold text-secondary">
        Recipes
      </div>
      {/* Show each */}
      <div className="flex flex-wrap justify-center items-center gap-2 place-items-center pt-10">
        {recipeData.data.map((recipe, i) => (
          <Cards
            key={i}
            recipe={recipe.recipe}
            checked={recipeData.checkRecipe[i]}
            change={() => null}
          />
        ))}
      </div>
      {/* Load more */}
      {recipeData.nextPage && (
        <div className="flex justify-center items-center">
          {loading ? (
            <Rings
              height="80"
              width="80"
              color="#ff0076"
              radius="6"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="rings-loading"
            />
          ) : (
            <button
              onClick={() => recipesApi()}
              className="flex justify-center items-center bg-secondary bg-opacity-10 py-2 px-5 rounded-xl text-sm lg:text-base font-montserrat font-medium text-secondary shadow-lg active:scale-95"
            >
              Load more...
            </button>
          )}
        </div>
      )}
      {/* Top of the page */}
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
    </div>
  );
}

export default ShowRecipe;
