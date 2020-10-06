import React from "react";

const SpeakerImage = ({ id, firstName, lastName }) => {
  const imgUrl = `/speakers/speaker-${id}.jpg`;
  return <img src={imgUrl} loading="lazy" alt={`${firstName} ${lastName}`} />;
};

export default SpeakerImage;
