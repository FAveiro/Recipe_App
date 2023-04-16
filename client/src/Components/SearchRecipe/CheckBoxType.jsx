import React, { useContext } from "react";

//* Import context
import { CheckBoxContext } from "../../Contexts/CheckBox";

function CheckBoxType({ indexGroup }) {
  const { dataOption, setDataOption } = useContext(CheckBoxContext);

  const onChangeItem = (indexGroup, indexCheck) => {
    const dataChange = [...dataOption];
    dataChange[indexGroup].isAdded[indexCheck] =
      !dataChange[indexGroup].isAdded[indexCheck];
    setDataOption(dataChange);
  };

  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-5 bg-secondary bg-opacity-10 rounded-lg mt-2 p-2">
      {dataOption[indexGroup].data.map((dataCheck, indexCheck) => {
        return (
          <div key={indexCheck} className="flex gap-2">
            <input
              type="checkbox"
              checked={dataOption[indexGroup].isAdded[indexCheck]}
              value={dataCheck.text}
              onChange={() => onChangeItem(indexGroup, indexCheck)}
            />
            <label className="font-montserrat text-sm md:text-base text-secondary">
              {dataCheck.text}
            </label>
          </div>
        );
      })}
    </div>
  );
}

export default CheckBoxType;
