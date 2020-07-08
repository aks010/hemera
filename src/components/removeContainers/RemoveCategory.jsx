import React from "react";
import { Button, Header, Modal, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { RemoveCategory } from "../../actions";

class RemoveCategoryModal extends React.Component {
  state = {
    category: {},
  };
  componentWillReceiveProps = (nP) => {
    this.setState({ category: nP.category });
  };

  handleSubmit = async () => {
    console.log("REMOVE CATEGORY");
    console.log(this.state.category);
    const BID = this.props.params;
    await this.props.RemoveCategory(this.state.category._id, BID);
    console.log("DELETE OPR");
    this.props.handleClose();
  };
  render() {
    const { category } = this.state;
    // console.log("REMOVEODAL");
    // console.log(this.state.category);
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
          <Header
            icon="archive"
            content={`Delete Category ${category.title}`}
          />
          <Modal.Content>
            <p>This will result in deletion of all inner nested items.</p>
            <p>Are you sure you want to delete category {category.title}?</p>
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
    category: state.selected.category,
  };
};

export default connect(mapStateToProps, { RemoveCategory })(
  RemoveCategoryModal
);
