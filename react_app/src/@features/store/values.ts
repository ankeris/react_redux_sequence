import { ActionTypes, Action, Actions, State } from '../types/store.interface';
import ValuesService from '../services/values.service';
import { ofType, Epic, combineEpics } from 'redux-observable';
import { mergeMap, catchError, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';

const valuesService = new ValuesService();

const initialState: State = {
    personValues: null,
    facilityValues: false,
    exposureValues: false,
    isLoading: false,
    errorMessage: ""
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
        case VALUES_ACTION_TYPES.GET_PERSON_SUCCESS:
            return {
                ...state,
                personValues: payload,
                isLoading: false
            }
        case VALUES_ACTION_TYPES.GET_FACILITY_SUCCESS:
            return {
                ...state,
                facilityValues: payload,
                isLoading: false
            }
        case VALUES_ACTION_TYPES.GET_EXPOSURE_SUCCESS:
            return {
                ...state,
                exposureValues: payload,
                isLoading: false
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

export const getPersonValues: Epic = (action$) => action$.pipe(
    ofType(VALUES_ACTION_TYPES.GET_PERSON),
    flatMap(({payload}) => {
        return valuesService.getPerson(payload || '').pipe(
            flatMap(({data}) => of(
                {type: VALUES_ACTION_TYPES.GET_PERSON_SUCCESS, payload: data},
                {type: VALUES_ACTION_TYPES.GET_FACILITY}
            )),
            catchError(() => of({type: VALUES_ACTION_TYPES.GET_PERSON_FAIL, payload: "error retrieving person values"})),
        )
    }),
)

export const getFacilityValues: Epic = (action$) => action$.pipe(
    ofType(VALUES_ACTION_TYPES.GET_FACILITY),
    flatMap(() => {
        return valuesService.getFacility(11111).pipe(
            flatMap(({data}) => of(
                {type: VALUES_ACTION_TYPES.GET_FACILITY_SUCCESS, payload: data},
                {type: VALUES_ACTION_TYPES.GET_EXPOSURE}
            )),
            catchError(() => of({type: VALUES_ACTION_TYPES.GET_FACILITY_FAIL, payload: "error retrieving facility values"})),
        )
    }),
)

export const getExposureValues: Epic = (action$) => action$.pipe(
    ofType(VALUES_ACTION_TYPES.GET_EXPOSURE),
    flatMap(() => {
        return valuesService.getExposure(11111).pipe(
            flatMap(({data}) => of(
                    {type: VALUES_ACTION_TYPES.GET_EXPOSURE_SUCCESS, payload: data},
            )),
            catchError(() => of({type: VALUES_ACTION_TYPES.GET_EXPOSURE_FAIL, payload: "error retrieving exposure values"})),
        )
    }),
)

export const VALUES_EPICS = combineEpics(
    getPersonValues,
    getFacilityValues,
    getExposureValues
);
