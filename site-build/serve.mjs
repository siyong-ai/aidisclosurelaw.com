import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'site');
const PORT = Number(process.env.PORT || 8788);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    let file = path.join(ROOT, url);

    try {
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
      if (!fs.existsSync(file) && fs.existsSync(file + '.html')) file += '.html';
      if (!fs.existsSync(file)) {
        res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
        res.end('<h1>404</h1><p><a href="/">Home</a></p>');
        return;
      }
      const ext = path.extname(file);
      res.writeHead(200, {
        'content-type': TYPES[ext] || 'application/octet-stream',
        'cache-control': 'no-store',
      });
      fs.createReadStream(file).pipe(res);
    } catch (e) {
      res.writeHead(500).end('error');
    }
  })
  .listen(PORT, '127.0.0.1', () => console.log(`serving ${ROOT} on http://localhost:${PORT}`));
