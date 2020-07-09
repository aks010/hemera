import React from "react";
import { connect } from "react-redux";

import {
  Grid,
  Image,
  Popup,
  Header,
  Button,
  Icon,
  List,
  Segment,
} from "semantic-ui-react";

import { LogoutUser } from "../actions/index";

class NavHeader extends React.Component {
  handleLogout = async () => {
    await this.props.LogoutUser();
    window.location.href = "/login";
  };

  render() {
    return (
      <Segment>
        <Grid columns={3} relaxed="very">
          <Grid.Column verticalAlign="middle" textAlign="left">
            <Image
              src="/images/droom_logo.png"
              size="tiny"
              href="http://droom.in"
              target="_blank"
            />
          </Grid.Column>
          <Grid.Column verticalAlign="middle" textAlign="center">
            <h2>MANAGE TOOL</h2>
          </Grid.Column>

          <Grid.Column verticalAlign="middle" textAlign="right">
            <Popup
              trigger={<Icon name="user circle" size="big" />}
              basic
              hoverable
            >
              <List divided relaxed>
                <List.Item>
                  <List.Icon
                    name="user plus"
                    size="small"
                    verticalAlign="middle"
                  />
                  <List.Content>
                    <List.Header as="a">Register User</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon
                    name="sign out"
                    size="small"
                    verticalAlign="middle"
                  />
                  <List.Content>
                    <List.Header as="a" onClick={this.handleLogout}>
                      Logout
                    </List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </Popup>
          </Grid.Column>
        </Grid>
      </Segment>
    );
  }
}

export default connect(null, { LogoutUser })(NavHeader);
