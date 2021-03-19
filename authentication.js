const { API_BASE_URL } = require('./constants');

const testAuth = async (z) => {
  const response = await z.request({
    method: 'GET',
    url: `${API_BASE_URL}/`,
    disableMiddlewareErrorChecking: true,
  });

  if (response.status !== 200) {
    throw new Error('Your API Key is invalid. Please try again.');
  }
  return response.json;
};

module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'api_key',
      label: 'API Key',
      required: true,
      type: 'string',
      helpText:
        'Visit your [manage API Keys](https://nft.storage/manage) to generate your API Key.',
    },
  ],
  test: testAuth,
};
