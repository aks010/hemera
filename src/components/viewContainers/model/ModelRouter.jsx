import React, { Component } from "react";
import arrayMove from "array-move";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  FetchItemList,
  UpdateModelPriority,
  GetBannerDetails,
  GetCategoryDetails,
} from "../../../actions/index";
import "./index.css";
import Banners from "./ModelSortContainer";
import { Switch, Route } from "react-router-dom";
import TestContainer from "../../../containers/TestContainer";
import EditBannerModal from "../../editContainers/EditBanner";
import AddBannerModal from "../../addContainers/AddBanner";
import { Header, List } from "semantic-ui-react";

class ModelListContainer extends Component {
  state = {
    items: [],
    addNewItem: false,
  };
  handleOpenAddModal = () => this.setState({ addNewItem: true });
  handleCloseAddModal = () => this.setState({ addNewItem: false });

  componentWillMount = async () => {
    if (this.props.location.pathname.includes("category"))
      if (Object.keys(this.props.selectedCategory).length === 0) {
        await this.props.GetCategoryDetails(this.props.match.params.CID);
      }
    if (Object.keys(this.props.selectedBanner).length === 0) {
      await this.props.GetBannerDetails(this.props.match.params.BID);
    }
    console.log(this.props.match.params.model.toLowerCase());
    if (this.props.location.pathname.includes("category")) {
      await this.props.FetchItemList(
        this.props.match.params.CID,
        this.props.match.params.model.toLowerCase()
      );
    } else {
      await this.props.FetchItemsList(
        this.props.match.params.BID,
        this.props.match.params.model.toLowerCase()
      );
    }
  };
  componentWillReceiveProps = (nP) => {
    this.setState({ items: nP.modelList });
  };

  onSortEnd = async ({ oldIndex, newIndex, o }) => {
    console.log("RUNNING");
    if (oldIndex !== newIndex) {
      if (!Array.isArray(this.state.items)) {
        if (this.props.location.pathname.includes("category")) {
          await this.props.UpdateModelPriority(
            this.props.match.params.CID,
            this.state.items[o][oldIndex]._id,
            newIndex,
            this.props.match.params.model.toLowerCase(),
            o
          );
          const newItems = this.state.items;
          newItems[o] = arrayMove(this.state.items[o], oldIndex, newIndex);
          this.setState({
            items: newItems,
          });
        } else {
          await this.props.UpdateModelPriority(
            this.props.match.params.BID,
            this.state.items[o][oldIndex]._id,
            newIndex,
            this.props.match.params.model.toLowerCase(),
            o
          );
          const newItems = this.state.items;
          newItems[o] = arrayMove(this.state.items[o], oldIndex, newIndex);
          this.setState({
            items: newItems,
          });
        }
      } else {
        if (this.props.location.pathname.includes("category")) {
          await this.props.UpdateModelPriority(
            this.props.match.params.CID,
            this.state.items[oldIndex]._id,
            newIndex,
            this.props.match.params.model.toLowerCase()
          );
          this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
          });
        } else {
          await this.props.UpdateModelPriority(
            this.props.match.params.BID,
            this.state.items[oldIndex]._id,
            newIndex,
            this.props.match.params.model.toLowerCase()
          );
          this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
          });
        }
      }
    }
  };
  render() {
    console.log(this.props);
    return (
      <div className={"content-container"}>
        <Header as="h3" dividing>
          {this.props.location.pathname.includes("category") ? (
            <React.Fragment>{this.props.selectedBanner.title}</React.Fragment>
          ) : (
            <React.Fragment>{this.props.selectedCategory.title}</React.Fragment>
          )}
        </Header>
        <List bulleted horizontal link>
          <List.Item as="a">
            <Link to="/banners">Banners</Link>
          </List.Item>
          <List.Item as="a"> {this.props.selectedBanner.title}</List.Item>
          {this.props.location.pathname.includes("category") && (
            <List.Item as="a"> {this.props.selectedCategory.title}</List.Item>
          )}
        </List>
        <div className={"banner-add-section"} onClick={this.handleOpenAddModal}>
          Add New Item
        </div>
        {Array.isArray(this.state.items) ? (
          <Banners
            {...this.props}
            items={this.state.items}
            useDragHandle={true}
            lockAxis={"y"}
            onSortEnd={this.onSortEnd}
          />
        ) : (
          <div>
            {Object.keys(this.state.items).map((o) => {
              return (
                <React.Fragment>
                  <Header as="h5" block>
                    {o}
                  </Header>
                  <Banners
                    {...this.props}
                    items={this.state.items[o]}
                    useDragHandle={true}
                    lockAxis={"y"}
                    onSortEnd={({ oldIndex, newIndex }) =>
                      this.onSortEnd({ oldIndex, newIndex, o })
                    }
                  />{" "}
                </React.Fragment>
              );
            })}
          </div>
        )}

        <AddBannerModal
          open={this.state.addNewItem}
          handleClose={this.handleCloseAddModal}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modelList: state.modelList,
    selectedCategory: state.selected.category,
    selectedBanner: state.selected.banner,
  };
};

export default connect(mapStateToProps, {
  FetchItemList,
  UpdateModelPriority,
  GetCategoryDetails,
  GetBannerDetails,
})(ModelListContainer);
