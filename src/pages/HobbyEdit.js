import React from "react";

const HobbyEdit = ({ hobby, onDelete }) => {
  return (
    <>
    
      <span className="interset">
        {hobby} <i class="fas fa-times" onClick={onDelete}></i>
      </span>
    </>
  );
};

export default HobbyEdit;
