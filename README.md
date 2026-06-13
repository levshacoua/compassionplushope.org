# Compassion Plus Hope

Static donation website for **Compassion Plus Hope**, a 501(c)(3) nonprofit serving
communities in Rwanda and Ukraine. Hosted free on **GitHub Pages** at
[compassionplushope.org](https://compassionplushope.org).

## Structure

```
index.html        Home — One Mission. Two Nations.
rwanda.html       Rwanda program page
ukraine.html      Ukraine program page
about.html        About — story, approach, team, FAQ, contact
ui-kit.html       Design system / component reference (noindex)
404.html          Not-found page
CNAME             Custom domain for GitHub Pages
assets/
  css/styles.css  Design system — tokens + every reusable component
  js/site.js      Shared header, footer, partner modal + behaviour
  img/            Photography
  icons/          SVG icons + reconstructed logo parts
```

No build step. Everything is plain HTML/CSS/JS — open `index.html` or serve the
folder with any static server.

## Design system first

All UI is built from one source of truth so components stay identical across pages:

- **`assets/css/styles.css`** — color/typography/spacing tokens (CSS variables)
  plus component classes: `.btn`, `.nav`, `.footer`, `.hero`, `.value`, `.tier`,
  `.feature`, `.info-card`, `.who`, `.story`, `.stat`, `.give-card`, `.faq`,
  `.modal`, `.field`, etc.
- **`assets/js/site.js`** — injects the shared navbar, footer and "Become a
  partner" modal into every page, so they are defined once.
- **`ui-kit.html`** — living styleguide that renders every token and component.

## Configuration

Open `assets/js/site.js` → `CONFIG`:

| Key            | Purpose                                                        |
| -------------- | ------------------------------------------------------------- |
| `paypal`       | Every **Donate** button / link points here.                   |
| `email`        | Contact address (`compassionplushope@gmail.com`).             |
| `web3formsKey` | Access key for the partner form. **Replace the placeholder.** |

### Wiring the "Become a partner" form

The form posts to [Web3Forms](https://web3forms.com) (free), which emails
submissions to `compassionplushope@gmail.com`:

1. Go to <https://web3forms.com>, enter **compassionplushope@gmail.com**.
2. Copy the **Access Key** sent to that inbox.
3. Paste it into `web3formsKey` in `assets/js/site.js`, commit & push.

Until a real key is set, the form shows a fallback asking visitors to email
directly — nothing breaks.

## Custom domain (Squarespace DNS)

The repo already contains a `CNAME` file with `compassionplushope.org` and the
Pages custom domain is set. In Squarespace **Domains → DNS Settings**:

1. **Delete the "Squarespace Defaults" preset** (trash icon). Its A records
   (`198.x`), the `www → ext-sq.squarespace.com` CNAME and the HTTPS record all
   point at Squarespace hosting and conflict with GitHub Pages.
2. (Optional) delete the "Squarespace Domain Connect" preset (`_domainconnect`).
3. Add these **custom records**:

```
Type   Host   Value
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153
CNAME  www    levshacoua.github.io
```

Optional IPv6 (AAAA, host `@`): `2606:50c0:8000::153`, `2606:50c0:8001::153`,
`2606:50c0:8002::153`, `2606:50c0:8003::153`.

> Keep any MX / TXT records if email is ever set up on this domain (none today —
> contact email is a Gmail address).

After propagation GitHub issues a certificate; then enable **Enforce HTTPS**
(Settings → Pages).

## Photography note

The current photos are placeholder/preview images exported from the Figma design
and carry **"Unsplash+" watermarks**. Replace the files in `assets/img/` with
licensed photography before going live.
