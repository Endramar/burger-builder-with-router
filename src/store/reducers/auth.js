import * as actionTypes from '../actions/actionTypes';
import utility from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return utility.updateObject(state, { error: null, loading: true });
        case actionTypes.AUTH_SUCCESS:
            return utility.updateObject(state, { error: null, loading: false, token: action.token, userId: action.userId });
        case actionTypes.AUTH_FAIL:
            return utility.updateObject(state, { error: action.error, loading: false });
        case actionTypes.AUTH_LOGOUT:
            return utility.updateObject(state, { token: null, userId: null });
        case actionTypes.SET_AUTH_REDIRECT:
            return utility.updateObject(state, { authRedirectPath: action.path })
        default:
            return state;
    }
}


export default reducer;