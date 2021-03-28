const authentication = require('./authentication');
const middleware = require('./middleware');

const newFile = require('./triggers/new_file');
const storeFile = require('./creates/store_file');
const storeMetadata = require('./creates/store_metadata');
const deleteFile = require('./creates/delete_file');

const App = {
  version: require('./package.json').version, // eslint-disable-line global-require
  platformVersion: require('zapier-platform-core').version, // eslint-disable-line global-require

  authentication,

  beforeRequest: [middleware.includeApiKey],

  afterResponse: [middleware.handleErrors],

  resources: {},

  triggers: {
    [newFile.key]: newFile,
  },

  searches: {},

  creates: {
    [storeFile.key]: storeFile,
    [storeMetadata.key]: storeMetadata,
    [deleteFile.key]: deleteFile,
  },
};

module.exports = App;
