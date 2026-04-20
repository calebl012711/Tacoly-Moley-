import https from 'https';
https.get('https://wanderlog.com/place/details/15755851/tacoly-moly-by-ygor', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const urls = [];
    const regex = /https:\/\/[^"'\\]+\.(?:jpg|png|jpeg)/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      urls.push(match[0]);
    }
    const unique = [...new Set(urls)];
    unique.forEach(u => console.log(u));
  });
}).on('error', err => console.log(err));
