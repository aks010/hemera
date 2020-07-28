import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import RemoveBanner from "../../removeContainers/RemoveBanner";
import { SelectBanner } from "../../../actions/index";
import { connect } from "react-redux";
import EditBanner from "../../editContainers/EditBanner";

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
        <Link
          to={`/banner/${this.props.id}/${this.props.model.toLowerCase()}`}
          onClick={this.props.handleSelect}
        >
          <FontAwesomeIcon icon={faEye} color={"rgb(34, 34, 34)"} />
        </Link>

        <span style={{ widht: "1rem", margin: "1rem" }} />

        <FontAwesomeIcon
          icon={faPencilAlt}
          color={"rgb(34, 34, 34)"}
          onClick={() => {
            this.props.handleSelect();
            this.handleOpenEditModal();
          }}
        />
        <span style={{ widht: "1rem", margin: "1rem" }} />

        <FontAwesomeIcon
          icon={faTrashAlt}
          color={"rgb(34, 34, 34)"}
          onClick={() => {
            this.props.handleSelect();
            this.handleOpenRemoveModal();
          }}
        />

        <RemoveBanner
          open={this.state.removeModal}
          id={this.props.id}
          handleClose={this.handleCloseRemoveModal}
        />
        <EditBanner
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
  handleSelect = () => {
    // console.log("TOE");
    // console.log(this.props);
    this.props.SelectBanner({
      _id: this.props._id,
      title: this.props.title,
      link: this.props.link,
      model: this.props.model,
      hasCategory: this.props.hasCategory,
    });
  };
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
          handleSelect={this.handleSelect}
        />
      </div>
    );
  }
}

export default connect(null, { SelectBanner })(BannerHeader);
