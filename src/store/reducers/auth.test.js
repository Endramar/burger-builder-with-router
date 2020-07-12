import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';


describe('auth reducer test', () => {
    it('should return the initial state if action type is wrong', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    });

    it('should store token upon login' , () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        },{type : actionTypes.AUTH_SUCCESS , 
            token : 'some-token', 
            userId : 'some-user-id' })).toEqual({
                token: 'some-token',
                userId: 'some-user-id',
                error: null,
                loading: false,
                authRedirectPath: '/'
            })
    })
});