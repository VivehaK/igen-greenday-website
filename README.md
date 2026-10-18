# IGEN GREENDAY 2026 website

A responsive full-stack website built with HTML, CSS, vanilla JavaScript, Node.js and Express. The content is based on the supplied IGEN GREENDAY 2026 document.

## Requirements
- Node.js 18 or newer
- Internet connection for Google Fonts (optional; the site has fallback fonts)

## Run locally
1. Extract the ZIP.
2. Open a terminal in the project folder.
3. Run `npm install`
4. Run `npm start`
5. Open `http://localhost:3000`

## Backend endpoints
- `GET /api/health` — backend health check
- `GET /api/stats` — registration counts
- `POST /api/register` — validates and stores a registration

Registration submissions are saved in `data/registrations.json`. This JSON-file storage is suitable for a demo/local project, not production use with multiple server instances. For production, use a database, HTTPS, spam protection/rate limiting, privacy notice, and restricted admin access.

## Before publishing
The supplied document has placeholders for the organisation registration and certification nomination forms. Add the official links when provided by the IGEN team. The registration form currently records interest on this website; it does not submit to an official IGEN registration system.

## Deploy
Deploy to a Node.js host that supports persistent storage, or replace JSON storage with PostgreSQL/MongoDB before using a serverless host. Set `PORT` if required by your host.
