const defaultState = {
    toFetch: 0,
    fetchQueve: 1,
}

export const userFetchReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "FETCH_DATA":
            return {...state, toFetch: 1};
        case "NOT_FETCH_DATA":
            return {...state, toFetch: 0};
        case "FETCH_QUEVE_UP":
            return {...state, fetchQueve: state.fetchQueve + 1};
        case "FETCH_QUEVE_RESET":
            return {...state, fetchQueve: 1};
        default:
            return state;
    }
}