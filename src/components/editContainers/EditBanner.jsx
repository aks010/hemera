import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";

class editBanner extends React.Component {
  handleClose = () => {
    return this.props.history.goBack();
  };
  handleSubmit = () => {
    return this.props.history.goBack();
  };
  render() {
    console.log("IMODAL");
    console.log(this.props);
    console.log("CLICKS");
    return (
      <div>
        <Modal dimmer={true} open={true} onClose={this.handleClose}>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Image
              wrapped
              size="medium"
              src="/images/avatar/large/rachel.png"
            />
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>
                We've found the following gravatar image associated with your
                e-mail address.
              </p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="black" onClick={this.handleClose}>
              Everthing's Cool !
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Make it Cooler!"
              onClick={this.hanldeSubmit}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    banner: state.banner,
  };
};

export default connect(mapStateToProps)(editBanner);