# Frost & Bloom Ice Cream Parlour Website

This project is a single-page ice cream parlour website built to match the SEC course requirement of showing the complete modern web development workflow.

## Requirement Check

1. Single page website with frontend, backend, and database
   - Frontend: `index.html`, `css/style.css`, `js/script.js`
   - Backend: `backend/get_menu.php`, `backend/contact.php`
   - Database: `backend/schema.sql`

2. Git account and source code in Git repository
   - Create a GitHub account if you do not already have one.
   - Push this folder to your repository: `https://github.com/mithrak2007/ice-cream-parlour-website.git`

3. Source code access for mentor review
   - Once pushed to GitHub, share the repository URL with your mentor.
   - GitHub itself is enough for source review.
   - If your department specifically asks for Bitbucket, you can mirror the same repository there too.

4. Hosting
   - Free options: GitHub Pages for frontend only, or InfinityFree / 000webhost / Render if you want backend support.
   - Paid hosting and custom domains are optional, not compulsory.

## How This Project Works

- The page loads menu items from `backend/get_menu.php`.
- The contact form sends data to `backend/contact.php`.
- PHP connects to MySQL using `backend/config.php`.
- SQL schema and sample records are included in `backend/schema.sql`.

## Local Setup

1. Install XAMPP, WAMP, or any PHP + MySQL stack.
2. Put this project in your web server directory or serve it locally.
3. Create a MySQL database by importing `backend/schema.sql`.
4. Update database credentials in `backend/config.php` if needed.
5. Open the site in your browser through the PHP server.

## Git Commands

```bash
git init
git add .
git commit -m "Build Frost & Bloom single-page ice cream website"
git branch -M main
git remote add origin https://github.com/mithrak2007/ice-cream-parlour-website.git
git push -u origin main
```

## What To Tell Your Mentor

- It is a responsive single-page website.
- The menu is designed to load dynamically from the backend.
- The contact form demonstrates data submission through the backend into MySQL.
- The repository is ready for GitHub review and can be deployed on a free or paid host.
