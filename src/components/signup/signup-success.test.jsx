import React from 'react';
import { render, screen } from '@testing-library/react';
import SignupSuccess from './signup-success';

test('should render signup success page', () => {
    render(
        <SignupSuccess />
    );

    const logoImage = screen.getByAltText('rakbank-simply-app');
    expect(logoImage).toBeInTheDocument();

    const successImage = screen.getByAltText('signup-successful');
    expect(successImage).toBeInTheDocument();

    expect(screen.getByText(/Successfully Submitted/i)).toBeInTheDocument();
    expect(screen.getByText(/Our representative will get in touch with you shortly/i)).toBeInTheDocument();
});
