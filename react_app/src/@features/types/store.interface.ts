export type Nullable<T> = T | null;

export interface State {
    [FIELD: string]: any
}

export interface ActionTypes {
    [ACTION_NAME: string]: string
}

export interface Actions {
    [ACTION: string]: <T = any>(payload?: T) => Action
}

/* @param T   */
export interface Action<P = any> {
    type: string;
    payload?: P;
}
