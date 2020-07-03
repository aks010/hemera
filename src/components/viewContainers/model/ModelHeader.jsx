import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import EditModel from "../../editContainers/EditModel";
import RemoveModel from "../../removeContainers/RemoveModel";

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
        <RemoveModel
          open={this.state.removeModal}
          id={this.props.id}
          handleClose={this.handleCloseRemoveModal}
        />
        <EditModel
          open={this.state.editModal}
          id={this.props.id}
          handleClose={this.handleCloseEditModal}
        />
        {/* </Link> */}
      </div>
    );
  }
}

class BannerHeader extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className={"banner-header"}>
        <div className={"banner-title"}>{this.props.title}</div>
        <BannerToolBar
          id={this.props._id}
          title={this.props.title}
          link={this.props.link}
          model={this.props.model}
        />
      </div>
    );
  }
}

export default BannerHeader;
