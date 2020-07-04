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

class BannerToolBar extends React.Component {
  state = { removeModal: false };
  handleCloseRemoveModal = () => this.setState({ removeModal: false });
  handleOpenRemoveModal = () => this.setState({ removeModal: true });
  render() {
    console.log(this.state);
    return (
      <div className={"banner-toolbar"}>
        <Link
          // onClick={() => this.props.selectBanner}
          to={`/banners/banner/${
            this.props.id
          }/${this.props.model.toLowerCase()}`}
        >
          <FontAwesomeIcon icon={faEye} color={"rgb(34, 34, 34)"} />
        </Link>
        <span style={{ widht: "1rem", margin: "1rem" }} />
        <Link to={`/banners/${this.props.id}/edit`}>
          <FontAwesomeIcon icon={faPencilAlt} color={"rgb(34, 34, 34)"} />
        </Link>
        <span style={{ widht: "1rem", margin: "1rem" }} />
        {/* <Link to={`/banners/${this.props.id}/edit`}> */}
        <FontAwesomeIcon
          icon={faTrashAlt}
          color={"rgb(34, 34, 34)"}
          onClick={this.handleOpenRemoveModal}
        />
        <RemoveBanner
          open={this.state.removeModal}
          id={this.props.id}
          handleClose={this.handleCloseRemoveModal}
        />
        {/* </Link> */}
      </div>
    );
  }
}

class BannerHeader extends React.Component {
  handleSelect = () => {
    console.log("TOE");
    console.log(this.props);
    this.props.SelectBanner({
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
          model={this.props.model}
        />
      </div>
    );
  }
}

export default connect(null, { SelectBanner })(BannerHeader);