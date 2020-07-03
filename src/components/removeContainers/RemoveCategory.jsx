import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";

class RemoveCategory extends React.Component {
  handleSubmit = () => {
    // Remove Action
    window.location.href = "/banners";
  };
  render() {
    // console.log("IMODAL");
    // console.log(this.props);
    // console.log("CLICKS");
    return (
      <div>
        <Modal
          open={this.props.open}
          closeOnEscape={false}
          closeOnDimmerClick={false}
          onClose={this.props.handleClose}
        >
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.props.handleClose} negative>
              Yes
            </Button>
            <Button onClick={this.props.handleClose} positive>
              No
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default connect(null)(RemoveCategory);
