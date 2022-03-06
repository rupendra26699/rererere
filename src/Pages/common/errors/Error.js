import React from "react";

const Error = ({ type = "tokenExpired" }) => (
  <div className="w-[100%] h-[100vh] flex bg-sidenavBackground items-center justify-center content-center">
    <div className="w-[450px] h-[376px] flex-col flex items-center justify-center">
      <h1 className=" text-left font-bold font-primary text-[100px] leading-[21px] text-errorRed mb-[80px]" >Error</h1>
      <p className="text-left mb-8 font-bold font-primary text-[48px] leading-[21px] text-inputFieldText" >Sorry!</p>
      <span>
        <p className="text-center font-primary font-normal text-lg leading-[28px] text-textlight">
          {(type === "tokenExpired") && ` The link you are trying to access has expired. Please reach out to the
          Super admin to get a fresh link`}

          {(type === "general") && `It appears there has has been a network problems while fetching your request . Please reach out to the Administrator to resolve the issue .`}
        </p>
      </span>
    </div>
  </div>
);

export default Error;
