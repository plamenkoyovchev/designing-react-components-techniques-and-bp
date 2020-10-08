import { useEffect, useReducer } from "react";
import speakersReducer from "../../store/speakers/reducer";
import { actionTypes } from "../../store/speakers/actions";
import axios from "axios";

const withRequest = (baseUrl, pathName) => (Component) => (props) => {
  const [{ speakers, loading, error }, dispatch] = useReducer(speakersReducer, {
    speakers: [],
    loading: false,
    error: "",
  });

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        dispatch({ type: actionTypes.FETCH_SPEAKERS_START });
        const response = await axios.get(`${baseUrl}/${pathName}`);
        dispatch({
          type: actionTypes.FETCH_SPEAKERS_SUCCESS,
          payload: response.data,
        });
      } catch {
        dispatch({
          type: actionTypes.FETCH_SPEAKERS_FAILED,
          payload: "Unable to get data",
        });
      }
    };

    fetchSpeakers();
  }, []);

  const put = async (record) => {
    try {
      await axios.put(`${baseUrl}/${pathName}/${record.id}`, record);
      dispatch({
        type: actionTypes.UPDATE_SPEAKERS_SUCCESS,
        payload: record,
      });
    } catch {
      dispatch({
        type: actionTypes.UPDATE_SPEAKERS_FAILED,
        payload: "Unable to update record",
      });
    }
  };

  const localProps = {
    records: speakers,
    loading,
    error,
    put: put,
  };

  return <Component {...props} {...localProps}></Component>;
};

export default withRequest;
