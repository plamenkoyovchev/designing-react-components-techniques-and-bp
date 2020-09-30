import React from "react";
import withData from "../HOCs/withData";

const Speakers = ({ speakers }) => {
  return (
    <div>
      {speakers &&
        speakers.map(({ imageSrc, name }) => (
          <img src={`images/${imageSrc}.png`} title={name} />
        ))}
    </div>
  );
};

export default withData(Speakers);
