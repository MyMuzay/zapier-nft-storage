const { API_BASE_URL } = require('../constants');
const sample  = require('../samples/sample_file');

const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: `${API_BASE_URL}/upload`,
    body:{
      file: bundle.inputData.file
    },
  });
  return response.json.value ? response.json.value : response.json;
};

module.exports = {
  key: 'create_file',
  noun: 'File',

  display: {
    label: 'Store File',
    description: 'Stores a file in your NFT Storage account.',
  },

  operation: {
    perform,
    inputFields: [
        {
          key: 'file',
          type: 'file',
          label: 'File',
          required: true,
        },
      ],
    sample,
  },
};
