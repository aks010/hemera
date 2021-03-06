import React, { Component } from "react";
import arrayMove from "array-move";
import { connect } from "react-redux";
import {
  FetchBannerList,
  UpdateBannerPriority,
  FetchUserDetails,
} from "../../../actions/index";
import "./index.css";
import Banners from "./Banners";
import { Switch, Route } from "react-router-dom";
import TestContainer from "../../../containers/TestContainer";
import EditBannerModal from "../../editContainers/EditBanner";
import AddBannerModal from "../../addContainers/AddBanner";
import { Header, List } from "semantic-ui-react";
import CategoryRouter from "../category/CategoryRouter";
import ModelRouter from "../model/ModelRouter";
import Profile from "../../Profile";

class BannerListContainer extends Component {
  state = {
    items: [],
    addNewBanner: false,
  };
  handleOpenAddModal = () => this.setState({ addNewBanner: true });
  handleCloseAddModal = () => this.setState({ addNewBanner: false });

  componentDidMount = async () => {
    await this.props.FetchUserDetails();
    await this.props.FetchBannerList();
  };
  componentWillReceiveProps = (nP) => {
    // console.log(nP.bannerList);
    this.setState({ items: nP.bannerList });
  };

  onSortEnd = async ({ oldIndex, newIndex }) => {
    console.log("RUNNING");
    if (oldIndex !== newIndex) {
      await this.props.UpdateBannerPriority(
        this.state.items[oldIndex]._id,
        newIndex
      );
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
          <Route path="/profile" component={Profile} />
          <Route path="/banner/:BID/category" component={CategoryRouter} />
          <Route path="/banner/:BID/:model" component={ModelRouter} /> */}
          <Route
            path="/"
            render={(props) => {
              return (
                <div className={"content-container"}>
                  <Header as="h3" dividing>
                    Banners
                  </Header>
                  <List bulleted horizontal link>
                    <List.Item as="a">Banners</List.Item>
                  </List>
                  <div
                    className={"banner-add-section"}
                    onClick={this.handleOpenAddModal}
                  >
                    Add New Banner
                  </div>
                  <Banners
                    items={this.state.items}
                    useDragHandle={true}
                    lockAxis={"y"}
                    onSortEnd={this.onSortEnd}
                  />

                  <AddBannerModal
                    open={this.state.addNewBanner}
                    handleClose={this.handleCloseAddModal}
                  />
                  <Route path="/:id/edit/" component={EditBannerModal} />
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

export default connect(mapStateToProps, {
  FetchUserDetails,
  FetchBannerList,
  UpdateBannerPriority,
})(BannerListContainer);
