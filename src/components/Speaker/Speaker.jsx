import React from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import SpeakerFavoriteButton from "../SpeakerFavoriteButton/SpeakerFavoriteButton";
import SpeakerImage from "../SpeakerImage/SpeakerImage";

const SpeakerComponent = ({ speaker, onFavoriteClicked, showErrorCard }) => {
  if (showErrorCard) {
    return (
      <div className="rounded overflow-hidden shadow-lg p-6 bg-white">
        <div className="grid grid-cols-4 mb-6">
          <div className="font-bold text-lg col-span-3">
            Error Showing Speaker
          </div>
        </div>
        <div className="mb-6">
          <img src="/speakers/dummy-speaker-image.jpg" />
        </div>
        <div>Contact site owner for resolution.</div>
      </div>
    );
  }

  const { id, firstName, lastName, bio, isFavorite } = speaker;

  return (
    <div className="rounded overflow-hidden shadow-lg p-6 bg-white">
      <div className="grid grid-cols-4 mb-6">
        <div className="font-bold text-lg col-span-3">{`${firstName} ${lastName}`}</div>
        <SpeakerFavoriteButton
          isFavorite={isFavorite}
          onFavoriteClicked={() => onFavoriteClicked(speaker)}
        />
      </div>
      <div className="mb-6">
        <SpeakerImage id={id} firstName={firstName} lastName={lastName} />
      </div>
      <div className="text-gray-600">{bio.substr(0, 70) + "..."}</div>
    </div>
  );
};

const Speaker = (props) => {
  return (
    <ErrorBoundary errorUI={<SpeakerComponent showErrorCard />}>
      <SpeakerComponent {...props} />
    </ErrorBoundary>
  );
};

export default React.memo(Speaker);
