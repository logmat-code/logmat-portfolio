# Content Needed to Complete the LOGMAT Portfolio

This checklist tracks verified real-world data and media files for `js/content.js` and `assets/`.
Completed items are marked with `[x]`, and remaining optional or pending items are marked with `[ ]`.

---

## 1. Verified Contact & Official Channels (`contact` in `js/content.js`)

- [x] **Professional Emails** (`contact.email`): `matiasrigozzi@gmail.com` and `matr@btyrecords.com` configured with `mailto:` links.
- [x] **itch.io Profile** (`contact.links.itchIo`): `https://logmat.itch.io/`
- [x] **GitHub Profile** (`contact.links.github`): `https://github.com/logmat-code`
- [x] **Spotify Artist Profile** (`contact.links.spotify` & `music.players.spotify`): `https://open.spotify.com/artist/5Zq2V6HMOv0bzVRYX0ett6`
- [x] **SoundCloud Profile** (`contact.links.soundcloud` & `music.players.soundcloud`): `https://soundcloud.com/mat-rigozzi/tracks`
- [x] **Curriculum Vitae** (`contact.cvPath`): `assets/docs/Matias_Agustin_Delega_CV_EN.pdf` with button `"Download CV (PDF)"`.
- [ ] **Optional Additional Channels**:
  - [ ] LinkedIn profile URL (when confirmed)
  - [ ] YouTube channel (when confirmed)
  - [ ] Bandcamp profile (when confirmed)

---

## 2. Published & Game Jam Games (`games.published` in `js/content.js`)

Both published jam games feature real covers, verified controls, jam awards/badges, and functional "Play on itch.io ↗" buttons.

### 2.1 Cursed Harvest
- [x] **Official Jam**: Synty Spooky Jam — October 2026.
- [x] **Official Jam Ranking**: 40th Place (Community Choice, Score: 2.465, 10 ratings).
- [x] **Badge**: `"40th Place · Synty Spooky Jam 2026"` with link to `"View Jam Results"` (`https://itch.io/jam/synty-spooky-jam-oct26/results`).
- [x] **Third-Party Asset Notice**: Built in Unity using stylized 3D environment and character assets from Synty Studios.
- [x] **Platform**: Browser / WebGL.
- [x] **Play Integration**: Functional `"Play on itch.io ↗"` action directing users to the official playable page.
- [x] **Local Assets**:
  - `assets/games/cursed-harvest-cover.png`
  - `assets/games/cursed-harvest-screen-1.png`
  - `assets/games/cursed-harvest-screen-2.png`
  - `assets/games/cursed-harvest-screen-3.png`
- [x] **Verified Controls**: WASD (Move), ESC (Pause), Mouse (UI), ENTER (Confirm).

### 2.2 My Shadow Quit: The Last Flame
- [x] **Official Jam**: AI Browser Game Jam 5 (Theme: Torch).
- [x] **Badge**: `"AI Browser Game Jam 5"` with link to `"View Jam Page"` (`https://itch.io/jam/ai-jam-5`).
- [x] **Platform**: Browser / WebGL.
- [x] **Play Integration**: Functional `"Play on itch.io ↗"` action directing users to the official playable page.
- [x] **Local Assets**:
  - `assets/games/my-shadow-quit-cover.png`
  - `assets/games/my-shadow-quit-screen-1.png`
  - `assets/games/my-shadow-quit-screen-2.png`
  - `assets/games/my-shadow-quit-screen-3.png`
- [x] **Verified Controls**: A/D or Arrow Keys (Move), Space (Jump), Tab (Switch Wanderer / Shadow), Q (Torch), E (Interact), J (Attack), F (Weapon), Esc (Pause).

---

## 3. Projects In Development (`games.inDevelopment` in `js/content.js`)

Secondary section strictly featuring the 7 confirmed in-development titles. Excluded projects: TrackDoctor, Tower Drop, Don’t Fall, ONE SECOND, El salto del moco. No fake mechanics, dates, progress bars, or redundant modal buttons.

1. [x] **1% Battery** (`DEV-01`): Verified English concept summary configured. Engine: Unity.
2. [x] **Gravity Switch** (`DEV-02`): Verified English concept summary configured. Engine: Unity.
3. [x] **The Floor Is Dying** (`DEV-03`): Verified English concept summary configured. Engine: Unity. (Cross-referenced with CV: original audio and visual asset work).
4. [x] **The Last Train** (`DEV-04`): Verified English concept summary configured (mechanics presented as planned design concepts). Engine: Unity.
5. [x] **Necromancers Deck** (`DEV-05`): Exact title preserved. Verified English concept summary configured. Engine: Unity.
6. [x] **Don’t Follow My Voice** (`DEV-06`): Verified English concept summary configured. No unverified engines or tools added.
7. [x] **Last Light** (`DEV-07`): Verified English concept summary and extended session scope configured. First-person horror in an underground power station with limited battery flashlight mechanics. Status: In Development.

---

## 4. Music Streaming Console (`music` in `js/content.js`)

- [x] **Spotify Integration**: Embedded player (`5Zq2V6HMOv0bzVRYX0ett6`), height 352px, lazy-loaded with zero autoplay.
- [x] **SoundCloud Integration**: Embedded player (`users/83367280`), height 352px, lazy-loaded with zero autoplay.
- [x] **Dual Tab Switcher**: Accessible tablist with dynamic profile links (`"Open in Spotify ↗"` / `"Open on SoundCloud ↗"`).
- [x] **Identity Copy**: `"Music by LOGMAT, combining rock, metal, industrial sounds, and synthesizers."`

---

## 5. Profile & CV-Backed Core Skills (`about` in `js/content.js`)

- [x] **Verified Presentation**: `"I’m Matías Agustín Delega, an independent game developer and music producer based in Buenos Aires, Argentina. I develop games and produce music as LOGMAT, combining interactive projects with audio production."`
- [x] **Distinguished Experience**: Separate paragraphs distinguishing Unity game design, playtesting, QA and release workflows from music label management (Butterfly Records, Reptile Sounds) and Ableton Live instruction.
- [x] **Strictly Verified Skills**: Unity, Game & Level Design, Gameplay Prototyping, Mobile UI & Touch Controls, Manual QA & Regression Reporting, Android & WebGL Releases, Ableton Live, Music Production, Sound Design, Mixing & Mastering, Composition & Arrangement, Git & GitHub, AI-Assisted Dev, Graphic Design.
- [x] **Verified Education**: Game Development with Unity (UGameStudios), Advanced Music Production (ARJAUS), Graphic Design (IAC).
- [x] **CV Links**: Download buttons available in both About specifications and Contact direct channels.

---

## 6. Visual Identity & Background

- [x] **Industrial Gothic Texture** (`assets/logmat-bg-texture.svg`): Original vector-filtered metallic and ink texture created specifically for LOGMAT. Monochromatic palette (#07080a, charcoal, weathered steel, silver highlights) with eroded steel plates, brutalist structural cuts, acid wash, and film micro-grain. Strictly NO text, logos, or figures.
- [x] **High Visibility & Perceptibility**: Lightened CSS body tint overlay (`rgba(7, 8, 10, 0.12)` to `0.55`) so texture is crisp and distinctly visible at 100% normal scale without requiring excessive brightness, while preserving WCAG AA contrast.
- [x] **Featured Artwork Preserved**: `Cursed Harvest` cover rendered with `object-fit: contain` and dedicated frame breathing room; 100% of the artwork (including the pumpkin head and pickaxe) visible without clipping.
- [x] **Balanced Hero Viewport**: Reduced top padding and removed excessive vertical centering min-height, ensuring main actions and featured release are immediately visible above the fold on standard desktop viewports.
- [x] **Section Scroll Offsets**: Sticky header offset configured via `scroll-margin-top: calc(var(--header-height) + 1.5rem)` across all sections.
