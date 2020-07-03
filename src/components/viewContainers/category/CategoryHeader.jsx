import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import RemoveCategory from "../../removeContainers/RemoveBanner";
import EditCategory from "../../editContainers/EditCategory";
import { SelectCategory } from "../../../actions/index";

class BannerToolBar extends React.Component {
  state = { removeModal: false, editModal: false };
  handleCloseRemoveModal = () => this.setState({ removeModal: false });
  handleOpenRemoveModal = () => this.setState({ removeModal: true });
  handleCloseEditModal = () => this.setState({ editModal: false });
  handleOpenEditModal = () => this.setState({ editModal: true });
  render() {
    console.log(this.state);
    return (
      <div className={"banner-toolbar"}>
        <Link to={`${this.props.url}/${this.props.id}/${this.props.model}`}>
          <FontAwesomeIcon icon={faEye} color={"rgb(34, 34, 34)"} />
        </Link>
        <span style={{ widht: "1rem", margin: "1rem" }} />
        <FontAwesomeIcon
          icon={faPencilAlt}
          color={"rgb(34, 34, 34)"}
          onClick={this.handleOpenEditModal}
        />
        <span style={{ widht: "1rem", margin: "1rem" }} />
        {/* <Link to={`/banners/${this.props.id}/edit`}> */}
        <FontAwesomeIcon
          icon={faTrashAlt}
          color={"rgb(34, 34, 34)"}
          onClick={this.handleOpenRemoveModal}
        />
        <RemoveCategory
          open={this.state.removeModal}
          id={this.props.id}
          handleClose={this.handleCloseRemoveModal}
        />
        <EditCategory
          open={this.state.editModal}
          id={this.props.id}
          handleClose={this.handleCloseEditModal}
        />
        {/* </Link> */}
      </div>
    );
  }
}

class CategoryHeader extends React.Component {
  handleSelect = () => {
    console.log("TOE");
    console.log(this.props);
    this.props.SelectCategory({
      id: this.props._id,
      title: this.props.title,
      link: this.props.link,
      model: this.props.model,
      hasCategory: this.props.hasCategory,
    });
  };
  render() {
    console.log(this.props);
    return (
      <div className={"banner-header"} onClick={this.handleSelect}>
        <div className={"banner-title"}>{this.props.title}</div>
        <BannerToolBar
          id={this.props._id}
          title={this.props.title}
          link={this.props.link}
          model={this.props.childModel}
          url={this.props.match.url}
        />
      </div>
    );
  }
}

export default connect(null, { SelectCategory })(CategoryHeader);
