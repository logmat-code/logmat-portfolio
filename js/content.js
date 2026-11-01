/**
 * LOGMAT — Portfolio Content Configuration
 * ---------------------------------------------------------------------------
 * Centralized data store for Matías Agustín Delega (LOGMAT).
 *
 * All editable texts, verified games, streaming embeds, and contacts are
 * defined here.
 */

window.PORTFOLIO_CONTENT = {
  meta: {
    brand: "LOGMAT",
    author: "Matías Agustín Delega",
    role: "Independent Game Developer & Music Producer",
    location: "Buenos Aires, Argentina",
    canonicalUrl: "https://logmat-code.github.io/logmat-portfolio/"
  },

  hero: {
    title: "LOGMAT",
    subtitle: "Independent Game Developer & Music Producer",
    description:
      "I'm Matías Agustín Delega, an independent game developer and music producer based in Buenos Aires, Argentina. Here you'll find my games, music, and the work behind them.",
    actions: {
      primary: {
        label: "Explore Games",
        href: "#games"
      },
      secondary: {
        label: "Explore Music",
        href: "#music"
      }
    },
    featuredGameId: "cursed-harvest"
  },

  games: {
    sectionLabel: "01 // INTERACTIVE WORKS",
    heading: "Games",
    intro: "Explore my independent game projects and development work.",

    /**
     * Published & Jam Games (Public on itch.io)
     * NOTE: itch.io enforces Content-Security-Policy (frame-ancestors 'self' https://itch.io)
     * on public game pages. If a creator-authorized direct embed URL or standalone WebGL
     * build is provided in `play.embedBuildUrl`, the in-portfolio player will run it.
     * Otherwise, a functional "Play on itch.io ↗" button directs visitors cleanly to the game.
     */
    published: [
      {
        id: "cursed-harvest",
        code: "JAM-01",
        title: "Cursed Harvest",
        badge: "40th Place · Synty Spooky Jam 2026",
        badgeUrl: "https://itch.io/jam/synty-spooky-jam-oct26/results",
        badgeActionLabel: "View Jam Results",
        summary:
          "A folk-horror survivor roguelike with escalating enemy waves, cursed rituals, and persistent upgrades.",
        extendedDescription:
          "Fight through escalating waves of enemies, collect Cursed Seeds, survive dangerous Harvest rituals, and build your character both during each run and permanently through the Harvest Essence upgrade system across five distinct realms.",
        status: "Public / Jam Release",
        platform: "Browser / WebGL",
        jam: "Synty Spooky Jam — October 2026",
        jamResult: "40th Place (Community Choice)",
        engine: "Unity",
        thirdPartyAssetsNotice:
          "Built in Unity using stylized 3D environment and character assets from Synty Studios.",
        controls: [
          { key: "WASD", action: "Move character" },
          { key: "ESC", action: "Pause game" },
          { key: "Mouse", action: "Menus & UI interaction" },
          { key: "ENTER", action: "Confirm / Continue" }
        ],
        media: {
          coverImage: "assets/games/cursed-harvest-cover.png",
          coverAlt: "Cursed Harvest folk-horror survivor roguelike cover artwork",
          screenshots: [
            {
              src: "assets/games/cursed-harvest-screen-1.png",
              alt: "Cursed Harvest gameplay showing survivor combat and enemy wave",
              caption: "Arena combat with escalating enemy waves"
            },
            {
              src: "assets/games/cursed-harvest-screen-2.png",
              alt: "Cursed Harvest boss encounter and ritual mechanics",
              caption: "Boss encounter & harvest ritual"
            },
            {
              src: "assets/games/cursed-harvest-screen-3.png",
              alt: "Cursed Harvest upgrade progression interface",
              caption: "Harvest Essence meta-progression"
            }
          ]
        },
        play: {
          itchPageUrl: "https://logmat.itch.io/cursed-harvest",
          // Configured when creator-provided direct embed or local WebGL export is available:
          embedBuildUrl: ""
        }
      },
      {
        id: "my-shadow-quit",
        code: "JAM-02",
        title: "My Shadow Quit: The Last Flame",
        badge: "AI Browser Game Jam 5",
        badgeUrl: "https://itch.io/jam/ai-jam-5",
        badgeActionLabel: "View Jam Page",
        summary:
          "A dark fantasy puzzle-platformer where a wanderer and their living shadow work together through light and darkness.",
        extendedDescription:
          "Armed with a mysterious torch, navigate ancient ruins, manipulate light and darkness, overcome deadly obstacles, and uncover the secrets behind the world's last remaining flame across 50 levels in 5 worlds. Switch between wanderer and shadow, master their unique abilities, and discover that sometimes darkness is the only way forward.",
        status: "Public / Jam Release",
        platform: "Browser / WebGL",
        jam: "AI Browser Game Jam 5",
        jamResult: "Official Jam Entry",
        engine: "Unity",
        thirdPartyAssetsNotice:
          "Developed for AI Browser Game Jam 5 (Theme: TORCH) with AI-assisted tools and Unity.",
        controls: [
          { key: "A / D or Arrow Keys", action: "Move" },
          { key: "Space", action: "Jump" },
          { key: "Tab", action: "Switch Character (Wanderer / Shadow)" },
          { key: "Q", action: "Pick Up / Place Torch" },
          { key: "E", action: "Interact" },
          { key: "J", action: "Attack" },
          { key: "F", action: "Switch Weapon" },
          { key: "Esc", action: "Pause" }
        ],
        media: {
          coverImage: "assets/games/my-shadow-quit-cover.png",
          coverAlt: "My Shadow Quit: The Last Flame dark fantasy puzzle-platformer cover artwork",
          screenshots: [
            {
              src: "assets/games/my-shadow-quit-screen-1.png",
              alt: "My Shadow Quit puzzle platforming showing light and shadow duality",
              caption: "Manipulating torch light to navigate ruins"
            },
            {
              src: "assets/games/my-shadow-quit-screen-2.png",
              alt: "My Shadow Quit character switching and cooperative puzzle solving",
              caption: "Cooperative mechanics between wanderer and shadow"
            },
            {
              src: "assets/games/my-shadow-quit-screen-3.png",
              alt: "My Shadow Quit dark fantasy atmosphere and level progression",
              caption: "Environmental challenges and puzzle mechanics"
            }
          ]
        },
        play: {
          itchPageUrl: "https://logmat.itch.io/my-shadow-quit",
          embedBuildUrl: ""
        }
      }
    ],

    /**
     * Projects in Development (Strictly the 7 confirmed titles)
     * Descriptions reflect project concepts in English. Confirmed engines only.
     */
    inDevelopment: [
      {
        id: "1-percent-battery",
        code: "DEV-01",
        title: "1% Battery",
        status: "In Development",
        summary:
          "A mobile arcade runner built around quick sessions, readable obstacles, and responsive character feedback. Designed as a short, playable break from endless scrolling.",
        engine: "Unity"
      },
      {
        id: "gravity-switch",
        code: "DEV-02",
        title: "Gravity Switch",
        status: "In Development",
        summary:
          "A mobile arcade game built around a simple interaction: switching gravity. A focused control scheme turns movement and timing into the core challenge.",
        engine: "Unity"
      },
      {
        id: "the-floor-is-dying",
        code: "DEV-03",
        title: "The Floor Is Dying",
        status: "In Development",
        summary:
          "An independent Unity game project combining original audio production and visual asset development.",
        engine: "Unity"
      },
      {
        id: "the-last-train",
        code: "DEV-04",
        title: "The Last Train",
        status: "In Development",
        summary:
          "A mobile strategy game concept combining tower defense, deckbuilding, and roguelite progression around a moving train. Designed for portrait play, with resource management shaping each run.",
        engine: "Unity"
      },
      {
        id: "necromancers-deck",
        code: "DEV-05",
        title: "Necromancers Deck",
        status: "In Development",
        summary:
          "A card-based strategy project built around summons, creatures, and tactical combat. Development explores card interactions, enemy behavior, combat feedback, and progression.",
        engine: "Unity"
      },
      {
        id: "dont-follow-my-voice",
        code: "DEV-06",
        title: "Don’t Follow My Voice",
        status: "In Development",
        summary:
          "A first-person narrative horror game built around conflicting voice instructions, evidence-based puzzles, and consequential choices."
      },
      {
        id: "last-light",
        code: "DEV-07",
        title: "Last Light",
        status: "In Development",
        summary:
          "A first-person horror game set in an underground power station. Share a limited battery between your flashlight, which repels a stalking creature, and three terminals needed to unlock the escape elevator.",
        extendedDescription:
          "Designed for a 5–8 minute session, with exploration, energy management, and a final return to the elevator."
      }
    ]
  },

  music: {
    sectionLabel: "02 // SONIC OUTPUT",
    heading: "Music",
    intro:
      "Music by LOGMAT, combining rock, metal, industrial sounds, and synthesizers.",
    tagline:
      "Original electronic productions, heavy industrial textures, and hybrid analog composition.",

    // Dedicated streaming embeds with tab switching
    players: {
      spotify: {
        title: "Spotify Player",
        profileUrl: "https://open.spotify.com/artist/5Zq2V6HMOv0bzVRYX0ett6",
        profileLabel: "Open in Spotify",
        embedUrl:
          "https://open.spotify.com/embed/artist/5Zq2V6HMOv0bzVRYX0ett6?utm_source=generator&theme=0",
        height: 352
      },
      soundcloud: {
        title: "SoundCloud Player",
        profileUrl: "https://soundcloud.com/mat-rigozzi/tracks",
        profileLabel: "Open on SoundCloud",
        embedUrl:
          "https://w.soundcloud.com/player/?visual=false&url=https%3A%2F%2Fapi.soundcloud.com%2Fusers%2F83367280&show_artwork=true&color=%23ff4d00",
        height: 352
      }
    }
  },

  about: {
    sectionLabel: "03 // PROFILE",
    heading: "About",
    lead:
      "I’m Matías Agustín Delega, an independent game developer and music producer based in Buenos Aires, Argentina. I develop games and produce music as LOGMAT, combining interactive projects with audio production.",
    paragraphs: [
      "As LOGMAT, game development focuses on Unity game and level design, gameplay prototyping, and mobile and WebGL release workflows. Development pairs hands-on playtesting, manual QA, and regression reporting with AI-assisted development tools (Claude Code, Antigravity) and version control in GitHub.",
      "Audio work is backed by professional experience in independent music production, managing record labels (Butterfly Records, Reptile Sounds), and teaching Ableton Live, composition, sound design, mixing, and mastering."
    ],
    facts: [
      { label: "Name", value: "Matías Agustín Delega" },
      { label: "Brand", value: "LOGMAT" },
      { label: "Location", value: "Buenos Aires, Argentina" },
      { label: "Primary Engine", value: "Unity (Android & WebGL Releases)" },
      { label: "Audio Production", value: "Ableton Live (Sound Design, Mixing & Mastering)" },
      {
        label: "Education & Training",
        value:
          "Game Development with Unity (UGameStudios) · Advanced Music Production (ARJAUS) · Graphic Design (IAC)"
      }
    ],
    skills: [
      {
        category: "Game Development & Design",
        items: [
          "Unity",
          "Game & Level Design",
          "Gameplay Prototyping",
          "Mobile UI & Touch Controls",
          "Manual QA & Regression Reporting",
          "Android & WebGL Releases"
        ]
      },
      {
        category: "Music & Audio Production",
        items: [
          "Ableton Live",
          "Music Production",
          "Sound Design",
          "Mixing & Mastering",
          "Composition & Arrangement"
        ]
      },
      {
        category: "Tooling & Workflow",
        items: [
          "Git & GitHub",
          "AI-Assisted Dev (Claude Code, Antigravity)",
          "Graphic Design"
        ]
      }
    ]
  },

  contact: {
    sectionLabel: "04 // DIRECT CHANNELS",
    heading: "Contact",
    description:
      "Get in touch about game development opportunities, collaborations, or music production.",
    email: ["matiasrigozzi@gmail.com", "matr@btyrecords.com"],
    cvPath: "assets/docs/Matias_Agustin_Delega_CV_EN.pdf",
    cvLabel: "Download CV (PDF)",
    links: {
      github: "https://github.com/logmat-code",
      itchIo: "https://logmat.itch.io/",
      spotify: "https://open.spotify.com/artist/5Zq2V6HMOv0bzVRYX0ett6",
      soundcloud: "https://soundcloud.com/mat-rigozzi/tracks"
    }
  }
};
