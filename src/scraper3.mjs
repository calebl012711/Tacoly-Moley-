import https from 'https';

const options = {
  hostname: 'html.duckduckgo.com',
  path: '/html/?q=Tacoly+Moly+Austin+food+truck+images',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    // console.log("Status: ", res.statusCode);
    const urls = [];
    const regex = /\/\/external-content\.duckduckgo\.com\/iu\/\?u=([^"'\\]+)/gi;
    let match;
    while ((match = regex.exec(data)) !== null) {
      urls.push(decodeURIComponent(match[1]));
    }
    const unique = [...new Set(urls)];
    unique.slice(0, 20).forEach(u => console.log(u));
  });
}).on('error', err => console.log(err));
