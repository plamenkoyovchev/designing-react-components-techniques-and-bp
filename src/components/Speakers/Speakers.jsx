import React, { useState, useContext, useCallback } from "react";
import { DataContext, DataProvider } from "../../contexts/DataContext";

import Searchbar from "../Searchbar/Searchbar";
import Speaker from "../Speaker/Speaker";

const SpeakersComponent = () => {
  const [speakersQuery, setSpeakersQuery] = useState("");
  const { records: speakers, loading, error, put } = useContext(DataContext);

  const message = "";

  const onToggleFavoriteSpeakerHandler = useCallback(
    (speaker) => {
      put({
        ...speaker,
        isFavorite: !speaker.isFavorite,
      });
    }, 
    []
  );

  const filterSpeaker = ({ firstName, lastName }) => {
    return (
      firstName.toLowerCase().includes(speakersQuery.toLowerCase()) ||
      lastName.toLowerCase().includes(speakersQuery.toLowerCase())
    );
  };

  return (
    <div>
      {message && message.length > 0 && (
        <div
          className="bg-orange-100 border-l-8 border-orange-500 text-orange-700 p-4 text-2xl"
          role="alert"
        >
          <p className="font-bold">Special Message</p>
          <p>{message}</p>
        </div>
      )}
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
                speaker={speaker}
                onFavoriteClicked={onToggleFavoriteSpeakerHandler}
              />
            ))}
      </div>
    </div>
  );
};

const Speakers = (props) => {
  return (
    <DataProvider baseUrl="http://localhost:3004" pathName="speakers">
      <SpeakersComponent {...props}></SpeakersComponent>
    </DataProvider>
  );
};

export default Speakers;
