import React, { useEffect } from "react";
//icons import
import { AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";

//esfusion imports
import { TooltipComponent } from "@syncfusion/ej2-react-popups";



//context
import { useStateContext } from "../contexts/ContextProvider";

import { useNavigate } from "react-router-dom";


const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="buttom"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    setActiveMenu,
    screenSize,
    setScreenSize,
    currentColor,
  } = useStateContext();
  const isAuthenticated = localStorage.getItem("access-token-fyp") ? true : false
  const user = JSON.parse(localStorage.getItem("user-data"))
  let navigate = useNavigate()


  useEffect(() => {
    //getting the size of the screen at the start
    const handleResize = () => setScreenSize(window.innerWidth);
    // adding event listener to track changes in the screen size
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) setActiveMenu(false);
    else setActiveMenu(true);
  }, [screenSize]);



  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 w-[100%]">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prev) => !prev)}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        {isAuthenticated && (
          <NavButton
            title="Logout"
            customFunc={() => {
              {
                localStorage.removeItem("access-token-fyp")
                localStorage.removeItem("user-data")
                navigate('/login')

              }
            }}
            color={currentColor}
            icon={<AiOutlineLogout />}
          />
        )}

        {isAuthenticated && (
          <TooltipComponent content="Profile" position="BottomCenter">
            <div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded lg mt-1"
              onClick={() => { }}
            >
              <img
                src={require("../data/profile.png")}
                alt="avatar"
                className="rounded-full  w-8 h-8"
              />
              <p>
                <span className="text-gray-400 text-14">Hi,</span>{" "}
                <span className="text-gray-400 font-bold ml-1 text-14">
                  {user.name}
                </span>
              </p>
            </div>
          </TooltipComponent>
        )}
      </div>
    </div>
  );
};

export default Navbar;
