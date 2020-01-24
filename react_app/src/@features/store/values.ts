import { ActionTypes, Action, Actions, State } from '../types/store.interface';

const initialState: State = {
    personValues: null,
    facilityValues: false,
    exposureValues: false,
};

export const VALUES_ACTION_TYPES: ActionTypes = {
    GET_PERSON: "GET_PERSON",
    GET_PERSON_SUCCESS: "GET_PERSON_SUCCESS",
    GET_PERSON_FAIL: "GET_PERSON_FAIL",
    GET_FACILITY: "GET_FACILITY",
    GET_FACILITY_SUCCESS: "GET_FACILITY_SUCCESS",
    GET_FACILITY_FAIL: "GET_FACILITY_FAIL",
    GET_EXPOSURE: "GET_EXPOSURE",
    GET_EXPOSURE_SUCCESS: "GET_EXPOSURE_SUCCESS",
    GET_EXPOSURE_FAIL: "GET_EXPOSURE_FAIL",
}

export const valuesActions: Actions = {
    getPersonValues: (payload) => ({type: VALUES_ACTION_TYPES.GET_PERSON, payload}),
}

export function valuesReducer(state: State = initialState, {type, payload}: Action) {
    switch (type) {
        case VALUES_ACTION_TYPES.GET_PERSON:
        case VALUES_ACTION_TYPES.GET_FACILITY:
        case VALUES_ACTION_TYPES.GET_EXPOSURE:
            return {
                ...state,
                isLoading: true
            }
        case VALUES_ACTION_TYPES.GET_PERSON_FAIL:
        case VALUES_ACTION_TYPES.GET_FACILITY_FAIL:
        case VALUES_ACTION_TYPES.GET_EXPOSURE_FAIL:
            return {
                ...state,
                errorMessage: payload,
                isLoading: false
            }
        default:
            return state
    }
}