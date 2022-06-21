/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar, NavbarBrand, Nav, NavbarText, Container, Button,
} from 'reactstrap';
import UserContext from '../../contexts/user';

export type NavigationPropsType = Record<string, unknown>;

const Navigation: React.FunctionComponent<NavigationPropsType> = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext.userState;

  const logout = () => {
    userContext.userDispatch({ type: 'logout', payload: userContext.userState });
  };

  return (
    <Navbar color="light" light sticky="top" expand="md">
      <Container>
        <NavbarBrand tag={Link} to="/">Generic Blog Site</NavbarBrand>
        <Nav className="mr-auto" navbar />
        {user._id !== ''
          ? (
            <div>
              <Button outline tag={Link} to="/edit">
                <i className="far fa-sticky-note mr-2" />
                Post a Blog
              </Button>
              <NavbarText className="ml-2 mr-2">|</NavbarText>
              <Button outline size="sm" onClick={() => logout()}>
                Logout
              </Button>
            </div>
          )

          : (
            <div>
              <NavbarText tag={Link} to="/login">Login</NavbarText>
              <NavbarText className="ml-2 mr-2">|</NavbarText>
              <NavbarText tag={Link} to="/register">Signup</NavbarText>
            </div>
          )}
      </Container>
    </Navbar>
  );
};

export default Navigation;
