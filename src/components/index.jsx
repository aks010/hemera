import React, { Component } from "react";
import arrayMove from "array-move";
import { connect } from "react-redux";
import { FetchBannerList } from "../actions/index";

import "./index.css";
import Banners from "./Banners";

class BannerListContainer extends Component {
  state = {
    items: [],
  };

  componentDidMount = async () => {
    await this.props.FetchBannerList();
  };
  componentWillReceiveProps = (nP) => {
    console.log(nP.bannerList);
    this.setState({ items: nP.bannerList });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };
  render() {
    return (
      <div>
        <Banners
          items={this.state.items}
          useDragHandle={true}
          lockAxis={"y"}
          onSortEnd={this.onSortEnd}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bannerList: state.bannerList,
  };
};

export default connect(mapStateToProps, { FetchBannerList })(BannerListContainer);
