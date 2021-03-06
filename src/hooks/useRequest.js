import axios from "axios";
import { useReducer, useEffect } from "react";
import { toast } from "react-toastify";
import { actionTypes } from "../store/request/actions";
import requestReducer from "../store/request/reducer";

const useRequest = (baseUrl, pathName) => {
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
       dispatch({
        type: actionTypes.UPDATE_SUCCESS,
        payload: record,
      });
      await axios.put(`${baseUrl}/${pathName}/${record.id}`, record);
    } catch(e) {
      dispatch({
        type: actionTypes.UPDATE_FAILED,
        payload: e,
      });

      toast.dark("Unable to update record");
    }
  };

  const localProps = {
    records,
    loading,
    error,
    put: put,
  };

  return localProps;
};

export default useRequest;
