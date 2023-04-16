import React, { useState, useContext } from "react";

//* Data
import {
  DishType,
  DietLabel,
  AllergiesRestrictions,
  CuisineType,
} from "../../Data/CheckBox";

//* Context
import { CheckBoxContext } from "../../Contexts/CheckBox";

//* Import components
import { PlusCircle, MinusCircle } from "@phosphor-icons/react";
import axios from "axios";
import ShowOptions from "./ShowOptions";

//* Import context
import { RecipesContext } from "../../Contexts/Recipes";
import { UserInfomationContext } from "../../Contexts/UserInfo";

function SearchRecipe({ setLoading }) {
  const { userInfo } = useContext(UserInfomationContext);

  const [formValues, setFormValues] = useState([{ value: "" }]);

  const [errorForm, setErrorForm] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState({ value: false, text: "" });

  const [dataOption, setDataOption] = useState([
    { name: "DishType", data: DishType, isAdded: [] },
    { name: "DietLabel", data: DietLabel, isAdded: [] },
    {
      name: "AllergiesRestrictions",
      data: AllergiesRestrictions,
      isAdded: [],
    },
    { name: "CuisineType", data: CuisineType, isAdded: [] },
  ]);
  const [showOptions, setShowOptions] = useState([
    {
      name: "DishType",
      text: "Dish Type",
      secondText: "(optional)",
      show: false,
    },
    {
      name: "DietLabel",
      text: "Diet Label",
      secondText: "(optional)",
      show: false,
    },
    {
      name: "AllergiesRestrictions",
      text: "Allergies / Restrictions",
      secondText: "(optional)",
      show: false,
    },
    {
      name: "CuisineType",
      text: "Cuisine Type",
      secondText: "(optional)",
      show: false,
    },
  ]);

  const { setRecipeData } = useContext(RecipesContext);

  const handleChangeForm = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    setErrorForm(false);
    setErrorSubmit({ value: false, text: "" });
  };

  const addFormFields = (i) => {
    if (!formValues[i].value) {
      setErrorForm(true);
    } else {
      setFormValues([...formValues, { value: "" }]);
    }
  };

  const removeFormFields = (i) => {
    let removeField = [...formValues];
    removeField.splice(i, 1);
    setFormValues(removeField);
  };

  // Search a recipe
  const recipesApi = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3001/recipes`,
        { params: { query:query, user: userInfo } }
      );
      setRecipeData({
        data: response.data.data.hits,
        checkRecipe: response.data.checkedInfo,
        status: response.status,
        nextPage: response.data.data._links.next
          ? response.data.data._links.next.href
          : null,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorSubmit({
        value: true,
        text: "Some information was wrong, try again.",
      });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    // Check if has error
    if (!formValues[0].value) {
      setErrorSubmit({
        value: true,
        text: "Write some ingredients for search a recipe.",
      });
    } else {
      setErrorSubmit({ value: false, text: "" });

      let ingredientsSelected = "&q=";
      let checkBoxSeleced = "";

      //* Create query parameter to search a recipe
      formValues.map((obj, index) => {
        let string = "";
        if (index === 0) {
          string = `REQUIRED%3D` + obj.value;
        } else {
          string = `%26REQUIRED%3D` + obj.value;
        }

        ingredientsSelected = ingredientsSelected.concat(string);
      });

      dataOption.map((obj) => {
        obj.isAdded.map((selected, i) => {
          if (selected === true) {
            checkBoxSeleced = checkBoxSeleced.concat(obj.data[i].apiParameter);
          }
        });
      });

      // Search recipe
      const query = ingredientsSelected + checkBoxSeleced;
      recipesApi(query);
    }
  };

  return (
    <div className="bg-third shadow-lg bg-opacity-30 mx-10 px-14 py-10 rounded-lg">
      <form className="flex flex-col">
        <h2 className="font-montserrat text-lg font-medium text-secondary pb-3">
          Enter the first query or ingredient before adding more.
        </h2>
        <div className="flex flex-col gap-3">
          {/* Write dynamicaly input's */}
          {formValues.map((newQuery, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="value"
                  value={newQuery.value}
                  onChange={(e) => handleChangeForm(i, e)}
                  className="px-3 py-2 rounded-lg shadow-lg w-[70%] focus:outline-none font-montserrat"
                  placeholder="Enter query or ingredient"
                />
                {/* Button to remove or add value*/}
                {i + 1 < formValues.length ? (
                  <button
                    type="button"
                    className="active:scale-90"
                    onClick={() => removeFormFields(i)}
                  >
                    <MinusCircle size={28} color="#37373f" weight="duotone" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="active:scale-90"
                    onClick={() => addFormFields(i)}
                  >
                    <PlusCircle size={28} color="#37373f" weight="duotone" />
                  </button>
                )}
              </div>
              {/* In case error and last input field, show message */}
              {errorForm && i + 1 === formValues.length && (
                <label className="pl-2 text-sm font-montserrat font-medium text-[#a92323]">
                  Write something, to add new query/ingredient.
                </label>
              )}
            </div>
          ))}
        </div>
        {/* Show the option user can choose to find the recipe */}
        <CheckBoxContext.Provider value={{ dataOption, setDataOption }}>
          {showOptions.map((obj, i) => (
            <ShowOptions
              key={i}
              data={obj}
              index={i}
              setShowOptions={setShowOptions}
              showOptions={showOptions}
            />
          ))}
        </CheckBoxContext.Provider>
        <div className="flex flex-col justify-center items-center pt-5">
          <button
            type="submit"
            className="py-2 px-3 rounded-lg bg-secondary text-white text-md active:scale-95"
            onClick={(e) => handleClick(e)}
          >
            Show Recipes
          </button>
          {errorSubmit.value && (
            <div className="text-primary text-sm font-medium text-opacity-90 pt-2">
              {errorSubmit.text}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default SearchRecipe;
