import React, { useContext } from "react";

//* Import components
import { CaretDown } from "@phosphor-icons/react";
import CheckBoxType from "./CheckBoxType";

//* Import context
import { CheckBoxContext } from "../../Contexts/CheckBox";

function ShowOptions({ data, index, setShowOptions, showOptions }) {
  const { dataOption, setDataOption } = useContext(CheckBoxContext);

  const handleShowOption = (index) => {
    let newShowOptions = [...showOptions];
    newShowOptions[index].show = !newShowOptions[index].show;
    setShowOptions(newShowOptions);

    // Turn off every option
    let turnOffOption = [...dataOption];
    turnOffOption[index].isAdded.length = turnOffOption[index].data.length;
    turnOffOption[index].isAdded.fill(false);
    setDataOption(turnOffOption);
  };

  return (
    <div className="pt-5">
      <button
        className="flex justify-center items-center active:scale-95"
        type="button"
        onClick={() => handleShowOption(index)}
      >
        <h3 className="font-montserrat text-lg font-medium text-secondary">
          {data.text}
          <span className="text-base font-light"> {data.secondText}</span>
        </h3>
        <CaretDown size={20} color="#37373f" weight="thin" />
      </button>
      {data.show && <CheckBoxType indexGroup={index} />}
    </div>
  );
}

export default ShowOptions;
