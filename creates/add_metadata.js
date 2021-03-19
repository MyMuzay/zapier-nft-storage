const { API_BASE_URL } = require('../constants');
const sample  = require('../samples/sample_file');

const getRandomInt = async (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const buildBodyForUpload = async (bundle) => {
  const { name, description, cid, user_address } = bundle.inputData;

    /* 2147483647 highest number that does not exceed 32 bits for the token ID.
    Rarible should have an API to generate this token ID soon */
  const external_url = `https://app.rarible.com/${user_address}:${getRandomInt(2147483647)}`;
  const image = `ipfs://${cid}`;

  return {
    name,
    description,
    image,
    external_url,
  };
};

const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'POST',
    url: `${API_BASE_URL}/upload`,
    body: await buildBodyForUpload(bundle),
  });
  return response.json.value ? response.json.value : response.json;
};

module.exports = {
  key: 'create_metadata',
  noun: 'Metadata',

  display: {
    label: 'Store Metadata (For Rarible)',
    description: 'Stores a file with metadata to your NFT Storage account.',
  },

  operation: {
    perform,
    inputFields: [
      {
        key: 'cid',
        label: 'IPFS CID',
        required: true,
        helpText: 'IPFS CID to the NFT content from the Store File Step',
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
        key: 'user_address',
        label: 'Creator\'s Wallet Address',
        helpText: 'Usually starts with `0x`',
      },
      ],
    sample,
  },
};
