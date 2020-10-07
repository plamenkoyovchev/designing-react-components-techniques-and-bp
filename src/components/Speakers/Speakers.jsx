import React, { useEffect, useReducer, useState } from "react";

import axios from "axios";
import withData from "../HOCs/withData";
import Searchbar from "../Searchbar/Searchbar";
import Speaker from "../Speaker/Speaker";

const actionTypes = {
  FETCH_SPEAKERS_START: "FETCH_SPEAKERS_START",
  FETCH_SPEAKERS_SUCCESS: "FETCH_SPEAKERS_SUCCESS",
  FETCH_SPEAKERS_FAILED: "FETCH_SPEAKERS_FAILED",
  UPDATE_SPEAKERS_START: "UPDATE_SPEAKERS_START",
  UPDATE_SPEAKERS_SUCCESS: "UPDATE_SPEAKERS_SUCCESS",
  UPDATE_SPEAKERS_FAILED: "UPDATE_SPEAKERS_FAILED",
};

const initialState = {
  speakers: [],
  loading: false,
  error: "",
};

const speakersReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SPEAKERS_START:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case actionTypes.FETCH_SPEAKERS_SUCCESS:
      return {
        ...state,
        loading: false,
        speakers: action.payload,
        error: "",
      };
    case actionTypes.FETCH_SPEAKERS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const Speakers = () => {
  const [{ speakers, loading, error }, dispatch] = useReducer(
    speakersReducer,
    initialState
  );
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
