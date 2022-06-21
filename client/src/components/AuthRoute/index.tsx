/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import logging from '../../config/logging';
import UserContext from '../../contexts/user';

export type AuthRoutePropsType = Record<string, unknown>;

const AuthRoute: React.FunctionComponent<AuthRoutePropsType> = (props) => {
  const { children } = props;

  const userContext = useContext(UserContext);

  if (userContext.userState.user._id === '') {
    logging.info('Unauthorized, redirecting.');
    return <Redirect to="/login" />;
  }
  return <>{children}</>;
};

export default AuthRoute;
