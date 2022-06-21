import React from 'react';
import { Card, CardBody } from 'reactstrap';
import CenterPiece from '../CenterPiece';

export type LoadingPropsType = {
  dotType?: string;
};

export const Loading: React.FunctionComponent<LoadingPropsType> = (props) => {
  const { children, dotType } = props;

  return (
    <div className="text-center">
      <div className="stage">
        <div className={dotType} />
      </div>
      {children}
    </div>
  );
};

Loading.defaultProps = {
  dotType: 'dot-bricks',
};

export interface LoadingComponentPropsType {
  card?: boolean;
  dotType?: string;
}

const LoadingComponent: React.FunctionComponent<LoadingComponentPropsType> = (props) => {
  const { card, children, dotType } = props;

  if (card) {
    return (
      <CenterPiece>
        <Card className="text-center">
          <CardBody>
            <Loading dotType={dotType}>
              {children}
            </Loading>
          </CardBody>
        </Card>
      </CenterPiece>
    );
  }

  return (
    <div className="text-center">
      <div className="stage">
        <div className={dotType} />
      </div>
      {children}
    </div>
  );
};

LoadingComponent.defaultProps = {
  card: true,
  dotType: 'dot-bricks',
};

export default LoadingComponent;
