import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authenticationStarted = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authenticationSucceed = (theToken, theUserId) => {
    return {
        type: actionTypes.AUTH_SUCCED,
        token: theToken,
        userId: theUserId
    };
}

export const authenticationFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const authLogOut = () => {
    // clear the localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkOutTimeOut = (expirationTime) => {
    console.log('expirationTime', expirationTime);
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogOut());
        }, expirationTime * 1000);
    };
};


export const authenticating = (email, password, isRegistered) => {
    const webAPIKey = 'AIzaSyDTPH7PrjIQBHr4umOfwPSRk4FsJez2ip0';
    return dispatch => {
        dispatch(authenticationStarted());
        const authPayload = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${webAPIKey}`;
        if (!isRegistered) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${webAPIKey}`
        }
        axios.post(url, authPayload)
            .then(res => {
                console.log('auth res::', res);
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                dispatch(authenticationSucceed(res.data.idToken, res.data.localId));
                dispatch(checkOutTimeOut(res.data.expiresIn));
            }).catch(error => {
                console.log('auth error', error);
                dispatch(authenticationFailed(error.response.data.error));
            });
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }

};

// utility action to dispatch several actions
export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogOut());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(authLogOut());

            } else {
                // si el token está vigente, despacha auth success
                const userId = localStorage.getItem('userId');
                dispatch(authenticationSucceed(token, userId));
                dispatch(checkOutTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }

    }
};

