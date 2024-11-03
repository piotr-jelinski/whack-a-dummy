import React from "react";

type CuboidProps = {
  className?: string;
  faceBack?: React.ReactNode;
  faceBottom?: React.ReactNode;
  faceFront?: React.ReactNode;
  faceLeft?: React.ReactNode;
  faceRight?: React.ReactNode;
  faceTop?: React.ReactNode;
};

const Cuboid: React.FunctionComponent<CuboidProps> = ({
  className = "",
  faceBack = null,
  faceBottom = null,
  faceFront = null,
  faceLeft = null,
  faceRight = null,
  faceTop = null,
}) => {
  return (
    <div className={`cuboid ${className}`}>
      <div className="face face-back">{faceBack}</div>
      <div className="face face-bottom">{faceBottom}</div>
      <div className="face face-front">{faceFront}</div>
      <div className="face face-left">{faceLeft}</div>
      <div className="face face-right">{faceRight}</div>
      <div className="face face-top">{faceTop}</div>
    </div>
  );
};

export default Cuboid;
