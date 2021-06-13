const https = require('https');

module.exports = {
  get: async (url) => {
    const uri = new URL(url);
    // eslint-disable-next-line no-shadow
    return new Promise((resolve, reject) => {
      https.get(uri, (res) => {
        const chunks = [];
        res.on('data', (chunk) => {
          chunks.push(chunk);
        });
        res.on('end', () => {
          const body = Buffer.concat(chunks);
          resolve(JSON.parse(body.toString()));
        });
        res.on('error', (error) => {
          reject(error);
        });
      });
    });
  },
};
