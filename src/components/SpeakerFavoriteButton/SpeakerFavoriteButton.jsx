import React from "react";

const SpeakerFavoriteButton = ({ isFavorite, onFavoriteClicked }) => {
  return (
    <div className="flex justify-end">
      <div
        className={isFavorite ? "heartredbutton" : "heartdarkbutton"}
        onClick={onFavoriteClicked}
      ></div>
    </div>
  );
};

export default SpeakerFavoriteButton;
