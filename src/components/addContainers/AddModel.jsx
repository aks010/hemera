import React from "react";
import { connect } from "react-redux";

import { Button, Form, Modal, Dropdown } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

import { AddModel } from "../../actions/index";

import { LABELS, PLACEHOLDERS } from "../viewContainers/model/helper";

class AddModelItem extends React.Component {
  state = {
    selected: {},
    specs: [],
    form: {},
    modelOptions: [],
    other: false,
  };

  componentWillReceiveProps = (nP) => {
    // nP.specs.forEach((el) => (form[el] = ""));
    let modelOptions = [];
    if (nP.specs && nP.specs.includes("type")) {
      if (nP.modelList)
        modelOptions.push({ key: "other", value: "other", text: "Other" });
      Object.keys(nP.modelList).forEach((o) =>
        modelOptions.push({ key: o, value: o, text: o })
      );
    }
    this.setState({
      selected: nP.selected,
      specs: nP.specs,
      modelOptions,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const { form } = this.state;
    form[name] = value;
    this.setState({ form });
  };

  handleSelect = (e, { value }) => {
    const { form } = this.state;
    console.log(value);
    if (value == "other") {
      form["type"] = "";
      this.setState({ form, other: true });
    } else {
      form["type"] = value;
      this.setState({ form, other: false });
    }
  };

  handleDate = (event, data) => {
    console.log("DATE");
    console.log(event);
    console.log(data);
    const { form } = this.state;
    form[data.namer] = data.value;
    this.setState({ form });
  };
  handleSubmit = async () => {
    const { _id: CID, childModel } = this.state.selected.category || {};
    const { _id: BID, model } = this.state.selected.banner;
    const data = this.state.form;

    console.log(data);
    // Validate Data

    await this.props.AddModel(
      CID ? CID : BID,
      childModel ? childModel.toLowerCase() : model.toLowerCase(),
      data
    );

    // console.log("CALLING");
    this.props.handleClose();
    this.setState({ form: {}, other: false });
  };
  render() {
    // console.log(this.props.modelLis  t);
    const { form, specs } = this.state;
    console.log(form);
    console.log(this.state.other);
    return (
      <div>
        <Modal
          open={this.props.open}
          closeOnEscape={false}
          closeOnDimmerClick={false}
          onClose={this.props.handleClose}
        >
          <Modal.Header>Add Item</Modal.Header>
          <Modal.Content scrolling>
            <Form>
              {specs.map((el) => {
                if (el == "type") {
                  return (
                    <React.Fragment>
                      <Form.Field>
                        <label>Type</label>
                        {this.state.other ? (
                          <Dropdown
                            placeholder={PLACEHOLDERS[el]}
                            fluid
                            search
                            selection
                            options={this.state.modelOptions}
                            value={"other"}
                            onChange={this.handleSelect}
                          />
                        ) : (
                          <Dropdown
                            placeholder={PLACEHOLDERS[el]}
                            fluid
                            search
                            selection
                            options={this.state.modelOptions}
                            value={form[el]}
                            onChange={this.handleSelect}
                          />
                        )}
                      </Form.Field>
                      <Form.Field>
                        {this.state.other && (
                          <Form.Input
                            name={el}
                            placeholder={PLACEHOLDERS[el]}
                            value={form[el]}
                            onChange={this.handleChange}
                          />
                        )}
                      </Form.Field>
                    </React.Fragment>
                  );
                }
                if (el == "eventDate") {
                  return (
                    <Form.Field>
                      <label>{LABELS[el]}</label>
                      <SemanticDatepicker
                        namer={el}
                        onChange={this.handleDate}
                        clearOnSameDateClick={false}
                        placeholder={PLACEHOLDERS[el]}
                        autoComplete
                      />
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
                  </Form.Field>
                );
              })}
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button onClick={this.props.handleClose}>Close</Button>
            <Button primary onClick={this.handleSubmit}>
              Submit{" "}
            </Button>
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
    modelList: state.modelList,
  };
};

export default connect(mapStateToProps, { AddModel })(AddModelItem);
