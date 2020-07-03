import React, { Component } from "react";
import arrayMove from "array-move";
import { connect } from "react-redux";
import {
  FetchCategoryList,
  UpdateCategoryPriority,
} from "../../../actions/index";
import "./index.css";
import CategorySortContainer from "./CategorySortContainer";
import { Switch, Route } from "react-router-dom";
import TestContainer from "../../../containers/TestContainer";
import EditBannerModal from "../../editContainers/EditBanner";
import ModelContainer from "../model/ModelRouter";
import AddBannerModal from "../../addContainers/AddBanner";
import { Header, List } from "semantic-ui-react";
import { Link } from "react-router-dom";

class CategoryRouter extends Component {
  state = {
    items: [],
    addNewBanner: false,
    banner: "Banner",
  };
  handleOpenAddModal = () => this.setState({ addNewBanner: true });
  handleCloseAddModal = () => this.setState({ addNewBanner: false });

  componentWillMount = async () => {
    console.log("ENETER");
    console.log(this.props.match.params);
    if (!this.props.selectedBanner) {
      // fetch banner details /:BID
    }
    await this.props.FetchCategoryList(this.props.match.params.BID);
  };
  componentWillReceiveProps = (nP) => {
    // console.log(nP.bannerList);
    this.setState({ items: nP.categoryList });
  };

  onSortEnd = async ({ oldIndex, newIndex }) => {
    console.log("CATEGORIES");
    if (oldIndex !== newIndex) {
      await this.props.UpdateCategoryPriority(
        this.props.match.params.BID,
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
    // console.log(this.props);
    console.log("HELLEELLELELOOLLEO");
    console.log(this.props);
    return (
      <div>
        <Switch>
          <Route
            path="/banners/banner/:BID/category/:CID/:model/"
            component={ModelContainer}
          />
          <Route
            path="/banners/banner/:BID/category/:CID/"
            component={TestContainer}
          />
          <Route
            path="/banners/banner/:BID/Category"
            render={(props) => {
              return (
                <div className={"content-container"}>
                  <Header as="h3" dividing>
                    {this.props.selectedBanner.title}
                  </Header>
                  <List bulleted horizontal link>
                    <List.Item as="a">
                      <Link to="/banners">Banners</Link>
                    </List.Item>
                    <List.Item as="a">
                      {" "}
                      {this.props.selectedBanner.title}
                    </List.Item>
                  </List>
                  <div
                    className={"banner-add-section"}
                    onClick={this.handleOpenAddModal}
                  >
                    Add New Category
                  </div>
                  <CategorySortContainer
                    {...props}
                    items={this.state.items}
                    useDragHandle={true}
                    lockAxis={"y"}
                    onSortEnd={this.onSortEnd}
                  />

                  <AddBannerModal
                    open={this.state.addNewBanner}
                    handleClose={this.handleCloseAddModal}
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
    categoryList: state.categoryList,
    selectedBanner: state.selected.banner,
  };
};

export default connect(mapStateToProps, {
  FetchCategoryList,
  UpdateCategoryPriority,
})(CategoryRouter);
