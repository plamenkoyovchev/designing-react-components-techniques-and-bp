import React from "react";

const SpeakerImage = ({ id, firstName, lastName }) => {
  const imgUrl = `/speakers/Speaker-${id}.jpg`;
  return <img src={imgUrl} loading="lazy" alt={`${firstName} ${lastName}`} />;
};

export default SpeakerImage;
