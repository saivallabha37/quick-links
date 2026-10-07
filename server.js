/**
 * =====================================================
 * QUICK LINKS — LOCAL DEVELOPMENT SERVER
 * Serves static files and mounts /api/assistant
 * Zero external npm dependencies required!
 * =====================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Manually parse .env file if present
function loadEnv() {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        try {
            const content = fs.readFileSync(envPath, 'utf8');
            content.split('\n').forEach(line => {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
                    const idx = trimmed.indexOf('=');
                    const key = trimmed.slice(0, idx).trim();
                    const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
                    if (!process.env[key]) {
                        process.env[key] = val;
                    }
                }
            });
            console.log('✓ Loaded .env file');
        } catch (e) {
            console.warn('Could not parse .env file:', e.message);
        }
    }
}

loadEnv();

const handler = require('./api/assistant');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=UTF-8'
};

const server = http.createServer(async (req, res) => {
    // API route handling
    const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = urlObj.pathname;

    if (pathname === '/api/assistant' || pathname === '/api/assistant.js') {
        try {
            await handler(req, res);
        } catch (err) {
            console.error('API Error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Internal server error' }));
        }
        return;
    }

    // Static file serving
    // Redirect /assistant to /assistant/ so relative links resolve correctly
    if (pathname === '/assistant') {
        res.writeHead(301, { Location: '/assistant/' });
        res.end();
        return;
    }

    let filePath = path.join(__dirname, pathname);

    // If root or directory, serve index.html
    if (pathname === '/' || pathname === '') {
        filePath = path.join(__dirname, 'index.html');
    } else if (pathname === '/assistant/') {
        filePath = path.join(__dirname, 'assistant', 'index.html');
    }

    // Check if directory exists with index.html
    try {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }
    } catch (e) {
        // File might not exist
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html; charset=UTF-8');
                res.end(`<h1>404 Not Found</h1><p>Path ${pathname} does not exist.</p><a href="/">← Return to Toolbox</a>`);
            } else {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', contentType);
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`\n=====================================================`);
    console.log(`⚡ Quick Links & AI Build Assistant Server running at:`);
    console.log(`   http://localhost:${PORT}`);
    console.log(`   Toolbox:   http://localhost:${PORT}/`);
    console.log(`   Assistant: http://localhost:${PORT}/assistant`);
    console.log(`   API:       http://localhost:${PORT}/api/assistant`);
    console.log(`=====================================================\n`);
});

