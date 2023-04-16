import React, { useState, useCallback, useContext } from "react";

//* Import components
import axios from "axios";
import SmallCard from "./SmallCard";
import ExpandCard from "./ExpandCard";

//* Context
import { UserInfomationContext } from "../../Contexts/UserInfo";

function Cards({ recipe, check, change }) {
  const { userInfo } = useContext(UserInfomationContext);

  const [expandCard, setExpandCard] = useState(false);
  const [checked, setChecked] = useState(check);

  const ExpandCardAction = useCallback(() => {
    setExpandCard(!expandCard);
  }, [expandCard]);

  const addbookmark = async () => {
    change(recipe.url)
    const action = checked ? "Remove" : "Add";
    const values = {
      url: recipe.url,
      username: userInfo,
      infoData: recipe,
      action: action,
    };
    try {
      setChecked(action === 'Remove' ? false : true);
      const response = await axios.post(
        "http://localhost:3001/bookmark/favorite",
        values
      );
    } catch (err) {
      console.log(err);
    }
  };

  return expandCard ? (
    <ExpandCard
      ExpandCard={ExpandCardAction}
      image={recipe.image}
      label={recipe.label}
      dishType={recipe.dishType}
      ingredients={recipe.ingredientLines}
      preparation={recipe.url}
      addbookmark={addbookmark}
      checked={checked}
    />
  ) : (
    <SmallCard
      ExpandCard={ExpandCardAction}
      image={recipe.image}
      label={recipe.label}
      dishType={recipe.dishType}
      preparation={recipe.url}
      addbookmark={addbookmark}
      checked={checked}
    />
  );
}

export default Cards;
