import React, { useState } from "react";
import withData from "../HOCs/withData";
import Searchbar from "../Searchbar/Searchbar";
import Speaker from "../Speaker/Speaker";

const Speakers = ({ speakers: speakersArray }) => {
  const [speakers, setSpeakers] = useState(speakersArray);
  const [speakersQuery, setSpeakersQuery] = useState("");

  const toggleFavoriteSpeaker = (speaker) => {
    return {
      ...speaker,
      isFavorite: !speaker.isFavorite,
    };
  };

  const onToggleFavoriteSpeakerHandler = (speaker) => {
    const newSpeaker = toggleFavoriteSpeaker(speaker);
    const speakerToUpdateIndex = speakers
      .map((speaker) => speaker.id)
      .indexOf(speaker.id);

    const newSpeakers = [
      ...speakers.slice(0, speakerToUpdateIndex),
      newSpeaker,
      ...speakers.slice(speakerToUpdateIndex + 1),
    ];
    setSpeakers(newSpeakers);
  };

  const filterSpeaker = ({ firstName, lastName }) => {
    return (
      firstName.toLowerCase().includes(speakersQuery.toLowerCase()) ||
      lastName.toLowerCase().includes(speakersQuery.toLowerCase())
    );
  };

  return (
    <div>
      <Searchbar
        speakersQuery={speakersQuery}
        setSpeakersQuery={setSpeakersQuery}
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12">
        {speakers &&
          speakers
            .filter(filterSpeaker)
            .map((speaker) => (
              <Speaker
                key={speaker.id}
                {...speaker}
                onFavoriteClicked={() =>
                  onToggleFavoriteSpeakerHandler(speaker)
                }
              />
            ))}
      </div>
    </div>
  );
};

export default withData(Speakers);
