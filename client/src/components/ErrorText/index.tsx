import React from 'react';

export type ErrorTextPropsType = {
  error: string;
};

const ErrorText: React.FunctionComponent<ErrorTextPropsType> = (props) => {
  const { error } = props;

  if (error === '') return null;

  return <small className="text-danger">{error}</small>;
};

export default ErrorText;
