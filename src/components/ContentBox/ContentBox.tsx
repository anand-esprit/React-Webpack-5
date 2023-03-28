import { Card } from "antd";
import React from "react";

export interface ContentBoxProps {
  children?: any;
  hasBox?: boolean;
}

const ContentBox: React.FC<ContentBoxProps> = ({ children, hasBox }) => {
  return (
    <div className="app__container">
      {hasBox ? (
        <Card className="app__container__card">{children}</Card>
      ) : (
        children
      )}
    </div>
  );
};

export default ContentBox;
