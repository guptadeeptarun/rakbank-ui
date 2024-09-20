const parseResponseAsJson = async (response) => {
    let responseBody = "";
    if (response.status == 200 || response.status == 400) {
        responseBody = await response.json();
    }
    return [response.status, responseBody];
}

export const signupUser = async (formData) => {

    const signupUrl = process.env.REACT_APP_API_BASE_URL + "/users";
    const response = await fetch(signupUrl, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-type': 'application/json'
        }
    });
    return await parseResponseAsJson(response);
}



