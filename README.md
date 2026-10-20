# Clyde B. Jones Funeral Home website (design preview)

The new website for Clyde B. Jones Funeral Home Co. Ltd., Top Rock, Christ Church, Barbados. It is built by Tech Nova Barbados.

**This repo is public.** It holds only the website. Client notes, the proposal and prices are kept in Tech Nova's private repo.

- Plain HTML, CSS and a little JavaScript. No framework and no server.
- Hosted free on GitHub Pages as a preview, so the client can see the design.
- Every page shows a "Design preview" note, and tells Google not to list it (`noindex` and `robots.txt`).

## How the pages are made

The page text lives in `src/`. A small script builds the finished pages from it.

1. Edit a page in `src/pages/` (for example `src/pages/about.html`).
2. The header, menu, footer and phone bar for every page are in `tools/build.py`.
3. Shared blocks (service cards, contact cards, forms) are in `src/partials/`.
4. Build the pages:

```
python3 tools/build.py
```

5. Commit both `src/` and the built pages (`index.html`, `about/`, `services/` and so on).

Do not edit the built `index.html` files by hand. The next build overwrites them.

## Look at it on your laptop

From this folder:

```
npx serve .
```

Then open the address it prints.

## Pages
- Home: all 10 sections from the concept.
- Tributes: search by name, browse by month, flower request. Plus a sample tribute page with service details, add to calendar, livestream, condolence book, flowers and share buttons.
- Arrange a Funeral: when a death occurs, what to do first, what we take care of.
- Services: an overview, plus a page for each of the 9 services.
- Caskets & Urns, Plan Ahead, About Us, Resources, Contact.

## Still to come from the client
These show as yellow notes on the pages, and `TODO` comments in the code.
- After-hours number and WhatsApp number.
- The CBJ logo file.
- Photos: fleet, founder, team, caskets and urns, memorial tokens.
- Casket and urn model names.
- The current team list.
- Which memorial tokens they offer.
- Permission to name the family in the testimonial.

## Rules
- Tribute names are samples only ("Name of Loved One").
- Forms do not send anything yet. They show a "design preview" message.
