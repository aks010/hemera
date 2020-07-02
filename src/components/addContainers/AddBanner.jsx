import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";

class AddBanner extends React.Component {
  handleSubmit = () => {
    window.location.href = "/banners";
  };
  render() {
    return (
      <div>
        <Modal
          open={this.props.open}
          closeOnDimmerClick={false}
          onClose={this.props.handleClose}
        >
          <Modal.Header>Add New Banner</Modal.Header>
          <Modal.Content>
            <p>afkasf asjfn fjasfnasf iasnf </p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.props.handleClose}>Close</Button>
            <Button primary onClick={this.props.hanldeSubmit}>
              Submit{" "}
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default connect(null)(AddBanner);
