import React from "react";
import { SortableElement } from "react-sortable-hoc";
import BannerRouter from "./Category";

const BannerContainer = SortableElement((props) => {
  // console.log("HERE")
  // console.log(props)
  return (
    <BannerRouter
      banner={props.value}
      key={props.key}
      index={props.index}
      {...props}
    />
  );
});
export default BannerContainer;
