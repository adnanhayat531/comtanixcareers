# Comtanix website

Career-focused website for Comtanix (BPO and IT company). Plain HTML, CSS and JavaScript, no build step.

## Run it
- Double-click `index.html`, or
- In Cursor install the "Live Server" extension and click "Go Live", or
- Run `npx serve .` in this folder.

## Files
- `index.html` all pages (hash routing: #/home, #/services, #/about/story, #/careers, #/team, #/apply, #/contact)
- `css/style.css` styles and color variables
- `js/main.js` CONFIG, data and behavior
- `assets/logo.png` logo

## Edit first (top of `js/main.js`, object `CONFIG`)
1. `whatsapp` and `whatsappShow` (real number, country code, no +)
2. `address`, `mapQuery`, `hours`
3. `email`, `careersEmail`
4. `socials` (your real page links; empty ones are hidden)
5. `officePhoto` (put your photo in `assets/`, then use `assets/office.jpg`)
6. `formEndpoint` (optional: Formspree or your own API so CVs arrive by email)

Also replace the sample testimonials (`TESTI`), footprint numbers (`data-n` in index.html), roles (Careers page) and story text.

## Deploy
Upload the folder to Netlify, Vercel, GitHub Pages or any hosting.

## Prompts to try in Cursor
- "Set my WhatsApp number to 923XXXXXXXXX and address to ... in CONFIG."
- "Add a department filter on the Careers page."
- "Make the hero more impressive for US clients without changing the colors."
