import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import BannerContainer from "./CategorySortElement.jsx";

import "./index.css";

const Banners = SortableContainer((props) => {
  return (
    <div>
      {props.items.map((value, index) => (
        <BannerContainer
          key={`item-${index}`}
          index={index}
          value={value}
          {...props}
        />
      ))}
    </div>
  );
});

export default Banners;
