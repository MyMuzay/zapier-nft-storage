const { API_BASE_URL } = require('../constants');
const sample  = require('../samples/sample_file');

const perform = async (z) => {
  const response = await z.request({
    method: 'GET',
    url: `${API_BASE_URL}/`,
  });
  const files = response.json.value;
  files.map((file) => {
    file.id = file.cid;
    delete file.cid;
  });
  return files;
};

module.exports = {
  key: 'list_files',
  noun: 'File',

  display: {
    label: 'List Files',
    description: 'Lists your stored files.',
    hidden: true,
  },

  operation: {
    perform,
    sample,
  },
};
