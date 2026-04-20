import https from 'https';

const options = {
  hostname: 'gotruckster.com',
  path: '/food-truck/tacoly-moly',
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Accept': 'text/html'
  }
};

https.get(options, res => {
  let d = '';
  res.on('data', c => d+=c);
  res.on('end', () => console.log(d.match(/https:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png)/gi)));
});
