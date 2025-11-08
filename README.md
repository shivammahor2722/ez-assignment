# EZ Labs Assignment – Home Page + Contact Form

Tech: Next.js (App Router), TypeScript, Tailwind, Framer Motion

## Run
npm i
npm run dev

## Build
npm run build && npm run start

## Contact API
POST https://vernanbackend.ezlab.in/api/contact-us/
Body:
{
  "name": "Test user",
  "email": "testuser@gmail.com",
  "phone": "908765498",
  "message": "This is a message"
}

On success (200): UI shows “Form Submitted”.
