import { useEffect, useReducer } from "react";
import requestReducer from "../../store/request/reducer";
import { actionTypes } from "../../store/request/actions";
import axios from "axios";

const withRequest = (baseUrl, pathName) => (Component) => (props) => {
  const [{ records, loading, error }, dispatch] = useReducer(requestReducer, {
    records: [],
    loading: false,
    error: "",
  });

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        dispatch({ type: actionTypes.FETCH_START });
        const response = await axios.get(`${baseUrl}/${pathName}`);
        dispatch({
          type: actionTypes.FETCH_SUCCESS,
          payload: response.data,
        });
      } catch {
        dispatch({
          type: actionTypes.FETCH_FAILED,
          payload: "Unable to get data",
        });
      }
    };

    fetchRecords();
  }, [baseUrl, pathName]);

  const put = async (record) => {
    try {
      await axios.put(`${baseUrl}/${pathName}/${record.id}`, record);
      dispatch({
        type: actionTypes.UPDATE_SUCCESS,
        payload: record,
      });
    } catch {
      dispatch({
        type: actionTypes.UPDATE_FAILED,
        payload: "Unable to update record",
      });
    }
  };

  const localProps = {
    records,
    loading,
    error,
    put: put,
  };

  return <Component {...props} {...localProps}></Component>;
};

export default withRequest;
