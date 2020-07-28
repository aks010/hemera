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
  CreateBanner,
  ViewModelSpecs,
} from "../../actions/index";
import { PLACEHOLDERS, LABELS } from "../viewContainers/bannerList/helper";
import { LABELS as MODEL_LABELS } from "../viewContainers/model/helper";
import { BannerCreateFormValidator } from "../../utils/validator";

class AddBanner extends React.Component {
  state = {
    form: {
      title: "",
      model: "",
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

    nP.modelTypes.forEach((o) =>
      modelOptions.push({ key: o, value: o, text: o })
    );

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
    form["model"] = value;
    if (value != "Category") {
      this.setState({ isFetching: true, selected: value });
      await this.props.ViewModelSpecs(value);
    }
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
    // Remove Action
    const data = this.state.form;
    //VALIDATE
    // console.log(data);
    console.log(this.state);
    const selectedSpecs = this.state.selectSpecs;
    console.log(selectedSpecs);
    const specData = [];
    Object.keys(selectedSpecs).forEach((o) => {
      if (selectedSpecs[o]) specData.push(o);
    });
    // console.log(specData);
    data["specs"] = specData;
    console.log(data);

    const errors = BannerCreateFormValidator(["title", "model", "link"], data);

    if (Object.keys(errors).length == 0) {
      const closeModal = await this.props.CreateBanner(data);
      if (closeModal) {
        this.setState({
          form: {
            title: "",
            model: "",
            link: "",
          },
          selected: "",
        });

        this.props.handleClose();
        /// window.location.href = "/banners";
      }
    } else {
      this.setState({ errors });
    }
  };

  handleClose = () => {
    this.setState({
      form: {
        title: "",
        model: "",
        link: "",
      },
      selected: "",
    });

    this.props.handleClose();
  };

  render() {
    // console.log("IMODAL");
    // console.log(this.props);
    // console.log("CLICKS");
    const { form, specs, errors } = this.state;
    console.log("PRINTING SPECS");
    console.log(this.state);
    // console.log(this.props);
    return (
      <div>
        <Modal
          open={this.props.open}
          closeOnEscape={false}
          closeOnDimmerClick={false}
          onClose={this.props.handleClose}
        >
          <Modal.Header>Add Banner</Modal.Header>
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
                <label>{LABELS["model"]}</label>
                <Dropdown
                  placeholder={PLACEHOLDERS["model"]}
                  fluid
                  search
                  selection
                  options={this.state.modelOptions}
                  value={form["model"]}
                  onChange={this.handleSelect}
                />
                {errors["model"] && (
                  <Message color="red" size="tiny">
                    {errors["model"]}
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
  CreateBanner,
  ViewModelSpecs,
})(AddBanner);
