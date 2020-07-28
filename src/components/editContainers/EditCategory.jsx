import React from "react";
import { Button, Message, Modal } from "semantic-ui-react";
import { connect } from "react-redux";

import { Form } from "semantic-ui-react";

import { UpdateCategory } from "../../actions/index";
import { PLACEHOLDERS, LABELS } from "../viewContainers/category/helper";
import { CategoryCreateFormValidator } from "../../utils/validator";

class EditCategory extends React.Component {
  state = {
    selected: {},
    form: {
      title: "",
      childModel: "",
      link: "",
    },
    errors: {},
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
    let data = {};
    const form = this.state.form;
    const { category } = this.state.selected;
    Object.keys(form).forEach((el) => {
      if (form[el] != category[el]) data[el] = form[el];
    });

    const errors = CategoryCreateFormValidator(Object.keys(data), data);
    if (Object.keys(errors).length == 0) {
      const { _id: BID } = this.state.selected.banner;
      const { _id: id } = this.state.selected.category;
      const closeModal = await this.props.UpdateCategory(id, BID, data);

      if (closeModal) {
        this.props.handleClose();
        this.setState({
          form: {
            title: "",
            childModel: "",
            link: "",
          },
          selected: "",
          errors: {},
        });
      }
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { category } = this.state.selected;
    const { form, errors } = this.state;
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
                {errors["title"] && (
                  <Message color="red" size="tiny">
                    {errors["title"]}
                  </Message>
                )}
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label={LABELS["link"]}
                  name={"link"}
                  placeholder={PLACEHOLDERS["link"]}
                  value={form["link"]}
                  onChange={this.handleChange}
                />
                {errors["link"] && (
                  <Message color="red" size="tiny">
                    {errors["link"]}
                  </Message>
                )}
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
            <Button color="black" onClick={this.props.handleClose}>
              Everthing's Cool !
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Make it Cooler!"
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
