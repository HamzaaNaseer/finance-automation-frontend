import React from "react";
import { Link } from "react-router-dom";

export const BtnCell = (props) => {
  console.log("data",props.data)
  const btnClickedHandler = () => {
    props.clicked(props.data._id);
  };  

  return (
    <>
    <div className="main" style={{display:"flex" , gap:"10px"}}>
    <button
      style={{ background: "rgb(3, 192, 215)", padding: "0.5rem", borderRadius: "5px" }}
      onClick={btnClickedHandler}
    >
      Approve
    </button>

     <Link
     to="/viewdetails"
     state={{ from: props.data }}
     style={{ background: "#ff1b1bde", padding: "0.5rem", borderRadius: "5px" }}
   >
     View Details
   </Link>
   </div>
   </>
  );
};

export default BtnCell;
