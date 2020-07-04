import React from "react";
import { Button, Header, Modal, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { RemoveModelItem } from "../../actions";

class RemoveItemModal extends React.Component {
  state = {
    item: {},
  };
  componentWillReceiveProps = (nP) => {
    // console.log(this.props);
    this.setState({ item: nP.item });
  };

  handleSubmit = async () => {
    const { BID, CID, model } = this.props.params;
    console.log(BID, CID, model);
    await this.props.RemoveModelItem(
      this.state.item._id,
      model.toLowerCase(),
      CID ? CID : BID
    );
    console.log("DELETED MODEL");
    this.props.handleClose();
  };
  render() {
    const { item } = this.state;
    // console.log("REMOVEMODAL");
    // console.log(this.state.item);
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
          <Header icon="archive" content={`Delete Item ${item.title}`} />
          <Modal.Content>
            <p>Are you sure you want to delete item {item.title}?</p>
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
    item: state.selected.model,
  };
};

export default connect(mapStateToProps, { RemoveModelItem })(RemoveItemModal);
