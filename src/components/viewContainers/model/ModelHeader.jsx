import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { FetchSelectedItem } from "../../../actions";
import EditModel from "../../editContainers/EditModel";
import RemoveModel from "../../removeContainers/RemoveModel";

class BannerToolBar extends React.Component {
  state = { removeModal: false, editModal: false };
  handleCloseRemoveModal = () => this.setState({ removeModal: false });
  handleOpenRemoveModal = () => this.setState({ removeModal: true });
  handleCloseEditModal = () => this.setState({ editModal: false });
  handleOpenEditModal = () => this.setState({ editModal: true });
  render() {
    // console.log(this.state);
    return (
      <div className={"banner-toolbar"}>
        {/* <FontAwesomeIcon icon={faEye} color={"rgb(34, 34, 34)"} /> */}
        {/* <span style={{ widht: "1rem", margin: "1rem" }} /> */}

        <FontAwesomeIcon
          icon={faPencilAlt}
          color={"rgb(34, 34, 34)"}
          onClick={this.handleOpenEditModal}
        />
        <span style={{ widht: "1rem", margin: "1rem" }} />

        <FontAwesomeIcon
          icon={faTrashAlt}
          color={"rgb(34, 34, 34)"}
          onClick={this.handleOpenRemoveModal}
        />

        <RemoveModel
          open={this.state.removeModal}
          id={this.props.id}
          handleClose={this.handleCloseRemoveModal}
          params={this.props.params}
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
  handleSelect = async () => {
    const { BID, CID, model } = this.props.match.params;
    await this.props.FetchSelectedItem(this.props._id, CID ? CID : BID, model);
  };
  render() {
    // console.log(this.props);
    return (
      <div className={"banner-header"} onClick={this.handleSelect}>
        <div className={"banner-title"}>{this.props.title}</div>
        <BannerToolBar
          id={this.props._id}
          title={this.props.title}
          params={this.props.match.params}
        />
      </div>
    );
  }
}

export default connect(null, { FetchSelectedItem })(BannerHeader);
