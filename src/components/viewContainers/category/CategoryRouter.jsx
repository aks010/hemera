import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from "react-router-dom";

import { Header, List } from "semantic-ui-react";
import arrayMove from "array-move";

import CategorySortContainer from "./CategorySortContainer";
import TestContainer from "../../../containers/TestContainer";
import ModelContainer from "../model/ModelRouter";
import AddCategoryModal from "../../addContainers/AddCategory";
import "./index.css";

import {
  FetchCategoryList,
  UpdateCategoryPriority,
  GetBannerDetails,
} from "../../../actions/index";

class CategoryRouter extends Component {
  state = {
    items: [],
    addNewCategory: false,
  };
  handleOpenAddModal = () => this.setState({ addNewCategory: true });
  handleCloseAddModal = () => this.setState({ addNewCategory: false });

  componentWillMount = async () => {
    console.log("ENETER");
    console.log(this.props.match.params);
    if (Object.keys(this.props.banner).length === 0) {
      await this.props.GetBannerDetails(this.props.match.params.BID);
    }
    await this.props.FetchCategoryList(this.props.match.params.BID);
  };
  componentWillReceiveProps = (nP) => {
    this.setState({ items: nP.categoryList });
  };

  onSortEnd = async ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      await this.props.UpdateCategoryPriority(
        this.props.match.params.BID,
        this.state.items[oldIndex]._id,
        newIndex
      );
      this.setState({
        items: arrayMove(this.state.items, oldIndex, newIndex),
      });
    }
  };
  render() {
    const banner = this.props.banner;
    return (
      <div>
        <Switch>
          <Route
            path="/banner/:BID/category/:CID/:model/"
            component={ModelContainer}
          />
          <Route path="/banner/:BID/category/:CID/" component={TestContainer} />
          <Route
            path="/banner/:BID/Category"
            render={(props) => {
              return (
                <div className={"content-container"}>
                  <Header as="h3" dividing>
                    {banner.title}
                  </Header>
                  <List bulleted horizontal link>
                    <List.Item as="a">
                      <Link to="/">Banners</Link>
                    </List.Item>
                    <List.Item as="a"> {banner.title}</List.Item>
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

                  <AddCategoryModal
                    open={this.state.addNewCategory}
                    handleClose={this.handleCloseAddModal}
                    EID={this.props.banner._id}
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
    banner: state.selected.banner,
  };
};

export default connect(mapStateToProps, {
  FetchCategoryList,
  UpdateCategoryPriority,
  GetBannerDetails,
})(CategoryRouter);
