import React from "react";
import SpeakerFavoriteButton from "../SpeakerFavoriteButton/SpeakerFavoriteButton";
import SpeakerImage from "../SpeakerImage/SpeakerImage";

const Speaker = ({
  id,
  firstName,
  lastName,
  bio,
  isFavorite,
  onFavoriteClicked,
}) => {
  return (
    <div className="rounded overflow-hidden shadow-lg p-6 bg-white" key={id}>
      <div className="grid grid-cols-4 mb-6">
        <div className="font-bold text-lg col-span-3">{`${firstName} ${lastName}`}</div>
        <SpeakerFavoriteButton
          isFavorite={isFavorite}
          onFavoriteClicked={onFavoriteClicked}
        />
      </div>
      <div className="mb-6">
        <SpeakerImage id={id} firstName={firstName} lastName={lastName} />
      </div>
      <div className="text-gray-600">{bio.substr(0, 70) + "..."}</div>
    </div>
  );
};

export default Speaker;
