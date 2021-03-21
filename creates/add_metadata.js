const { API_BASE_URL } = require('../constants');
const sample = require('../samples/sample_file');

const buildBodyForUpload = async (z, bundle) => {
  const { name, description, cid, attributes, image } = bundle.inputData;

  // const image = `https://gateway.pinata.cloud/ipfs/${cid}`;

  z.console.log('attributes: ', attributes);

  const attArray = Object.keys(attributes).map(function(key, index) {
    return { trait_type: key, value: attributes[key] };
  });

  z.console.log('attArray: ', attArray);

  return {
    name,
    description,
    image,
    attributes: attArray,
  };
};

const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: `${API_BASE_URL}/upload`,
    body: await buildBodyForUpload(z, bundle),
  });
  return response.json.value ? response.json.value : response.json;
};

module.exports = {
  key: 'create_metadata',
  noun: 'Metadata',

  display: {
    label: 'Store Metadata',
    description: 'Stores a file with metadata to your NFT Storage account.',
  },

  operation: {
    perform,
    inputFields: [
      // {
      //   key: 'cid',
      //   label: 'IPFS CID',
      //   required: true,
      //   helpText: 'IPFS CID to the NFT content from the Store File Step',
      // },
      {
        key: 'image',
        label: 'Image',
        required: true,
        helpText: 'Link to Image',
      },
      {
        key: 'name',
        label: 'Name',
        required: true,
        helpText: 'NFT Name',
      },
      {
        key: 'description',
        label: 'Description',
        helpText: 'Description of the NFT',
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
