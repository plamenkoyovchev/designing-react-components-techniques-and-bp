import React, { useState } from "react";
import withData from "../HOCs/withData";
import Searchbar from "../Searchbar/Searchbar";
import Speaker from "../Speaker/Speaker";

const Speakers = ({ speakers }) => {
  const [speakersQuery, setSpeakersQuery] = useState("");

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
            .map((speaker) => <Speaker key={speaker.id} {...speaker} />)}
      </div>
    </div>
  );
};

export default withData(Speakers);
