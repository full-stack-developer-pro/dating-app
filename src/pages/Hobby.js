import React from "react";

const Hobby = ({ hobby, onDelete }) => {
  return (
    <>
    
      <span className="interset">
        {hobby} <i class="fas fa-times" onClick={onDelete}></i>
      </span>
    </>
  );
};

export default Hobby;
