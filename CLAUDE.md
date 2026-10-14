# Clyde B. Jones Funeral Home website: Tech Nova build (PUBLIC repo)

This is the website for **Clyde B. Jones Funeral Home Co. Ltd.**, built by **Tech Nova Barbados Limited** (Juwan Prescod). It is a design preview on GitHub Pages, so the client can see the work.

**This repo is public.** Never commit prices, the proposal, client contact names, call notes, account details or real family details. Those live in the private repo **Technovabb/clydebjones-funeral-home** (its `docs/brief.md` has the full brief).

## STATUS: OFFLINE (14 Oct 2026)
- The client had not replied, so Juwan asked for the preview to be taken down and the code locked.
- `main` now holds only a holding page (`index.html`, copied to `404.html` so every old link shows it). It points people to Tech Nova (WhatsApp/phone (246) 230-8303, admin@technovabb.com).
- The full site is saved in commit `1b87e2f` ("Add Tech Nova watermark...").
- Juwan is making this repo **private** on GitHub.
- **To bring it back** (only when Juwan says so):
  1. `git log --oneline --grep "Take the preview offline"` to find the takedown commit.
  2. `git revert --no-edit <that commit>`.
  3. Check it in a browser, then push to the working branch and to `main`.
  4. If the repo is private on a free GitHub plan, Pages will not publish. Juwan must make it public again, or the org needs a paid plan.

## The client (public details only)
- Clyde B. Jones Funeral Home Co. Ltd., Top Rock, Christ Church, Barbados.
- Founded **1948**: three generations of the Jones family. They have their own limousine fleet and an on-site mortuary.
- Motto: "Where honour dwells and service excels."
- Phones:
  - Main: (246) 428-9332.
  - USA & Canada: (716) 262-2407.
  - After-hours and WhatsApp numbers: still to come from the client. They are marked TODO in the code.
- Their current site is clydebjonesfuneralhome.com (Wix).

## Design rules (from the Tech Nova concept, Sep 2026)
- Colour tokens are at the top of `assets/css/site.css`:
  - Client burgundy `#7a0f2e`.
  - Deep burgundy `#3d0a16` and `#2a0610`.
  - Cream `#fbf8f4`.
  - Gold labels: `#82602a` on light backgrounds (passes contrast), `#c9a465` on burgundy.
- Type: Cormorant Garamond for headings, Figtree for body text, at 18px or larger. (Figtree replaced Source Sans 3 in Oct 2026 so the site does not look like the Two Sons site.)
- Look: rounded cards and pill buttons, gold eyebrow labels with no rule line. Keep it different from the Two Sons and Sterling sites.
- **Phone first.** Call, WhatsApp, Tributes and Directions sit fixed at the bottom of every phone screen. The number is in the top bar of every page.
- Large text and strong contrast for older visitors. Keep the keyboard focus visible, and give every control a label.
- The CBJ logo in `assets/img/logo/` was taken from the client's current website (Oct 2026). Swap in their original file (SVG or high-res) when it arrives.

## Sitemap (8 sections)
- **Tributes (the core):**
  - Search by name, and browse by month.
  - Each tribute page has the service details, livestream and replay, condolence book, send flowers, share, and the programme download.
- **Arrange a Funeral:** when a death occurs, what to do first.
- **Services:**
  - Funeral planning.
  - Cremation.
  - Repatriation.
  - Burial at sea.
  - Livestream and photos.
  - Cars and limousine.
  - Headstones.
  - Memorial tokens.
  - Aftercare.
- **Caskets and Urns:** named photos, "ask about pricing".
- **Plan Ahead:** an online form and the Pre-Planning Guide PDF.
- **About Us:** our story since 1948, the team, facilities and fleet.
- **Resources:** FAQs, National Insurance, grief support, forms.
- **Contact:** tap to call, after-hours line, map and hours, contact form.

## How the site is built
- Page text: `src/pages/`. Shared blocks: `src/partials/`. Header, footer and phone bar: `tools/build.py`.
- Run `python3 tools/build.py` after any change, and commit `src/` and the built pages together.
- Never hand-edit a built `index.html`. The build overwrites it.
- Sample tribute data: `assets/js/tributes-sample.js`.
- All page text was drawn from the client's current site and their Pre-Planning & Bereavement Guide (PDF), rewritten in plain words. It is a draft for the family's approval.

## Homepage, top to bottom
All 10 sections from the concept are built: call and search, help now cards, recent tributes with email sign-up, services, our story and team, family overseas, plan ahead, a family's words, contact, footer.

## Rules
- **Sample tribute names only** ("Name of Loved One"). Don't use real tribute photos or obituaries until the client approves.
- Keep the "Design preview" note, `<meta name="robots" content="noindex, nofollow">` and `robots.txt` until launch.
- Juwan is dyslexic/ADHD, so write plain, short steps, one per line.
- Never create accounts, set passwords or buy anything. Ask before sending any email.
- GitHub Pages publishes every push to `main`. Check the page in a browser (desktop and phone width) before pushing.
