import React, { useContext, useState, useCallback } from "react";

//* Components
import Header from "../Components/Header";
import SearchRecipe from "../Components/SearchRecipe";
import Loading from "../Components/Loading";
import ShowRecipe from "../Components/ShowRecipe";

//* Import icons
import { HandWaving } from "@phosphor-icons/react";

//* Import context
import { UserInfomationContext } from "../Contexts/UserInfo";
import { RecipesContext } from "../Contexts/Recipes";

function Home() {
  const { userInfo } = useContext(UserInfomationContext);
  const [recipeData, setRecipeData] = useState({
    data: null,
    status: null,
    nextPage: null,
  });
  const [loading, setLoading] = useState(false);

  const removeData = useCallback(() => {
    setRecipeData({ data: null, status: null, nextPage: null });
  }, [recipeData]);

  return (
    <div className="w-screen h-screen flex flex-col gap-20">
      <div className="flex flex-col">
        <Header navbar={true} />
      </div>
      <div className="px-10">
        <div className="flex gap-2">
          <h2 className="font-montserrat text-2xl font-medium text-secondary pb-3">
            Hi, <span className="font-normal">{userInfo}</span>
          </h2>
          <HandWaving size={30} color="#ff0076" />
        </div>
        <h3 className="font-montserrat text-xl font-light text-secondary pb-3">
          Let's get cooking good looking!
        </h3>
        <RecipesContext.Provider value={{ recipeData, setRecipeData }}>
          {loading ? (
            <Loading />
          ) : recipeData.status === 200 ? (
            <ShowRecipe removeData={removeData} />
          ) : (
            <SearchRecipe setLoading={setLoading} />
          )}
        </RecipesContext.Provider>
      </div>
    </div>
  );
}

export default Home;
