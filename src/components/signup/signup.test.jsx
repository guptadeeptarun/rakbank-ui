import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Signup from '.'

import { useNavigate } from 'react-router-dom';
import { signupUser } from '../../httpUtil';
import { error, httpError } from '../../Notification/notificationSlice';

// configure mock redux store..
jest.mock('../../httpUtil');
const mockStore = configureStore([]);
const store = mockStore({});

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));


beforeEach(() => {
    jest.clearAllMocks();
});

test('should render signup form correctly', () => {
    render(
        <Provider store={store}>
            <Signup />
        </Provider>
    );

    const logoImage = screen.getByAltText('rakbank-simply-app');
    expect(logoImage).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText(/I agree with Terms and Privacy/i)).toBeInTheDocument();
});

test('signup button must be disabled when terms are not agreed', () => {
    render(
        <Provider store={store}>
            <Signup />
        </Provider>
    );
    expect(screen.getByText('SIGN UP')).toBeDisabled();
});

test('signup button must be enabled when terms are agreed', () => {
    render(
        <Provider store={store}>
            <Signup />
        </Provider>
    );
    fireEvent.click(screen.getByLabelText(/I agree with Terms and Privacy/i));
    expect(screen.getByText('SIGN UP')).toBeEnabled();
});

test('should give error for invalid password', async () => {
    const dispatch = jest.fn();
    store.dispatch = dispatch;

    render(
        <Provider store={store}>
            <Signup />
        </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Deep' } });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password@' } });
    fireEvent.click(screen.getByLabelText(/I agree with Terms and Privacy/i));
    fireEvent.click(screen.getByText('SIGN UP'));

    expect(dispatch).toHaveBeenCalledWith(error("Password can only have numbers or alphabets."));
});



test('should navigate to success screen when all fields correct', async () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    signupUser.mockResolvedValue([200, {}]);

    render(
        <Provider store={store}>
            <Signup />
        </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Deep' } });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password' } });
    fireEvent.click(screen.getByLabelText(/I agree with Terms and Privacy/i));
    fireEvent.click(screen.getByText('SIGN UP'));


    await waitFor(() => {
        expect(navigate).toHaveBeenCalledWith("/signup-success");
    });
});

it('should dispatch error when backend API gives HTTP 400 Bad Request', async () => {
    const dispatch = jest.fn();
    store.dispatch = dispatch;
    signupUser.mockResolvedValue([400, { errorMessage: "This email is already associated with another user" }]);

    render(
        <Provider store={store}>
            <Signup />
        </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Deep' } });
    fireEvent.change(screen.getByPlaceholderText('Email Address'), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'Password' } });
    fireEvent.click(screen.getByLabelText(/I agree with Terms and Privacy/i));
    fireEvent.click(screen.getByText('SIGN UP'));

    await waitFor(() => {
        expect(dispatch).toHaveBeenCalledWith(httpError([400, { errorMessage: "This email is already associated with another user" }]));
    });
});
