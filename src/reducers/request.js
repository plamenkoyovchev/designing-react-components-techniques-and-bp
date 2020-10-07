import { actionTypes } from "../actions/request";

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
        case actionTypes.UPDATE_SPEAKERS_SUCCESS:
            const { speakers } = state;
            const { payload: speaker } = action;
            const speakerToUpdateIndex = speakers
                .map((speaker) => speaker.id)
                .indexOf(speaker.id);

            const newSpeakers = [
                ...speakers.slice(0, speakerToUpdateIndex),
                speaker,
                ...speakers.slice(speakerToUpdateIndex + 1),
            ];

            return {
                ...state,
                speakers: newSpeakers,
                error: ''
            };
        case actionTypes.UPDATE_SPEAKERS_FAILED:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default speakersReducer;