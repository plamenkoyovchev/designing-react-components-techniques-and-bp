import React, { useEffect, useState } from "react";

import axios from "axios";
import withData from "../HOCs/withData";
import Searchbar from "../Searchbar/Searchbar";
import Speaker from "../Speaker/Speaker";

const Speakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [speakersQuery, setSpeakersQuery] = useState("");

  useEffect(() => {
    const fetchSpeakers = async () => {
      const response = await axios.get("http://localhost:3004/speakers");
      setSpeakers(response.data);
    };

    fetchSpeakers();
  }, []);

  const toggleFavoriteSpeaker = (speaker) => {
    return {
      ...speaker,
      isFavorite: !speaker.isFavorite,
    };
  };

  const onToggleFavoriteSpeakerHandler = async (speaker) => {
    const newSpeaker = toggleFavoriteSpeaker(speaker);
    const speakerToUpdateIndex = speakers
      .map((speaker) => speaker.id)
      .indexOf(speaker.id);

    await axios.put(`http://localhost:3004/speakers/${speaker.id}`, newSpeaker);

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
