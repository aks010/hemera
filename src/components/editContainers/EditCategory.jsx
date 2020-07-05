import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";

import { Form } from "semantic-ui-react";

import { UpdateCategory } from "../../actions/index";
import { PLACEHOLDERS, LABELS } from "../viewContainers/category/helper";

class EditCategory extends React.Component {
  state = {
    selected: {},
    form: {
      title: "",
      childModel: "",
      link: "",
    },
  };

  componentWillReceiveProps = (nP) => {
    let form = {};
    const { category } = nP.selected;
    if (category) {
      form["title"] = category["title"];
      form["childModel"] = category["childModel"];
      form["link"] = category["link"];
    }
    this.setState({ selected: nP.selected, form });
  };

  handleChange = (e) => {
    const form = this.state.form;
    const { name, value } = e.target;
    form[name] = value;
    this.setState({ form });
  };

  handleSubmit = async () => {
    // Remove Action
    console.log("PRINTING");
    let data = {};
    const form = this.state.form;
    const { category } = this.state.selected;
    Object.keys(form).forEach((el) => {
      if (form[el] != category[el]) data[el] = form[el];
    });
    const { _id: BID } = this.state.selected.banner;
    const { _id: id } = this.state.selected.category;
    await this.props.UpdateCategory(id, BID, data);
    this.props.handleClose();
    // window.location.href = "/banners";
  };
  render() {
    // console.log("IMODAL");
    // console.log(this.props);
    // console.log("CLICKS");
    const { category } = this.state.selected;
    const { form } = this.state;
    return (
      <div>
        <Modal
          open={this.props.open}
          closeOnEscape={false}
          closeOnDimmerClick={false}
          onClose={this.props.handleClose}
        >
          <Modal.Header>Edit Categoatry</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <Form.Input
                  label={LABELS["title"]}
                  name={"title"}
                  placeholder={PLACEHOLDERS["title"]}
                  value={form["title"]}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label={LABELS["link"]}
                  name={"link"}
                  placeholder={PLACEHOLDERS["link"]}
                  value={form["link"]}
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  disabled
                  label={LABELS["childModel"]}
                  name={"childModel"}
                  placeholder={PLACEHOLDERS["childModel"]}
                  value={form["childModel"]}
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.props.handleClose}>Close</Button>
            <Button
              primary
              icon="checkmark"
              labelPosition="right"
              content="Submit"
              onClick={this.handleSubmit}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selected: state.selected,
  };
};

export default connect(mapStateToProps, { UpdateCategory })(EditCategory);
