import { signupUser } from './httpUtil'


// Mock the fetch function
global.fetch = jest.fn();

afterEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
});


test('should successfully sign up a user', async () => {
    const mockResponse = { id: 1 };
    fetch.mockResolvedValueOnce({
        status: 200,
        json: jest.fn().mockResolvedValueOnce(mockResponse)
    });

    const formData = { fullName: 'Deep', password: 'password', email: 'test@gmail.com' };
    const [status, response] = await signupUser(formData);

    expect(status).toBe(200);
    expect(response).toEqual(mockResponse);
});

test('should return blank response body when http 404', async () => {
    const mockResponse = { errorMessage: 'This email address is already registered with another user' };
    fetch.mockResolvedValueOnce({
        status: 404
    });

    const formData = { fullName: 'Deep', password: 'password', email: 'test@gmail.com' };
    const [status, response] = await signupUser(formData);

    expect(status).toBe(404);
    expect(response).toBeNull;
});

