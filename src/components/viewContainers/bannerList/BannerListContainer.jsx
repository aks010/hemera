import React, { Component } from "react";
import arrayMove from "array-move";
import { connect } from "react-redux";
import { FetchBannerList, UpdatePriority } from "../../../actions/index";
import "./index.css";
import Banners from "./Banners";
import { Switch, Route } from "react-router-dom";
import TestContainer from "../../../containers/TestContainer";
import EditBannerModal from "../../editContainers/EditBanner";
import AddBannerModal from "../../addContainers/AddBanner";

class BannerListContainer extends Component {
  state = {
    items: [],
    addNewBanner: false,
  };
  handleOpenAddModal = () => this.setState({ addNewBanner: true });
  handleCloseAddModal = () => this.setState({ addNewBanner: false });

  componentDidMount = async () => {
    await this.props.FetchBannerList();
  };
  componentWillReceiveProps = (nP) => {
    // console.log(nP.bannerList);
    this.setState({ items: nP.bannerList });
  };

  onSortEnd = async ({ oldIndex, newIndex }) => {
    console.log("RUNNING");
    if (oldIndex !== newIndex) {
      await this.props.UpdatePriority(this.state.items[oldIndex]._id, newIndex);
      // console.log(this.state.items[oldIndex]._id, newIndex);
      this.setState({
        items: arrayMove(this.state.items, oldIndex, newIndex),
      });
    }
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <Switch>
          <Route
            path="/banners/banner/:BID/category/:CID/:model/:id/:task"
            component={TestContainer}
          />
          <Route
            path="/banners/banner/:BID/category/:CID/:model/:id"
            component={TestContainer}
          />
          <Route
            path="/banners/banner/:BID/category/:CID/:model/:task"
            component={TestContainer}
          />
          <Route
            path="/banners/banner/:BID/category/:CID/:model/"
            component={TestContainer}
          />
          <Route
            path="/banners/banner/:BID/category/:CID/:task"
            component={TestContainer}
          />
          <Route
            path="/banners/banner/:BID/category/:CID/"
            component={TestContainer}
          />
          <Route
            path="/banners/banner/:BID/:model/:id/:task"
            component={TestContainer}
          />
          <Route
            path="/banners/banner/:BID/:model/:id"
            component={TestContainer}
          />
          <Route
            path="/banners/banner/:BID/:model/:task"
            component={TestContainer}
          />
          <Route path="/banners/banner/:BID/:model" component={TestContainer} />
          <Route
            path="/"
            render={(props) => {
              return (
                <div>
                  <Banners
                    items={this.state.items}
                    useDragHandle={true}
                    lockAxis={"y"}
                    onSortEnd={this.onSortEnd}
                  />
                  <div
                    className={"banner-add-section"}
                    onClick={this.handleOpenAddModal}
                  >
                    Add New Banner
                  </div>
                  <AddBannerModal
                    open={this.state.addNewBanner}
                    handleClose={this.handleCloseAddModal}
                  />
                  <Route
                    path="/banners/:id/edit/"
                    component={EditBannerModal}
                  />
                </div>
              );
            }}
          ></Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bannerList: state.bannerList,
  };
};

export default connect(mapStateToProps, { FetchBannerList, UpdatePriority })(
  BannerListContainer
);
