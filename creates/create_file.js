const { API_BASE_URL } = require('../constants');
const sample = require('../samples/sample_file');
const FormData = require('form-data');
const request = require('request');
const { NFTStorage, Blob } = require('nft.storage');
const fetch = require('node-fetch');

const perform = async (z, bundle) => {
  // const formData = new FormData();

  // file will in fact be an url where the file data can be downloaded from
  // which we do via a stream created by NPM's request package
  // (form-data doesn't play nicely with z.request)
  // formData.append('file', request(bundle.inputData.file));
  // const data = z.request(bundle.inputData.file)
  // const upload = new Blob([data], {type: 'image/png'});

  let blob = await fetch(bundle.inputData.file).then(r => r.blob());

  const response = await z.request({
    method: 'POST',
    url: `${API_BASE_URL}/upload`,
    body: blob,
  });
  return {
    ...response.json.value,
    gateway_url: `https://gateway.pinata.cloud/ipfs/${response.json.value.cid}`,
  };
};

// const perform = async (z, bundle) => {
//   const store = new NFTStorage({ token: bundle.authData.api_key })

//   // const store = new NFTStorage({ endpoint, token })
//   const data = await z.request(bundle.inputData.file);
//   const cid = await store.storeBlob(new File([data.content], 'mymuzay'))
//   return {cid};
// };
/*
STORE BLOB - https://github.com/ipfs-shipyard/nft.storage/blob/main/client/src/lib.js
const request = await fetch(url.toString(), {
      method: 'POST',
      headers: NFTStorage.auth(token),
      body: blob,
    })
    const result = await request.json()
*/
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
