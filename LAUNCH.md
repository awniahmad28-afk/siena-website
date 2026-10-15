# Launch checklist — siena-solutions.com

Things to do when the website goes live on the real domain. Tick them off as they are done.

## Website
- [ ] Have a native Arabic speaker and a native Kurdish (Sorani) speaker read `/ar/` and `/ku/` once and send corrections (text lives in `content/locales/ar.ts` and `ku.ts`).
- [ ] Set `SITE.url` in `content/site.ts` to `https://siena-solutions.com` (it is `https://example.com` until launch).
- [ ] Remove the `/siena-website` base path from the GitHub Pages build (`NEXT_PUBLIC_BASE_PATH` in `.github/workflows/deploy-pages.yml`), since the site will live at the root of the domain.
- [ ] Add the custom domain again in GitHub → Settings → Pages, with DNS pointing to GitHub Pages, and turn on "Enforce HTTPS".
- [x] Location added to the footer (Naz Naz, Erbil, Iraq — in all three languages).
- [ ] Link the footer address to the Google Maps listing once the Google Business Profile is verified (send the listing's Share link).
- [ ] Add the social media links (`SITE.social`).
- [ ] Check https://siena-solutions.com/sitemap.xml and /robots.txt show the real domain (they follow `SITE.url` automatically).
- [ ] Add the site to Google Search Console (search.google.com/search-console), verify the domain, and submit `sitemap.xml`.
- [ ] Send one test enquiry through the contact form on the live domain and check it arrives at contact@siena-solutions.com (the form uses FormSubmit; it is already activated).

## Email: stop replies landing in customers' spam
Replies are sent by the email provider for contact@siena-solutions.com, so the domain must prove its emails are genuine.
In the domain's DNS settings (where the domain was bought), add:
- [ ] **SPF**: TXT record, value given by the email provider.
- [ ] **DKIM**: TXT/CNAME record, generated in the email provider's admin panel ("Authenticate email" / "DKIM").
- [ ] **DMARC**: TXT record, host `_dmarc`, value `v=DMARC1; p=none; rua=mailto:contact@siena-solutions.com`
- [ ] Wait a few hours (up to 48), then test at mail-tester.com: send an email to the address it shows and aim for 9/10 or more.
- [ ] For the first weeks: ask early customers to mark the email "not spam" and reply to it; keep replies plain (few links/images).
