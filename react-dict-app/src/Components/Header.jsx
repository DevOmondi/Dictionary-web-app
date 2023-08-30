// import React from 'react'
import { useContext, useState } from "react";
import Switch from "react-switch";
import Select from "react-dropdown-select";
import bookIcon from "../assets/images/book-Icon.svg";
import { BsMoon } from "react-icons/bs";
import { darkThemeContext } from "../App";

const Header = ({ setFontValue }) => {
  // dropdown array
  const options = [
    {
      value: "sans-serif",
      label: "Sans Serif",
    },
    {
      value: "serif",
      label: "Serif",
    },
    {
      value: "monospace",
      label: "Mono",
    },
  ];
  // const [valueArray, setValueArray] = useState([]);

  const darkThemeBody = useContext(darkThemeContext);
  // console.log(darkThemeBody);
  // console.log(valueArray);
  return (
    <div className="flex pt-[1.5rem] justify-between w-[90%] lg:w-[50%] md:w-[75%] mx-auto items-center">
      <img src={bookIcon} alt="book icon" />
      <div className="flex items-center divide-x-2 gap-3">
        <div className="flex items-center">
          <Select
            options={options}
            onChange={(value) => {
              value.map((property) => {
                setFontValue(property);
              });
            }}
            placeholder="Select Font"
          />
          {/* <p>Sans Serif</p> */}
          {/* <img src={dropDown} alt="drop down" /> */}
        </div>
        <div className="flex gap-3 items-center pl-3">
          <Switch
            checked={darkThemeBody.darkTheme}
            onColor="#A445ED"
            height={18}
            width={35}
            onChange={() =>
              darkThemeBody.setDarkTheme(!darkThemeBody.darkTheme)
            }
          />
          <BsMoon
            className={`${
              darkThemeBody.darkTheme ? "text-[#A445ED]" : "text-[#757575]"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
