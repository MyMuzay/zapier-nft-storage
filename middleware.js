const includeApiKey = (request, z, bundle) => {
if (bundle.authData.api_key) {
    request.headers.Authorization = `Bearer ${bundle.authData.api_key}`;
}
return request;
};

const handleErrors = (response, z) => {
/* In some cases the lower levels of the code can provide more spcific error
    messages. If they set this flag in the request, then we should fall back
    to them to handle the errors.
*/
if (response.request.disableMiddlewareErrorChecking) {
    return response;
}
let responseJson;
try {
    responseJson = response.json;
} catch (e) {
    throw new Error('An unexpected error occurred.');
}

if (response.status !== 200) {
    if (responseJson.error && responseJson.error.message) {
    throw new z.errors.HaltedError(responseJson.error.message);
    } else {
    throw new Error('An unexpected error occurred. No error message received.');
    }
}
return response;
};

module.exports = {
    includeApiKey,
    handleErrors
};