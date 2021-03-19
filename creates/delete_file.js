const { API_BASE_URL } = require('../constants');

const perform = async (z, bundle) => {
  const response = await z.request({
    method: 'DELETE',
    url: `${API_BASE_URL}/${bundle.inputData.fileCid}`,
  });
  return response.json;
};

module.exports = {
  key: 'delete_file',
  noun: 'File',

  display: {
    label: 'Delete File',
    description: 'Deletes a stored files on your NFT Storage account.',
  },

  operation: {
    perform,
    inputFields: [
        {
          key: 'fileCid',
          label: 'File',
          dynamic: 'list_files.id.pin__name',
          required: true,
          helpText: 'Current list of stored files on your account.',
        },
        {
            key: 'copy',
            type: 'copy',
            label: 'copy',
            helpText: 'Stop storing the content with the passed CID on nft.storage. This does not remove the content from the network, such as any established Filecoin deals or other IPFS nodes in the network that have already pinned this file.',
        },
      ],
    sample: {
        ok: true
      },
  },
};
