# Certifications and Awards & Achievements: documentation

_Added 2026-11-19. Page: `HTML/resume.html` (below the PDF viewer). Styles: `css/credentials.css`._
Every fact below is copied from what the page already shows (which matches the resume PDF). Nothing is invented. "Evidence image" means a photo or scan of the certificate or award that will later open in the lightbox.

## Register
| Card id | Name | Issuer pill / text shown | Year(s) shown | Evidence image | Status |
|---|---|---|---|---|---|
| `cert-ccna` | CCNA | Pill "Cisco"; text "Cisco Certified Network Associate" | none shown | not yet | to be supplied by owner |
| `cert-ml-decision-trees` | Machine Learning with Python: Decision Trees | Pill "LinkedIn" | 2024 | not yet | to be supplied by owner |
| `cert-python-quick-start` | Python Quick Start | Pill "LinkedIn" | 2023 | not yet | to be supplied by owner |
| `award-ngee-ann` | Ngee Ann Kongsi Study Award | none | 2024, 2025 | not yet | to be supplied by owner |
| `award-edusave` | Edusave Award | none | 2019, 2024, 2026 | not yet | to be supplied by owner |
| `award-disciplinary-minds` | Disciplinary Minds Award | none | 2021 | not yet | to be supplied by owner |
| `award-colours` | Colours Award | none | 2019 | not yet | to be supplied by owner |
| `award-hackathon` | Third place, OCBC Ignite Hackathon | none; links to `data-storytelling-hackathon-school.html` | none shown | the hackathon page already has its own images | no evidence image planned |

Text shown on the award cards (unchanged): Ngee Ann "Recognition for outstanding academic performance and achievements."; Edusave "Achieved top 25% in academics."; Disciplinary Minds "Outstanding achievement in the Singapore-Cambridge GCE N-Level examination: achieved a score of 8 (5 being the best possible)."; Colours "Sporting excellence. Consecutive gold medallist, achieving top 14% nationwide across 70,000 athletes."

Not on the resume or page, so NOT shown anywhere: CCNA date, credential IDs, verification links, the issuing body of each award. Add them to this file first, then to the card, once you have the real documents.
Privacy: certificates often print a credential ID or personal details. Crop or blur anything you do not want public before adding an image.

## Current behaviour
- Cards are text only. There are no "View" buttons and no images yet (owner: "in the future").
- Each card has a stable `id` (first column) so a future button, a link such as `resume.html#award-colours`, or a script can target it.
- The jump chips ("Certifications", "Awards & Achievements") were removed on 2026-11-19. The section ids `#certifications` and `#awards` remain, so any existing links to them still work.
- Year pills under Awards now use the same colours as the issuer pills under Certifications (`--lilac` background, `--purple-deep` text).

## How to add the "View" button later (not implemented)
The site already has a lightbox (`JS/site.js`). It opens the `<img>` inside any `.zoomable` element, and steps through the images that share the nearest `[data-lightbox-group]`.
1. Save the image in a new folder such as `images/Credentials/` (about 1600 px wide is plenty).
2. Add a button inside the card, for example:
   ```html
   <button class="zoomable cred-view" aria-label="View certificate: CCNA">
     View
     <img src="../images/Credentials/ccna.jpg" alt="CCNA certificate" hidden />
   </button>
   ```
3. Style `.cred-view` in `css/credentials.css` (small pill button; reuse the `.cred-issuer` look).
4. Optional: put the buttons inside one wrapper with `data-lightbox-group` (e.g. on a section) if you want a separate set of images for that section. Without a wrapper, all `.zoomable` images on the page form one set (arrow keys move between them).
5. Fill in the Evidence image column above and add a line to the changelog.

Tested 2026-11-19 on a throwaway copy (not in the delivered site): two placeholder buttons in the markup above opened the lightbox, ArrowRight moved to the second image, Esc closed it. This needed one fix in `JS/site.js`: images with no `data-lightbox-group` wrapper used to be ignored, so the lightbox never opened for them. That is fixed in the delivered `JS/site.js`.
