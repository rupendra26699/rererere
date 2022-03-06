import React, { useState } from "react";

const FileBrowser = (props) => {
  const { id, text ,accept } = props;

  const [selectedfile, setSelectedFile] = useState("");

  const selected = (e) => {
    setSelectedFile(e.target.files[0].name);
  };

  const upload = () => {
    document.getElementById(id).click();
  };

  return (
    
      <div className="mt-3 mr-5">
        <input
          type="file"
          id={id}
          onChange={(e) => {
            selected(e);
          }}
          accept={accept}
          hidden
        />
        <div className="flex w-[100%] justify-between items-center mr-3 h-[36px] bg-white border border-inputFieldBorder rounded-md  font-primary font-normal text-sm">
          <span className="w-[75%] text-neutral-700 px-3 pt-2 pb-2">
            {selectedfile !== "" ? selectedfile : "No File Chosen"}
          </span>
          <label className="w-[25%]  h-[36px] flex justify-center items-center bg-fileuploadButton text-white p-2 rounded" onClick={upload}>
            Choose file
          </label>
        </div>
           <h5 className="text-textlight font-primary font-medium  text-xs leading-5 mt-2">{text}</h5>
      </div>
    
  );
};

export default FileBrowser;
