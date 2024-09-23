import notificationReducer, { error, success, httpError } from './notificationSlice'; // Adjust the path as needed

describe('notificationSlice', () => {
    const initialState = {
        type: '',
        payload: '',
        id: expect.any(Number),
    };

    test('should update state correcly for error action', () => {
        const action = error('Password can only have numbers or alphabets.');
        const state = notificationReducer(initialState, action);

        expect(state).toEqual({
            type: 'error',
            payload: 'Password can only have numbers or alphabets.',
            id: expect.any(Number),
        });
    });

    test('should update state correctly for success action', () => {
        const action = success('Signup Successful');
        const state = notificationReducer(initialState, action);

        expect(state).toEqual({
            type: 'success',
            payload: 'Signup Successful',
            id: expect.any(Number),
        });
    });

    test('should update state correctly for httpError action', () => {
        const action = httpError([400, { errorMessage: "This email is already associated with another user" }]);
        const state = notificationReducer(initialState, action);

        expect(state).toEqual({
            type: 'httpError',
            payload: [400, { errorMessage: "This email is already associated with another user" }],
            id: expect.any(Number),
        });
    });
});
