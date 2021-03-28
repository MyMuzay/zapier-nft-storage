const { API_BASE_URL } = require('../constants');
const sample = require('../samples/sample_file');

const buildBodyForUpload = async bundle => {
  const { name, description, cid, attributes, external_url } = bundle.inputData;

  const image = `https://${cid}.ipfs.dweb.link`;

  const attArray = Object.keys(attributes).map(function(key, index) {
    return { trait_type: key, value: attributes[key] };
  });

  return {
    name,
    description,
    image,
    external_url,
    attributes: attArray,
  };
};

const perform = async (z, bundle) => {
  const body = await buildBodyForUpload(bundle);

  const response = await z.request({
    method: 'POST',
    url: `${API_BASE_URL}/upload`,
    body,
  });
  return {
    ...response.json.value,
    dweb: `https://${response.json.value.cid}.ipfs.dweb.link`,
  };
};

module.exports = {
  key: 'store_metadata',
  noun: 'Metadata',

  display: {
    label: 'Store Metadata',
    description: 'Stores a metadata file to your NFT Storage account.',
  },

  operation: {
    perform,
    inputFields: [
      {
        key: 'cid',
        label: 'IPFS CID',
        required: true,
        helpText: 'IPFS CID to the NFT content.',
      },
      {
        key: 'name',
        label: 'Name',
        required: true,
        helpText: 'Name of the NFT.',
      },
      {
        key: 'description',
        label: 'Description',
        helpText: 'Description of the NFT.',
      },
      {
        key: 'external_url',
        label: 'External URL',
        helpText: 'URL for where the original item lives.',
      },
      {
        key: 'attributes',
        dict: true,
        label: 'Attributes',
        helpText: 'List of details for the NFT.',
      },
    ],
    sample,
  },
};
