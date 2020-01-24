export type Nullable<T> = T | null;

export interface State {
    [FIELD: string]: any
}

export interface ActionTypes {
    [ACTION_NAME: string]: string
}

export interface Actions<T = any> {
    [ACTION: string]: (payload?: T) => Action<T> | any
}

/* @param T   */
export interface Action<P = any> {
    type: string;
    payload?: P;
}
