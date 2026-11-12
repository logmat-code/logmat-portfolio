# LOGMAT — Portfolio Website

Official portfolio of **LOGMAT**, personal brand of **Matías Agustín Delega** — independent game developer and music producer based in Buenos Aires, Argentina.

Built with semantic HTML5, modern CSS, and vanilla JavaScript. No build step, bundler, or backend required.

---

## Visual Direction & Architecture

- **Aesthetic**: Dark, editorial, industrial aesthetic influenced by heavy metal, gothic artwork, and music gig posters.
- **Color Palette**: Deep Charcoal/Black (`#07080a`), Off-White (`#f2f3f5`), and a single controlled Signal Orange accent (`#ff4d00`).
- **Custom Texture**: Original SVG background texture (`assets/logmat-bg-texture.svg`) combining eroded steel plates, noise filters, gothic structural slashes, and dark ink wash.
- **Typography**:
  - Headings: `Barlow Condensed` (Bold, condensed display typeface).
  - Body & Reading: `Inter` (Legible sans-serif).
  - Technical Data & Metadata: `JetBrains Mono` (Monospaced specs and tags).
- **Game Integrations**:
  - Published jam games (`Cursed Harvest` and `My Shadow Quit`) feature verified cover art, controls, and direct `"Play on itch.io ↗"` actions.
  - Native `<dialog id="game-player-dialog">` component supports interaction-based loading, fullscreen, and automatic resource cleanup on exit whenever a direct build embed URL is configured.
- **Audio Center**: Dual-tab streaming player for **Spotify** and **SoundCloud** with on-demand loading, responsive layout, and zero autoplay.
- **In Development**: Disciplined, compact presentation of the 7 confirmed titles without artificial buttons or filler text.

---

## Project Structure

```text
.
├── index.html          # Semantic HTML document & accessibility structure
├── css/
│   └── styles.css      # Dark industrial design system, responsive styles & modals
├── js/
│   ├── content.js      # Central data source for games, music, about & contact
│   └── main.js         # DOM renderer, dialog controllers & audio tab switching
├── assets/
│   ├── favicon.svg     # LOGMAT monogram mark
│   ├── logmat-bg-texture.svg # Original industrial gothic background texture
│   ├── games/          # Real cover art and high-resolution screenshots
│   │   ├── cursed-harvest-cover.png
│   │   ├── cursed-harvest-screen-[1..3].png
│   │   ├── my-shadow-quit-cover.png
│   │   ├── my-shadow-quit-screen-[1..3].png
│   │   ├── 1-percent-battery-cover.png
│   │   ├── 1-percent-battery-screen-[1..2].png
│   │   ├── gravity-switch-cover.png
│   │   └── gravity-switch-screen-[1..2].png
│   └── docs/           # CV document
│       └── Matias_Agustin_Delega_CV_EN.pdf
├── CONTENT_NEEDED.md   # Tracking document for verified project data
├── README.md           # Documentation for maintenance and publishing
└── .nojekyll           # Prevents Jekyll processing on GitHub Pages
```

---

## 1. Local Preview

Run a lightweight static HTTP server from the project directory:

```bash
# Using Python 3 (macOS built-in)
python3 -m http.server 8080
```

Open `http://localhost:8080` in your web browser.

---

## 2. Content Configuration (`js/content.js`)

All texts, games, music embeds, and contact details are managed in `js/content.js`.

### 2.1 Published & Official Releases (`games.published`)
- `Cursed Harvest`: Released on Android (Google Play) & Browser (itch.io WebGL, 40th Place Synty Spooky Jam 2026).
- `My Shadow Quit: The Last Flame`: AI Browser Game Jam 5 (Theme: Torch, WebGL).
- `1% Battery`: Mobile arcade runner published on Google Play (`com.logmat.onepercentbattery`).
- `Gravity Switch`: Mobile arcade runner published on Google Play (`com.logmat.gravityswitch`).
- Direct external links to Google Play and itch.io are displayed by default. If you configure a direct embed build URL in `play.embedBuildUrl`, the "Play Here" in-portfolio modal button activates automatically for browser builds.

### 2.2 Projects in Development (`games.inDevelopment`)
Secondary section strictly featuring the 8 confirmed in-development titles:
1. `The Floor Is Dying` (DEV-01)
2. `The Last Train` (DEV-02)
3. `Necromancers Deck` (DEV-03)
4. `Don’t Follow My Voice` (DEV-04)
5. `Last Light` (DEV-05)
6. `Memory Ghost` (DEV-06)
7. `Flesh Circuit` (DEV-07)
8. `Recoil Express` (DEV-08)

### 2.3 Streaming Music (`music`)
- `music.players.spotify`: Spotify artist embed code (`5Zq2V6HMOv0bzVRYX0ett6`).
- `music.players.soundcloud`: SoundCloud widget embed (`users/83367280`).

### 2.4 Curriculum Vitae (`contact.cvPath`)
Points to `assets/docs/Matias_Agustin_Delega_CV_EN.pdf`.
