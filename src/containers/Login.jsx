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
} from "semantic-ui-react";

import { LoginUser } from "../actions/index";
import { isUserAuthenticated } from "../utils/Auth";
import "./index.css";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
  };

  // componentDidMount = () => {
  //   if (isUserAuthenticated()) this.props.history.push("/banners");
  // };

  handleChange = (e) => {
    const { name, value } = e.target;
    const form = this.state;
    form[name] = value;
    this.setState({ ...form });
    console.log(form);
  };

  handleSubmit = async () => {
    await this.props.LoginUser(this.state);
    this.props.history.push("/banners");
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
                    label="Username"
                    value={this.state.email}
                    placeholder="Username"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    icon="lock"
                    iconPosition="left"
                    label="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />

                  <Button content="Login" onClick={this.handleSubmit} primary />
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

export default connect(null, { LoginUser })(Login);
