import https from 'https';

const options = {
  hostname: 'html.duckduckgo.com',
  path: '/html/?q=Tacoly+Moly+by+Ygor+Austin+tacos+food',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
};

https.get(options, res => {
  let d = '';
  res.on('data', c => d+=c);
  res.on('end', () => {
    // extract external image proxy urls and decode them
    const urls = [];
    const regex = /\/\/external-content\.duckduckgo\.com\/iu\/\?u=([^"'\s&]+)/gi;
    let match;
    while ((match = regex.exec(d)) !== null) {
      const decoded = decodeURIComponent(match[1]);
      if(decoded.match(/\.(jpeg|jpg|png|webp)/i)) urls.push(decoded);
    }
    const unique = [...new Set(urls)].filter(u => !u.includes('logo') && !u.includes('avatar'));
    unique.slice(0, 50).forEach(u => console.log(u));
  });
});
