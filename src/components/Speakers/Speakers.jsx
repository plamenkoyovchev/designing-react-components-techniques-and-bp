import React from "react";
import withData from "../HOCs/withData";
import Searchbar from "../Searchbar/Searchbar";
import Speaker from "../Speaker/Speaker";

const Speakers = ({ speakers }) => {
  return (
    <div>
      <Searchbar />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12">
        {speakers &&
          speakers.map((speaker) => <Speaker key={speaker.id} {...speaker} />)}
      </div>
    </div>
  );
};

export default withData(Speakers);
