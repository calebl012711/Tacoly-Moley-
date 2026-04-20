import https from 'https';

const query = encodeURIComponent('authentic mexican street tacos');
const url = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${query}&vqd=4-177651080313835697368097103136585141209`;

const options = {
  hostname: 'duckduckgo.com',
  path: `/i.js?l=us-en&o=json&q=${query}&vqd=4-177651080313835697368097103136585141209`,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
    'Accept': 'application/json'
  }
};

https.get(options, res => {
  let d = '';
  res.on('data', c => d+=c);
  res.on('end', () => {
    try {
      const json = JSON.parse(d);
      json.results.slice(0, 15).forEach(r => console.log(r.image));
    } catch (e) {
      console.log('Error parsing JSON/or rate limited');
    }
  });
});
