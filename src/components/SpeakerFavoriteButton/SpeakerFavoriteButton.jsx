import React from "react";

const SpeakerFavoriteButton = ({ isFavorite }) => {
  return (
    <div className="flex justify-end">
      <div className={isFavorite ? "heartredbutton" : "heartdarkbutton"}></div>
    </div>
  );
};

export default SpeakerFavoriteButton;
