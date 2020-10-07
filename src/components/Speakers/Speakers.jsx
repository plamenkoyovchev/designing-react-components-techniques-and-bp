import React, { useEffect, useReducer, useState } from "react";

import axios from "axios";
import withData from "../HOCs/withData";
import Searchbar from "../Searchbar/Searchbar";
import Speaker from "../Speaker/Speaker";

import speakersReducer from "../../reducers/request";
import { actionTypes } from "../../actions/request";

const Speakers = () => {
  const [{ speakers, loading, error }, dispatch] = useReducer(speakersReducer, {
    speakers: [],
    loading: false,
    error: "",
  });
  const [speakersQuery, setSpeakersQuery] = useState("");

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        dispatch({ type: actionTypes.FETCH_SPEAKERS_START });
        const response = await axios.get("http://localhost:3004/speakers");
        dispatch({
          type: actionTypes.FETCH_SPEAKERS_SUCCESS,
          payload: response.data,
        });
      } catch {
        dispatch({
          type: actionTypes.FETCH_SPEAKERS_FAILED,
          payload: "Unable to get speakers",
        });
      }
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
    try {
      await axios.put(
        `http://localhost:3004/speakers/${speaker.id}`,
        newSpeaker
      );
      dispatch({
        type: actionTypes.UPDATE_SPEAKERS_SUCCESS,
        payload: newSpeaker,
      });
    } catch {
      dispatch({
        type: actionTypes.UPDATE_SPEAKERS_FAILED,
        payload: "Unable to toggle favorite speaker",
      });
    }
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

export default withData(Speakers);
