import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";

import BannerHeader from "./CategoryHeader";

const DragHandle = SortableHandle((props) => (
  <div className={"dragHolder"} onMouseDown={props.handleMouseDown}>
    <FontAwesomeIcon icon={faGripVertical} />
  </div>
));

class BannerRouter extends React.Component {
  state = {
    style: "banner",
  };

  handleMouseOver = () => {
    this.setState({ style: "banner bannerOver" });
  };
  handleMouseDown = () => {
    this.setState({ style: "banner bannerDown" });
  };
  handleMouseOut = () => {
    this.setState({ style: "banner" });
  };
  render() {
    // console.log(":lOL")
    // console.log(this.props);
    return (
      <div
        className={this.state.style}
        onMouseOver={this.handleMouseOver}
        onMouseDown={this.handleMouseDown}
        onMouseOut={this.handleMouseOut}
      >
        <DragHandle onMouseDown={this.handleMouseDown} />
        {
          // Banner Toolbar
        }
        <div className={"bannerModel"}>
          <BannerHeader {...this.props.banner} {...this.props} />
        </div>
        {
          // Select Model for Banner Child
        }
      </div>
    );
  }
}
export default BannerRouter;
