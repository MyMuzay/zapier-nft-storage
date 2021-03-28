const { API_BASE_URL } = require('../constants');
const sample = require('../samples/sample_file');
const FormData = require('form-data');
const request = require('request');

const perform = async (z, bundle) => {
  const { file, filename } = bundle.inputData;
  const formData = new FormData();

  // file will in fact be an url where the file data can be downloaded from
  // which we do via a stream created by NPM's request package
  // (form-data doesn't play nicely with z.request)
  formData.append('file', request(file), filename ? filename : 'zapier_file');

  const response = await z.request({
    method: 'POST',
    url: `${API_BASE_URL}/upload`,
    body: formData,
  });
  return {
    ...response.json.value,
    dweb: `https://${response.json.value.cid}.ipfs.dweb.link/${
      filename ? filename : 'zapier_file'
    }`,
  };
};

module.exports = {
  key: 'store_file',
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
      {
        key: 'filename',
        label: 'Filename',
      },
    ],
    sample,
  },
};
