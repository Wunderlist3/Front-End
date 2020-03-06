import React from "react";
import { Link } from "react-router-dom";

const Item = props => {
  return (
    <div>
      <Link to={`/my/list/:${props.list.id}`}>
        <p className="item">{props.list.title}</p>
      </Link>
    </div>
  );
};

export default Item;
