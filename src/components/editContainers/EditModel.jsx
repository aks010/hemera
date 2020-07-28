import React from "react";
import { Button, Form, Modal, Message, Input } from "semantic-ui-react";
import { connect } from "react-redux";

import { UpdateModel } from "../../actions/index";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { LABELS, PLACEHOLDERS } from "../viewContainers/model/helper";

import { ModelCreateFormValidator } from "../../utils/validator";

class EditCategory extends React.Component {
  state = {
    selected: {},
    specs: [],
    form: {},
    errors: {},
  };
  ///

  componentWillReceiveProps = (nP) => {
    let form = {};
    // console.log("PRINT PROPS");
    // console.log(nP);
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
  handleDate = (event, data) => {
    console.log("DATE");
    console.log(event);
    console.log(data);
    const { form } = this.state;
    form[data.namer] = data.value;

    console.log(form);
    this.setState({ form });
  };

  handleSubmit = async () => {
    const { _id: CID, childModel } = this.state.selected.category;
    const { _id: BID, model } = this.state.selected.banner;
    let data = {};

    this.state.specs.forEach((el) => {
      if (this.state.form[el] != this.state.selected.model[el])
        data[el] = this.state.form[el];
    });

    const errors = ModelCreateFormValidator(Object.keys(data), data);

    if (Object.keys(errors).length == 0) {
      const closeModal = await this.props.UpdateModel(
        this.state.selected.model._id,
        CID ? CID : BID,
        childModel ? childModel.toLowerCase() : model.toLowerCase(),
        data
      );

      if (closeModal) {
        this.props.handleClose();
        this.setState({ form: {}, other: false, errors: {} });
      }
    } else {
      this.setState({ errors });
    }
  };

  getDate = (date) => {
    if (!date) return null;
    const dt = new Date(date);
    const dte = new Date(dt);
    return dte;
  };

  render() {
    const { form, specs, errors } = this.state;
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
                if (el !== "type") {
                  if (el == "eventDate") {
                    return (
                      <Form.Field>
                        <label style={{ display: "inline-block" }}>
                          {LABELS[el]}
                        </label>
                        <span style={{ marginLeft: "1rem" }}>
                          {form[el] && String(form[el])}
                        </span>
                        <br />
                        <SemanticDatepicker
                          namer={el}
                          onChange={this.handleDate}
                          clearOnSameDateClick={false}
                          selected={this.getDate(form[el])}
                          placeholder={PLACEHOLDERS[el]}
                          autoComplete
                        />
                        {errors[el] && (
                          <Message size="tiny" color="red">
                            {errors[el]}
                          </Message>
                        )}
                      </Form.Field>
                    );
                  }
                  return (
                    <Form.Field>
                      <Form.Input
                        label={LABELS[el]}
                        name={el}
                        placeholder={PLACEHOLDERS[el]}
                        value={form[el]}
                        onChange={this.handleChange}
                      />
                      {errors[el] && (
                        <Message size="tiny" color="red">
                          {errors[el]}
                        </Message>
                      )}
                    </Form.Field>
                  );
                }
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
