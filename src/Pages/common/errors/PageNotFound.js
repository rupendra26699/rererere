import React from "react";

const PageNotFound = () => (
  <div className="w-[100%] h-[100vh] flex bg-sidenavBackground items-center justify-center content-center">
    <div className="w-[450px] h-[376px] flex-col flex items-center justify-center">
      <h1 className="mb-[90px] text-center font-primary font-bold text-[100px] leading-[21px] text-primary">404</h1>
      <p className="text-left mb-[38px] font-primary font-bold text-[48px] leading-[21px] text-inputFieldText" >Page Not Found</p>
      <span>
        <p className="text-center font-primary font-normal text-lg leading-[28px] text-textlight">
          The page you are looking for might have been removed Had its name
          changed or is temporarily unavailable
        </p>
      </span>
      <button className="back-btn">Back</button>
    </div>
  </div>
)

export default PageNotFound;
