import React from "react";
import { Button, Form, Modal, Input } from "semantic-ui-react";
import { connect } from "react-redux";

import { UpdateModel } from "../../actions/index";

import { LABELS, PLACEHOLDERS } from "../viewContainers/model/helper";

class EditCategory extends React.Component {
  state = {
    selected: {},
    specs: [],
    form: {},
  };

  componentWillReceiveProps = (nP) => {
    let form = {};
    if (nP.selected.model)
      nP.specs.forEach((el) => (form[el] = nP.selected.model[el]));
    this.setState({ selected: nP.selected, specs: nP.specs, form });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const { form } = this.state;
    form[name] = value;
    this.setState({ form });
  };

  handleSubmit = async () => {
    // Remove Action
    // VALIDATE FORM

    console.log("PRINTING");
    console.log(this.state.selected.model);
    const { _id: CID, childModel } = this.state.selected.category;
    const { _id: BID, model } = this.state.selected.banner;
    console.log(CID, BID);
    console.log(this.state.selected);
    let data = {};
    this.state.specs.forEach((el) => {
      if (this.state.form[el] != this.state.selected.model[el])
        data[el] = this.state.form[el];
    });
    console.log(data);
    await this.props.UpdateModel(
      this.state.selected.model._id,
      CID ? CID : BID,
      childModel ? childModel.toLowerCase() : model.toLowerCase(),
      data
    );
    console.log("CALLING");
    this.props.handleClose();
  };
  render() {
    const { form, specs } = this.state;
    const { model } = this.state.selected;
    return (
      <div>
        <Modal
          open={this.props.open}
          closeOnEscape={false}
          closeOnDimmerClick={false}
          onClose={this.props.handleClose}
        >
          <Modal.Header>Edit Item {model && model.title}</Modal.Header>
          <Modal.Content scrolling>
            <Form>
              {specs.map((el) => {
                if (el !== "type")
                  return (
                    <Form.Field>
                      <Form.Input
                        label={LABELS[el]}
                        name={el}
                        placeholder={PLACEHOLDERS[el]}
                        value={form[el]}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                  );
              })}
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
  let specs = [];
  if (Object.keys(state.specification).length !== 0) {
    let temp = state.specification["required"];
    for (let i = 0; i < temp.length; i++) specs.push(temp[i]);
    let temp2 = state.specification["options"];
    for (let i = 0; i < temp2.length; i++) specs.push(temp2[i]);
  }
  return {
    selected: state.selected,
    specs,
  };
};

export default connect(mapStateToProps, { UpdateModel })(EditCategory);
