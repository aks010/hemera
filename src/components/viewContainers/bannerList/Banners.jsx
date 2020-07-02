import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import BannerContainer from "./BannerContainer.jsx";

import "./index.css";

const Banners = SortableContainer(({ items }) => {
  return (
    <div>
      {items.map((value, index) => (
        <BannerContainer key={`item-${index}`} index={index} value={value} />
      ))}
    </div>
  );
});

export default Banners;
