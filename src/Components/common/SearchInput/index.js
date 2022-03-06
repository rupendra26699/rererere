import React from "react";

const SearchInput = (props) => {
  const { placeholder } = props;
  return (
    <div className="relative">
      <input
        type="text"
        className="bg-white border border-black w-[190px] h-[36px] rounded-[22px] mr-5 py-2 pl-[20%] "
        placeholder={placeholder}
        onClick={() => props.onClick()}
      />
      <button className="bg-searchButton bg-no-repeat bg-contain w-[24px] h-[20px] absolute top-[10px] left-4" />
    </div>
  );
};

export default SearchInput;
