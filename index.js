const authentication = require('./authentication');
const middleware = require('./middleware');
const listFiles = require('./triggers/list_files');
const createFile = require('./creates/create_file');
const deleteFile = require('./creates/delete_file');



const App = {
  version: require('./package.json').version, // eslint-disable-line global-require
  platformVersion: require('zapier-platform-core').version, // eslint-disable-line global-require

  authentication,

  beforeRequest: [middleware.includeApiKey],

  afterResponse: [middleware.handleErrors],

  resources: {},

  triggers: {
    [listFiles.key]: listFiles,
  },

  searches: {},

  creates: {
    [createFile.key]: createFile,
    [deleteFile.key]: deleteFile,
  },
};

module.exports = App;
