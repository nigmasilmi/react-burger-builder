import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state, action) => {
    const updatedObject = { loading: true, error: null };
    return updateObject(state, updatedObject)
};

const authSucced = (state, action) => {
    const updatedObject = {
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
    };
    return updateObject(state, updatedObject);
};

const authFailed = (state, action) => {
    const updatedObject = {
        token: null,
        userId: null,
        error: action.error,
        loading: false
    };
    return updateObject(state, updatedObject);
};

const authLogOut = (state, action) => {
    const updatedObject = {
        token: null,
        userId: null
    }

    return updateObject(state, updatedObject);
};

const setAuthRedirectPath = (state, action) => {
    const updatedObject = {
        authRedirectPath: action.path
    }
    return updateObject(state, updatedObject);
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);

        case actionTypes.AUTH_SUCCED:
            return authSucced(state, action);

        case actionTypes.AUTH_FAILED:
            return authFailed(state, action);

        case actionTypes.AUTH_LOGOUT:
            return authLogOut(state, action);

        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action);

        default:
            return state
    }
}

export default reducer;