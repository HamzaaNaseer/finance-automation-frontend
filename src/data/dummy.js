import React from "react";

import {
  FiShoppingBag,
  
  FiPieChart,
  FiBarChart,
  
} from "react-icons/fi";
import {
  
  BsBoxSeam,
 
} from "react-icons/bs";

import { HiUserGroup } from "react-icons/hi";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";


import { GiEntryDoor } from "react-icons/gi";




export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "dashboard",
        icon: <FiShoppingBag />,
        allowedRoles: ["DONER", "DONEE"],
      },
    ],
  },

  {
    title: "Pages",
    links: [
      // {
      //   name: "suggestions",
      //   icon: <HiUserGroup />,
      // },
      // {
      //   name: "announcements",
      //   icon: <TbSpeakerphone />,
      // },
      // {
      //   name: "complaints",
      //   icon: <VscFeedback />,
      // },
      // {
      //   name: "residents",
      //   icon: <FaHouseUser />,
      // },
      // {
      //   name: "passes",
      //   icon: <GiEntryDoor />,
      // },
      // {
      //   name: "advertisment",
      //   icon: <FcAdvertising />,
      // },
      // {
      //   name: "Newadvertisment",
      //   icon: <FcAdvertising />,
      // },
      
      {
        name: "Financial-Management",
        icon: <HiUserGroup />,
        allowedRoles: ["DONER", "DONEE"],
      },
      {
        name: "Project-Management",
        icon: <GiEntryDoor />,
        allowedRoles: ["DONEE"],
      },
      {
        name: "Docs",
        icon: <HiUserGroup />,
        allowedRoles: ["DONEE", "DONER"],
      },
      {
        name: "Queries",
        icon: <HiUserGroup />,
        allowedRoles: ["DONEE", "DONER"],
      },
    ],
  },
  {
    title: "Analysis",
    links: [
      {
        name: "Modules-Progress",
        icon: <FiPieChart />,
        allowedRoles: ["DONEE", "DONER"],
      },
      {
        name: "Modules-Finances",
        icon: <FiPieChart />,
        allowedRoles: ["DONEE", "DONER"],
      },

      // {
      //   name: "Block-Wise-Complaints",
      //   icon: <GiLouvrePyramid />,
      // },

      // {
      //   name: "users-count",
      //   icon: <FiPieChart />,
      // },
    ],
  },
  {
    title: "Settings",
    links: [
      {
        name: "login",
        icon: <FiShoppingBag />,
      },
    ],
  },
];





export const earningData = [
  {
    icon: <MdOutlineSupervisorAccount />,
    amount: "39,354",
    percentage: "-4%",
    title: "Customers",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "text-red-600",
  },
  {
    icon: <BsBoxSeam />,
    amount: "4,396",
    percentage: "+23%",
    title: "Products",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
    pcColor: "text-green-600",
  },
  {
    icon: <FiBarChart />,
    amount: "423,39",
    percentage: "+38%",
    title: "Sales",
    iconColor: "rgb(228, 106, 118)",
    iconBg: "rgb(255, 244, 229)",

    pcColor: "text-green-600",
  },
  {
    icon: <HiOutlineRefresh />,
    amount: "39,354",
    percentage: "-12%",
    title: "Refunds",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "text-red-600",
  },
];



export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];


