import { actionTypes } from "./actions";

const requestReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.FETCH_START:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case actionTypes.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                records: action.payload,
                error: "",
            };
        case actionTypes.FETCH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case actionTypes.UPDATE_SUCCESS:
            const { records } = state;
            const { payload: record } = action;
            const recordToUpdateIndex = records
                .map((record) => record.id)
                .indexOf(record.id);

            const newRecords = [
                ...records.slice(0, recordToUpdateIndex),
                record,
                ...records.slice(recordToUpdateIndex + 1),
            ];

            return {
                ...state,
                records: newRecords,
                error: ''
            };
        case actionTypes.UPDATE_FAILED:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default requestReducer;