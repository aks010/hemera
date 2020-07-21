import React from "react";
import { connect } from "react-redux";

import {
  Grid,
  Segment,
  Form,
  Button,
  Divider,
  Image,
  Responsive,
  Icon,
} from "semantic-ui-react";

class Profile extends React.Component {
  state = {
    email: "",
    password: "",
  };

  componentWillReceiveProps = (nP) => {
    this.setState({ ...nP.user });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    const form = this.state;
    form[name] = value;
    this.setState({ ...form });
    console.log(form);
  };

  render() {
    return (
      <div className={"login-base-container"}>
        <div className={"login-container"}>
          <Segment placeholder>
            <Grid columns={2} relaxed="very" stackable>
              <Grid.Column verticalAlign="middle">
                <Form>
                  <Form.Input
                    icon="user"
                    name="email"
                    iconPosition="left"
                    label="User Name"
                    value={this.state.name}
                    placeholder="UserName"
                    disabled
                  />
                  <Form.Input
                    icon="mail"
                    name="email"
                    iconPosition="left"
                    label="Email"
                    value={this.state.email}
                    placeholder="Email"
                    disabled
                  />
                </Form>
              </Grid.Column>

              <Grid.Column verticalAlign="middle" textAlign="center">
                <Image
                  src="/images/droom.in.png"
                  size="medium"
                  href="http://droom.in"
                  target="_blank"
                />
              </Grid.Column>
            </Grid>
            <Divider vertical>ADMIN</Divider>
          </Segment>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Profile);
