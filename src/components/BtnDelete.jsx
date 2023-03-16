import React from "react";

const BtnDelete = (props) => {

  const btnHandler = () => {
    console.log("HHHHHHHHHHHHHH");
    props.clicked(props.data._id)
  };
  return (
    <div>
      <button
        style={{ background: "#ff1b1bde", padding: "0.5rem", borderRadius: "5px" }}
        onClick={btnHandler}
      >
        Delete
      </button>
    </div>
  );
};

export default BtnDelete;
