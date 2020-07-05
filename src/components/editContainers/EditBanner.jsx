import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";

import { Form } from "semantic-ui-react";

import { UpdateBanner } from "../../actions/index";
import { PLACEHOLDERS, LABELS } from "../viewContainers/bannerList/helper";

class EditBanner extends React.Component {
  state = {
    banner: {},
    form: {
      title: "",
      model: "",
      link: "",
    },
  };

  componentWillReceiveProps = (nP) => {
    let form = {};
    const banner = nP.banner;
    if (banner) {
      form["title"] = banner["title"];
      form["model"] = banner["model"];
      form["link"] = banner["link"];
    }
    this.setState({ banner: nP.banner, form });
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
    const banner = this.state.banner;
    Object.keys(form).forEach((el) => {
      if (form[el] != banner[el]) data[el] = form[el];
    });
    const { _id } = this.state.banner;
    await this.props.UpdateBanner(_id, data);
    this.props.handleClose();
    // window.location.href = "/banners";
  };
  render() {
    // console.log("IMODAL");
    // console.log(this.props);
    // console.log("CLICKS");
    const { banner, form } = this.state;
    return (
      <div>
        <Modal
          open={this.props.open}
          closeOnEscape={false}
          closeOnDimmerClick={false}
          onClose={this.props.handleClose}
        >
          <Modal.Header>Edit Banner {banner.title}</Modal.Header>
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
                  label={LABELS["model"]}
                  name={"model"}
                  placeholder={PLACEHOLDERS["model"]}
                  value={form["model"]}
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
    banner: state.selected.banner,
  };
};

export default connect(mapStateToProps, { UpdateBanner })(EditBanner);
