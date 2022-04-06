import React from "react";
import header_image from "../../assets/header_image.jpg";
import cutt_logo from "../../assets/CUTT_LOGO.png";
import Leo from "../../assets/leo.jpg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="relative h-32 m-8 overflow-hidden bg-white-50 rounded-lg">
      <div className="absolute z-30 flex w-full h-full">
        <div className="relative z-30 w-5/6 px-6 py-8 text-white md:py-10 md:w-1/2">
          <Link to="/">
            <img
              alt="Backoffice header"
              className="object-cover h-6"
              src={cutt_logo}
            />
          </Link>
          <span></span>
        </div>
        <div className="absolute top-0 right-0 flex w-full h-full">
          <div className="w-1/3 h-full bg-white-50"></div>
          <div className="relative w-1/3">
            <svg
              fill="currentColor"
              viewBox="0 0 100 100"
              className="absolute inset-y-0 z-20 h-full text-white-50"
            >
              <polygon id="diagonal" points="0,0 100,0 50,100 0,100"></polygon>
            </svg>
            <svg
              fill="currentColor"
              viewBox="0 0 100 100"
              className="absolute inset-y-0 z-10 h-full ml-6 text-white opacity-50"
            >
              <polygon points="0,0 100,0 50,100 0,100"></polygon>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 block w-9/12 h-full">
        <img
          alt="Backoffice header"
          className="object-cover h-full min-w-full"
          src={header_image}
        />
      </div>
      <div className="absolute top-1 right-2 z-50">
        <img
          className="w-16 h-16 rounded-full"
          src={Leo}
          alt="Rounded avatar"
        />
      </div>
    </div>
  );
};

export default Header;