import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Header, List } from "semantic-ui-react";
import arrayMove from "array-move";

import {
  FetchItemList,
  UpdateModelPriority,
  GetBannerDetails,
  GetCategoryDetails,
  FetchModelSpecs,
} from "../../../actions/index";
import "./index.css";
import Banners from "./ModelSortContainer";
import AddModelItem from "../../addContainers/AddModel";

class ModelListContainer extends Component {
  state = {
    items: [],
    selected: {
      banner: {},
      category: {},
    },
    specs: {},
    isCategory: false,
    addNewItem: false,
  };
  handleOpenAddModal = () => this.setState({ addNewItem: true });
  handleCloseAddModal = () => this.setState({ addNewItem: false });

  componentDidMount = async () => {
    const { banner, category } = this.props.selected;
    const { CID, BID, model } = this.props.match.params;
    const isCategory = this.props.location.pathname
      .toLowerCase()
      .includes("category");

    if (isCategory && Object.keys(category).length === 0)
      await this.props.GetCategoryDetails(CID);

    if (Object.keys(banner).length === 0) {
      await this.props.GetBannerDetails(BID);
    }

    if (isCategory) {
      await this.props.FetchItemList(CID, model.toLowerCase());
      await this.props.FetchModelSpecs(CID, model.toLowerCase());
    } else {
      await this.props.FetchItemList(BID, model.toLowerCase());
      await this.props.FetchModelSpecs(BID, model.toLowerCase());
    }
    this.setState({ isCategory });
  };

  UNSAFE_componentWillReceiveProps = (nP) => {
    this.setState({
      items: nP.modelList,
      selected: nP.selected,
      specs: nP.specs,
    });
  };

  onSortEnd = async ({ oldIndex, newIndex, o }) => {
    const { CID, BID, model } = this.props.match.params;
    const { isCategory } = this.state;

    if (oldIndex !== newIndex) {
      if (!Array.isArray(this.state.items)) {
        if (isCategory) {
          await this.props.UpdateModelPriority(
            CID,
            this.state.items[o][oldIndex]._id,
            newIndex,
            model.toLowerCase(),
            o
          );
          const newItems = this.state.items;
          newItems[o] = arrayMove(this.state.items[o], oldIndex, newIndex);
          this.setState({
            items: newItems,
          });
        } else {
          await this.props.UpdateModelPriority(
            BID,
            this.state.items[o][oldIndex]._id,
            newIndex,
            model.toLowerCase(),
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
            CID,
            this.state.items[oldIndex]._id,
            newIndex,
            model.toLowerCase()
          );
          this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
          });
        } else {
          await this.props.UpdateModelPriority(
            BID,
            this.state.items[oldIndex]._id,
            newIndex,
            model.toLowerCase()
          );
          this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
          });
        }
      }
    }
  };

  render() {
    const { banner, category } = this.props.selected;
    const { CID, BID, model } = this.props.match.params;
    const { isCategory } = this.state;

    return (
      <div className={"content-container"}>
        <Header as="h3" dividing>
          {isCategory ? (
            <React.Fragment>{category.title}</React.Fragment>
          ) : (
            <React.Fragment>{banner.title}</React.Fragment>
          )}
        </Header>

        <List bulleted horizontal link>
          <List.Item as="a">
            <Link to="/">Banners</Link>
          </List.Item>
          <List.Item as="a">
            <Link to={`/banner/${BID}/${banner.model}`}>{banner.title}</Link>
          </List.Item>
          {isCategory && <List.Item as="a">{category.title}</List.Item>}
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

        <AddModelItem
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
    selected: state.selected,
    specs: state.specification,
  };
};

export default connect(mapStateToProps, {
  FetchItemList,
  UpdateModelPriority,
  GetCategoryDetails,
  GetBannerDetails,
  FetchModelSpecs,
})(ModelListContainer);
