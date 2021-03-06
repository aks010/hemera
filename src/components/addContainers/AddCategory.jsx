import React from "react";
import { Button, Dropdown, Modal, Message } from "semantic-ui-react";
import { connect } from "react-redux";

import {
  Form,
  Segment,
  Dimmer,
  Grid,
  Image,
  Loader,
  Checkbox,
} from "semantic-ui-react";

import {
  FetchModelTypes,
  CreateCategory,
  ViewModelSpecs,
} from "../../actions/index";
import { PLACEHOLDERS, LABELS } from "../viewContainers/category/helper";
import { LABELS as MODEL_LABELS } from "../viewContainers/model/helper";
import { CategoryCreateFormValidator } from "../../utils/validator";

class AddCategory extends React.Component {
  state = {
    form: {
      title: "",
      childModel: "",
      link: "",
    },
    errors: {},
    modelOptions: [],
    specs: [],
    selectSpecs: {},
    isFetching: false,
    selected: "",
  };

  componentDidMount = () => {
    this.props.FetchModelTypes();
  };

  componentWillReceiveProps = (nP) => {
    let modelOptions = [];
    console.log("MDEMEODEOMD");
    console.log(nP.modelTypes);

    nP.modelTypes.forEach((o) => {
      if (o != "Category") modelOptions.push({ key: o, value: o, text: o });
    });

    let propSpecs = [];
    if (Object.keys(nP.specs).length !== 0) {
      let temp = nP.specs["required"];
      for (let i = 0; i < temp.length; i++) propSpecs.push(temp[i]);
      let temp2 = nP.specs["options"];
      for (let i = 0; i < temp2.length; i++) propSpecs.push(temp2[i]);
    }

    const specs = {};
    let k = 0;
    for (let i = 0; i < propSpecs.length; i++, k++) {
      let j = 0;
      specs[k] = [];
      while (j < 3 && i + j < propSpecs.length) {
        specs[k].push(propSpecs[i + j]);
        j++;
      }
      i += 2;
    }

    this.setState({ modelOptions, specs });
  };

  handleChange = (e) => {
    const form = this.state.form;
    const { name, value } = e.target;
    form[name] = value;
    this.setState({ form });
  };
  handleSelect = async (e, { value }) => {
    const { form } = this.state;
    form["childModel"] = value;

    this.setState({ isFetching: true, selected: value });
    await this.props.ViewModelSpecs(value);
    this.setState({ form, isFetching: false, selected: value });
  };

  handleToggle = (e, { value }) => {
    console.log("TOGGLE");
    console.log(e.target);
    console.log(value);
    const selectSpecs = this.state.selectSpecs;
    selectSpecs[value] =
      !selectSpecs[value] || selectSpecs[value] == false ? true : false;
    this.setState(selectSpecs);
  };

  handleSubmit = async () => {
    const data = this.state.form;
    const selectedSpecs = this.state.selectSpecs;
    console.log(selectedSpecs);
    const specData = [];
    Object.keys(selectedSpecs).forEach((o) => {
      if (selectedSpecs[o]) specData.push(o);
    });
    data["specs"] = specData;
    console.log(data);

    const errors = CategoryCreateFormValidator(
      ["title", "childModel", "link"],
      data
    );

    if (Object.keys(errors).length == 0) {
      const closeModal = await this.props.CreateCategory(this.props.EID, data);

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

  handleClose = () => {
    this.setState({
      form: {
        title: "",
        childModel: "",
        link: "",
      },
      selected: "",
      errors: {},
    });
    this.props.handleClose();
  };
  render() {
    const { form, specs, errors } = this.state;
    return (
      <div>
        <Modal
          open={this.props.open}
          closeOnEscape={false}
          closeOnDimmerClick={false}
          onClose={this.props.handleClose}
        >
          <Modal.Header>Add Category</Modal.Header>
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
              <Form.Field style={{ width: "50%" }}>
                <label>{LABELS["childModel"]}</label>
                <Dropdown
                  placeholder={PLACEHOLDERS["childModel"]}
                  fluid
                  search
                  selection
                  options={this.state.modelOptions}
                  value={form["childModel"]}
                  onChange={this.handleSelect}
                />

                {errors["childModel"] && (
                  <Message color="red" size="tiny">
                    {errors["childModel"]}
                  </Message>
                )}
              </Form.Field>
              {this.state.selected != "" && this.state.selected != "Category" && (
                <React.Fragment>
                  {this.state.isFetching ? (
                    <Segment style={{ zIndex: "0" }}>
                      <Dimmer active inverted>
                        <Loader inverted />
                      </Dimmer>
                      <Image src="/images/loader_content.png" />
                    </Segment>
                  ) : (
                    <Grid columns="three" divided>
                      {Object.keys(specs).map((o) => {
                        return (
                          <Grid.Row>
                            {specs[o].map((el) => (
                              <Grid.Column>
                                {this.props.specs.required.includes(el) ? (
                                  <Checkbox
                                    label={MODEL_LABELS[el]}
                                    disabled
                                    slider
                                    checked={true}
                                  />
                                ) : (
                                  <Checkbox
                                    name={el}
                                    label={MODEL_LABELS[el]}
                                    onChange={this.handleToggle}
                                    value={el}
                                    slider
                                    checked={specs[el]}
                                  />
                                )}
                              </Grid.Column>
                            ))}
                          </Grid.Row>
                        );
                      })}
                    </Grid>
                  )}
                </React.Fragment>
              )}
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleClose}>Close</Button>
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
  return {
    modelTypes: state.modelTypes,
    specs: state.specification,
  };
};

export default connect(mapStateToProps, {
  FetchModelTypes,
  CreateCategory,
  ViewModelSpecs,
})(AddCategory);
