import React from "react";
import { Button, Header, Modal, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { RemoveBanner } from "../../actions";

class RemoveBannerModal extends React.Component {
  state = {
    banner: {},
  };
  componentWillReceiveProps = (nP) => {
    this.setState({ banner: nP.banner });
  };

  handleSubmit = async () => {
    console.log("SUBMIT");
    console.log(this.state.banner);
    await this.props.RemoveBanner(this.state.banner.id);
    console.log("DELETE OPR");
    this.props.history.goBack();
  };
  render() {
    const { banner } = this.state;
    // console.log("REMOVEODAL");
    // console.log(this.state.banner);
    return (
      <div>
        <Modal
          open={this.props.open}
          closeOnEscape={false}
          closeOnDimmerClick={false}
          onClose={this.props.handleClose}
          basic
          size="small"
        >
          <Header icon="archive" content={`Delete Banner ${banner.title}`} />
          <Modal.Content>
            <p>This will result in deletion of all nested items.</p>
            <p>Are you sure you want to delete banner {banner.title}?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Confirm Delete
            </Button>
            <Button color="green" inverted onClick={this.props.handleClose}>
              <Icon name="remove" /> Leave
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    banner: state.selected.banner,
  };
};

export default connect(mapStateToProps, { RemoveBanner })(RemoveBannerModal);
