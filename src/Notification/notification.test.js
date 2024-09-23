import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import NotificationReducer from './notificationSlice';
import Notification from '.';
import { toast } from 'react-toastify';

// Mock the toast function from react-toastify
jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
    ToastContainer: () => <div>ToastContainer</div>,
}));

beforeEach(() => {
    jest.clearAllMocks();
});

test('should toast with error message', () => {

    const initialState = {
        notification: {
            type: 'error',
            payload: 'Password must only contain numbers or alphabets'
        },
    };

    const store = createStore(NotificationReducer, initialState);

    render(
        <Provider store={store}>
            <Notification />
        </Provider>
    );


    expect(toast.error).toHaveBeenCalledWith('Password must only contain numbers or alphabets');
});

test('should toast with success message', () => {

    const initialState = {
        notification: {
            type: 'success',
            payload: 'Signup successful'
        },
    };

    const store = createStore(NotificationReducer, initialState);

    render(
        <Provider store={store}>
            <Notification />
        </Provider>
    );


    expect(toast.success).toHaveBeenCalledWith('Signup successful');
});

test('should toast with error when http error message', () => {

    const initialState = {
        notification: {
            type: 'httpError',
            payload: [400, { errorMessage: 'This email is already associated with another user' }]
        },
    };

    const store = createStore(NotificationReducer, initialState);

    render(
        <Provider store={store}>
            <Notification />
        </Provider>
    );


    expect(toast.error).toHaveBeenCalledWith('This email is already associated with another user');
});


