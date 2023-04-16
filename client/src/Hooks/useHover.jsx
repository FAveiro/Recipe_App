import { useState, useRef, useEffect } from "react";

export const useHover = (values) => {
  const [value, setValue] = useState(values);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(values ? false : true);
  const handleMouseOut = () => setValue(values ? true : false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, [ref.current]);
  return [ref, value];
};
