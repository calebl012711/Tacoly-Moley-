import https from 'https';

const options = {
  hostname: 'restaurantguru.com',
  path: '/Tacoly-Moly-By-Ygor-Austin',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/112.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    const urls = [];
    // Looking for images, RestaurantGuru actually uses their own CDN or direct urls.
    const regex = /https:\/\/[^"'\\]+\.(?:jpg|png|jpeg)/gi;
    let match;
    while ((match = regex.exec(data)) !== null) {
      if(!match[0].includes('emoji') && !match[0].includes('icon')) {
          urls.push(match[0]);
      }
    }
    const unique = [...new Set(urls)];
    unique.forEach(u => console.log(u));
  });
}).on('error', err => console.log(err));
