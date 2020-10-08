import React, { useState } from "react";

import withRequest from "../HOCs/withRequest";
import Searchbar from "../Searchbar/Searchbar";
import Speaker from "../Speaker/Speaker";

const Speakers = ({ records: speakers, loading, error, put }) => {
  const [speakersQuery, setSpeakersQuery] = useState("");

  const onToggleFavoriteSpeakerHandler = (speaker) => {
    put({
      ...speaker,
      isFavorite: !speaker.isFavorite,
    });
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
      {loading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}
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

export default withRequest("http://localhost:3004", "speakers")(Speakers);
