# haroonriasat.com

Personal resume page for Haroon Riasat: a single static `index.html` (no build step) plus a one-page PDF.

- **Live:** https://haroonriasat.com (once the domain is connected)
- **AI resume assistant:** https://ask.haroonriasat.com ([source](https://github.com/HaroonRiasat1/resume-chatbot))

## Files

- `index.html`: the page. Light and dark mode, mobile layout, and print styles.
- `Haroon_Riasat_Resume.pdf`: the downloadable one-page resume, without a phone number since the page is public.

## Run locally

```bash
python3 -m http.server 5195
```

Then open http://localhost:5195.

## Deploy

Import this repo in Vercel as a static site (no framework, no build command) and add `haroonriasat.com` under Settings → Domains.
