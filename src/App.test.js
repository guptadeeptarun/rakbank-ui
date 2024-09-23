import { render, screen } from '@testing-library/react';
import App from './App';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);
const store = mockStore({});

test('should render signup page by default', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
});



