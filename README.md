# Frosty Delights Ice Cream Cafe

Full-stack web application for an Ice Cream Cafe built with a modern workflow.

## Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js + Express
- Database: PostgreSQL
- Version Control: Git
- Deployment Ready: environment-based configuration and CI/CD-friendly scripts

## Project Structure

```text
icecream-cafe/
|- frontend/
|  |- index.html
|  |- menu.html
|  |- about.html
|  |- contact.html
|  |- admin.html
|  |- css/
|  |- js/
|  `- images/
|- backend/
|  |- server.js
|  |- db.js
|  |- routes/
|  `- controllers/
|- database/
|  `- schema.sql
|- .env.example
|- package.json
`- README.md
```

## Features

- Responsive modern cafe design with pastel palette
- Home, Menu, About, Contact, and Admin pages
- REST API for flavor management
- Contact form submission API
- PostgreSQL schema with sample data
- Admin panel for add, edit, and delete operations
- Frontend fetches live menu data from backend
- Environment variables for database connection

## API

- `GET /api/flavors`
- `GET /api/flavors/:id`
- `POST /api/flavors`
- `PUT /api/flavors/:id`
- `DELETE /api/flavors/:id`
- `POST /api/contact`

## Run Locally

1. Install Node.js and PostgreSQL.
2. Create a PostgreSQL database.
3. Import `database/schema.sql`
4. Copy `.env.example` to `.env` and update values.
5. Run:

```bash
npm install
npm run dev
```

6. Open `http://localhost:3000`

## PostgreSQL Setup

```bash
psql -U postgres -d frosty_delights -f database/schema.sql
```

## Deployment Notes

- Set production environment variables for PostgreSQL
- Run `npm start`
- Serve through Render, Railway, or any Node-compatible host

## Repository

`https://github.com/mithrak2007/ice-cream-cafe-website`
