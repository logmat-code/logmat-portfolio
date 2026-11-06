/**
 * LOGMAT — Main Frontend Controller
 * ---------------------------------------------------------------------------
 * Renders portfolio content from window.PORTFOLIO_CONTENT and manages
 * accessible navigation, native <dialog> sheets, playable itch.io embeds,
 * and streaming audio consoles.
 */

(function () {
  "use strict";

  const content = window.PORTFOLIO_CONTENT;
  if (!content) {
    console.error("PORTFOLIO_CONTENT is missing. Check js/content.js.");
    return;
  }

  /* ------------------------------------------------------------------------
     Helpers & Validators
     ------------------------------------------------------------------------ */

  function isNonEmptyString(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  function isValidUrl(value) {
    if (!isNonEmptyString(value)) return false;
    const trimmed = value.trim();
    return (
      trimmed.startsWith("https://") ||
      trimmed.startsWith("http://") ||
      trimmed.startsWith("mailto:")
    );
  }

  function isValidRelativeAsset(value) {
    if (!isNonEmptyString(value)) return false;
    const trimmed = value.trim();
    return !trimmed.startsWith("javascript:") && !trimmed.startsWith("data:");
  }

  function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (typeof text === "string") el.textContent = text;
    return el;
  }

  const PLATFORM_LABELS = {
    googlePlay: "Google Play",
    playStore: "Google Play",
    itchIo: "itch.io",
    github: "GitHub",
    gameplay: "Gameplay Video",
    linkedin: "LinkedIn",
    spotify: "Spotify",
    bandcamp: "Bandcamp",
    soundcloud: "SoundCloud",
    youtube: "YouTube",
    appleMusic: "Apple Music"
  };

  function getValidLinks(linksObj) {
    if (!linksObj || typeof linksObj !== "object") return [];
    return Object.entries(linksObj)
      .filter(([, url]) => isValidUrl(url))
      .map(([key, url]) => ({
        key,
        label: PLATFORM_LABELS[key] || key,
        url: url.trim()
      }));
  }

  /* ------------------------------------------------------------------------
     1. Hero Section & Featured Showcase Card
     ------------------------------------------------------------------------ */

  function renderHero() {
    const hero = content.hero;
    if (!hero) return;

    const titleEl = document.getElementById("main-title");
    const subtitleEl = document.getElementById("hero-subtitle");
    const descEl = document.getElementById("hero-description");
    const primaryBtn = document.getElementById("hero-cta-primary");
    const secondaryBtn = document.getElementById("hero-cta-secondary");

    if (titleEl && isNonEmptyString(hero.title)) {
      titleEl.textContent = hero.title;
    }
    if (subtitleEl && isNonEmptyString(hero.subtitle)) {
      subtitleEl.textContent = hero.subtitle;
    }
    if (descEl && isNonEmptyString(hero.description)) {
      descEl.textContent = hero.description;
    }

    if (primaryBtn && hero.actions?.primary) {
      const span = primaryBtn.querySelector("span");
      if (span && isNonEmptyString(hero.actions.primary.label)) {
        span.textContent = hero.actions.primary.label;
      }
      if (isNonEmptyString(hero.actions.primary.href)) {
        primaryBtn.setAttribute("href", hero.actions.primary.href);
      }
    }

    if (secondaryBtn && hero.actions?.secondary) {
      const span = secondaryBtn.querySelector("span");
      if (span && isNonEmptyString(hero.actions.secondary.label)) {
        span.textContent = hero.actions.secondary.label;
      }
      if (isNonEmptyString(hero.actions.secondary.href)) {
        secondaryBtn.setAttribute("href", hero.actions.secondary.href);
      }
    }

    // Connect Featured Project Actions
    const featuredId = hero.featuredGameId || "cursed-harvest";
    const publishedGames = Array.isArray(content.games?.published)
      ? content.games.published
      : [];
    const featuredGame =
      publishedGames.find((g) => g.id === featuredId) || publishedGames[0];

    if (featuredGame) {
      const primaryActionEl = document.getElementById("featured-primary-action");
      if (primaryActionEl) {
        if (isNonEmptyString(featuredGame.play?.embedBuildUrl)) {
          // If a direct playable embed build is configured
          primaryActionEl.setAttribute("href", "#");
          primaryActionEl.removeAttribute("target");
          primaryActionEl.removeAttribute("rel");
          primaryActionEl.innerHTML = `<span>Play Here</span> <span class="play-icon" aria-hidden="true">▶</span>`;
          primaryActionEl.addEventListener("click", (e) => {
            e.preventDefault();
            openPlayableGameDialog(featuredGame);
          });
        } else if (isNonEmptyString(featuredGame.play?.googlePlayUrl)) {
          primaryActionEl.setAttribute("href", featuredGame.play.googlePlayUrl);
          primaryActionEl.setAttribute("target", "_blank");
          primaryActionEl.setAttribute("rel", "noopener noreferrer");
          primaryActionEl.innerHTML = `<span>Get it on Google Play</span> <span aria-hidden="true">↗</span>`;
        } else {
          // itch.io enforces CSP frame-ancestors; direct link opens game on itch.io
          primaryActionEl.setAttribute("href", featuredGame.play?.itchPageUrl || "https://logmat.itch.io/");
          primaryActionEl.setAttribute("target", "_blank");
          primaryActionEl.setAttribute("rel", "noopener noreferrer");
          primaryActionEl.innerHTML = `<span>Play on itch.io</span> <span aria-hidden="true">↗</span>`;
        }
      }

      const inspectBtn = document.querySelector(".btn-inspect-featured");
      if (inspectBtn) {
        inspectBtn.addEventListener("click", () => {
          openGameSheetDialog(featuredGame);
        });
      }
    }
  }

  /* ------------------------------------------------------------------------
     2. Games Section (Published Jam Games + Projects In Development)
     ------------------------------------------------------------------------ */

  function renderGames() {
    const gamesData = content.games;
    if (!gamesData) return;

    const labelEl = document.getElementById("games-label");
    const headingEl = document.getElementById("games-heading");
    const introEl = document.getElementById("games-intro");

    if (labelEl && isNonEmptyString(gamesData.sectionLabel)) {
      labelEl.textContent = gamesData.sectionLabel;
    }
    if (headingEl && isNonEmptyString(gamesData.heading)) {
      headingEl.textContent = gamesData.heading;
    }
    if (introEl && isNonEmptyString(gamesData.intro)) {
      introEl.textContent = gamesData.intro;
    }

    // 2.1 Render Published & Jam Games
    const publishedGrid = document.getElementById("games-published-grid");
    const publishedGames = Array.isArray(gamesData.published)
      ? gamesData.published
      : [];

    if (publishedGrid) {
      publishedGrid.replaceChildren();

      publishedGames.forEach((game) => {
        const card = createEl("article", "game-showcase-card");
        card.setAttribute("role", "listitem");
        if (isNonEmptyString(game.id)) {
          card.id = `project-${game.id}`;
        }

        // Showcase Media Frame
        const mediaWrap = createEl("div", "showcase-media");
        if (isValidRelativeAsset(game.media?.coverImage)) {
          const img = document.createElement("img");
          img.src = game.media.coverImage.trim();
          img.alt = isNonEmptyString(game.media?.coverAlt)
            ? game.media.coverAlt.trim()
            : `${game.title} cover artwork`;
          img.width = 640;
          img.height = 360;
          img.loading = "lazy";
          mediaWrap.appendChild(img);
        }

        if (isNonEmptyString(game.badge)) {
          const badge = createEl("span", "showcase-badge-pill", game.badge);
          mediaWrap.appendChild(badge);
        }

        // Showcase Body
        const body = createEl("div", "showcase-body");

        const metaRow = createEl("div", "showcase-meta-row");
        metaRow.append(
          createEl("span", "mono-tag", game.code || "JAM"),
          createEl("span", "status-badge", game.platform || "Browser / WebGL")
        );
        body.appendChild(metaRow);

        const titleEl = createEl("h3", "showcase-title", game.title);
        body.appendChild(titleEl);

        if (isNonEmptyString(game.summary)) {
          body.appendChild(createEl("p", "showcase-summary", game.summary));
        }

        // Specs summary list
        const specsDl = createEl("dl", "showcase-specs-list");

        if (isNonEmptyString(game.jam)) {
          const row = createEl("div", "showcase-spec-item");
          row.append(
            createEl("dt", "", "Event"),
            createEl("dd", "", game.jam)
          );
          specsDl.appendChild(row);
        }

        if (isNonEmptyString(game.engine)) {
          const row = createEl("div", "showcase-spec-item");
          row.append(
            createEl("dt", "", "Engine"),
            createEl("dd", "", game.engine)
          );
          specsDl.appendChild(row);
        }

        if (isNonEmptyString(game.platform)) {
          const row = createEl("div", "showcase-spec-item");
          row.append(
            createEl("dt", "", "Platform"),
            createEl("dd", "", game.platform)
          );
          specsDl.appendChild(row);
        }

        body.appendChild(specsDl);

        // Footer Actions: Play button + Details button
        const footer = createEl("div", "showcase-footer");
        const actionsWrap = createEl("div", "showcase-footer-actions");

        if (isNonEmptyString(game.play?.embedBuildUrl)) {
          // Play Here in-portfolio modal button
          const playBtn = createEl("button", "btn btn-primary");
          playBtn.type = "button";
          playBtn.setAttribute("data-play-game", game.id);
          playBtn.setAttribute("aria-label", `Play ${game.title} inside portfolio`);
          playBtn.innerHTML = `<span>Play Here</span> <span class="play-icon" aria-hidden="true">▶</span>`;
          playBtn.addEventListener("click", () => {
            openPlayableGameDialog(game);
          });
          actionsWrap.appendChild(playBtn);
        } else if (isNonEmptyString(game.play?.googlePlayUrl)) {
          // Google Play external store button
          const playStoreBtn = createEl("a", "btn btn-primary btn-google-play");
          playStoreBtn.href = game.play.googlePlayUrl;
          playStoreBtn.target = "_blank";
          playStoreBtn.rel = "noopener noreferrer";
          playStoreBtn.setAttribute("aria-label", `Get ${game.title} on Google Play`);
          playStoreBtn.innerHTML = `<span>Get it on Google Play</span> <span aria-hidden="true">↗</span>`;
          actionsWrap.appendChild(playStoreBtn);
        } else {
          // itch.io external play button
          const itchBtn = createEl("a", "btn btn-primary");
          itchBtn.href = game.play?.itchPageUrl || "https://logmat.itch.io/";
          itchBtn.target = "_blank";
          itchBtn.rel = "noopener noreferrer";
          itchBtn.setAttribute("aria-label", `Play ${game.title} on itch.io`);
          itchBtn.innerHTML = `<span>Play on itch.io</span> <span aria-hidden="true">↗</span>`;
          actionsWrap.appendChild(itchBtn);
        }

        const detailsBtn = createEl("button", "btn btn-secondary");
        detailsBtn.type = "button";
        detailsBtn.setAttribute("data-inspect-game", game.id);
        detailsBtn.setAttribute("aria-label", `View specifications for ${game.title}`);
        detailsBtn.innerHTML = `<span>Details</span>`;
        detailsBtn.addEventListener("click", () => {
          openGameSheetDialog(game);
        });
        actionsWrap.appendChild(detailsBtn);

        footer.appendChild(actionsWrap);
        card.append(mediaWrap, body, footer);
        publishedGrid.appendChild(card);
      });
    }

    // 2.2 Render In-Development Games (Strictly the 7 confirmed titles)
    const devGrid = document.getElementById("games-dev-grid");
    const devProjects = Array.isArray(gamesData.inDevelopment)
      ? gamesData.inDevelopment
      : [];

    if (devGrid) {
      devGrid.replaceChildren();

      devProjects.forEach((proj) => {
        const card = createEl("article", "game-dev-card");
        card.setAttribute("role", "listitem");
        if (isNonEmptyString(proj.id)) {
          card.id = `project-${proj.id}`;
        }

        // Header: Code (DEV-0X) + Status Pill
        const header = createEl("div", "dev-card-header");
        header.append(
          createEl("span", "mono-tag", proj.code || "DEV"),
          createEl("span", "dev-status-pill", proj.status || "In Development")
        );

        // Content: Title + Concept Summary
        const contentWrap = createEl("div", "dev-card-content");
        contentWrap.appendChild(createEl("h4", "dev-card-title", proj.title));

        if (isNonEmptyString(proj.summary)) {
          contentWrap.appendChild(
            createEl("p", "dev-card-summary", proj.summary)
          );
        } else {
          const pendingEl = createEl(
            "p",
            "dev-card-summary dev-card-pending",
            "Concept description pending confirmation."
          );
          contentWrap.appendChild(pendingEl);
        }

        // Footer / Meta: Confirmed Engine (if verified)
        const footer = createEl("div", "dev-card-footer");
        if (isNonEmptyString(proj.engine)) {
          const tagRow = createEl("div", "dev-tag-row");
          tagRow.appendChild(createEl("span", "tech-tag", proj.engine));
          footer.appendChild(tagRow);
        }

        card.append(header, contentWrap, footer);
        devGrid.appendChild(card);
      });
    }
  }

  /* ------------------------------------------------------------------------
     3. Playable Game Modal Dialog (<dialog id="game-player-dialog">)
     Loads iframe on demand; destroys immediately on close.
     ------------------------------------------------------------------------ */

  const playerDialog = document.getElementById("game-player-dialog");
  const playerTitle = document.getElementById("player-game-title");
  const playerPlatform = document.getElementById("player-game-platform");
  const playerItchLink = document.getElementById("player-itch-link");
  const playerFullscreenBtn = document.getElementById("player-fullscreen-btn");
  const playerCloseBtn = document.getElementById("player-close-btn");
  const playerStage = document.getElementById("player-stage-container");
  const playerControlsBanner = document.getElementById("player-controls-banner");

  function openPlayableGameDialog(game) {
    if (!playerDialog || !game) return;

    // Reset previous instance
    if (playerStage) {
      playerStage.replaceChildren();
    }

    if (playerTitle) {
      playerTitle.textContent = game.title;
    }

    if (playerPlatform) {
      playerPlatform.textContent = `${game.platform || "WebGL / Browser"} · ${game.jam || "Official Jam Build"}`;
    }

    if (playerItchLink) {
      if (isNonEmptyString(game.play?.itchPageUrl)) {
        playerItchLink.href = game.play.itchPageUrl;
        playerItchLink.hidden = false;
      } else {
        playerItchLink.hidden = true;
      }
    }

    // Populate Controls Banner
    if (playerControlsBanner) {
      playerControlsBanner.replaceChildren();

      const bannerTitle = createEl("span", "mono-tag-accent", "CONTROLS //");
      playerControlsBanner.appendChild(bannerTitle);

      if (Array.isArray(game.controls) && game.controls.length > 0) {
        game.controls.forEach((c) => {
          const pair = createEl("div", "ctrl-pair");
          const kbd = createEl("span", "kbd-badge", c.key);
          const act = createEl("span", "ctrl-action", c.action);
          pair.append(kbd, act);
          playerControlsBanner.appendChild(pair);
        });
      } else {
        playerControlsBanner.appendChild(
          createEl("span", "mono-note", "Desktop keyboard & mouse required.")
        );
      }
    }

    // Inject iframe dynamically
    if (playerStage && game.play && isNonEmptyString(game.play.embedBuildUrl)) {
      const iframe = document.createElement("iframe");
      iframe.src = game.play.embedBuildUrl;
      iframe.title = `${game.title} Playable WebGL Game`;
      iframe.loading = "eager";
      iframe.setAttribute(
        "allow",
        "autoplay; fullscreen; gamepad; focus-without-user-activation *"
      );
      iframe.setAttribute("allowfullscreen", "true");
      playerStage.appendChild(iframe);
    }

    playerDialog.showModal();
  }

  function setupPlayerDialog() {
    if (!playerDialog) return;

    if (playerCloseBtn) {
      playerCloseBtn.addEventListener("click", () => {
        playerDialog.close();
      });
    }

    // Clean up iframe completely when dialog closes (stops audio, frees WebGL context)
    playerDialog.addEventListener("close", () => {
      if (playerStage) {
        playerStage.replaceChildren();
      }
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Fullscreen toggle handler
    if (playerFullscreenBtn && playerStage) {
      playerFullscreenBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
          if (playerStage.requestFullscreen) {
            playerStage.requestFullscreen().catch(() => {});
          } else if (playerDialog.requestFullscreen) {
            playerDialog.requestFullscreen().catch(() => {});
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
          }
        }
      });
    }

    // Backdrop click fallback for browsers without native closedby="any"
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      playerDialog.addEventListener("click", (event) => {
        if (event.target !== playerDialog) return;
        const rect = playerDialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        playerDialog.close();
      });
    }
  }

  /* ------------------------------------------------------------------------
     4. Project Details & Technical Sheet Dialog (<dialog id="game-sheet-dialog">)
     ------------------------------------------------------------------------ */

  const sheetDialog = document.getElementById("game-sheet-dialog");

  function openGameSheetDialog(item) {
    if (!sheetDialog || !item) return;

    const codeEl = document.getElementById("dialog-project-code");
    const statusEl = document.getElementById("dialog-project-status");
    const bodyEl = document.getElementById("dialog-project-body");

    if (codeEl) {
      codeEl.textContent = isNonEmptyString(item.code) ? item.code : "PROJECT";
    }

    if (statusEl) {
      if (isNonEmptyString(item.status)) {
        statusEl.textContent = item.status;
        statusEl.hidden = false;
      } else {
        statusEl.textContent = "";
        statusEl.hidden = true;
      }
    }

    if (bodyEl) {
      bodyEl.replaceChildren();

      // Heading
      const titleEl = createEl("h2", "dialog-title", item.title);
      titleEl.id = "dialog-project-title";
      bodyEl.appendChild(titleEl);

      // Summary
      if (isNonEmptyString(item.summary)) {
        bodyEl.appendChild(createEl("p", "dialog-summary", item.summary));
      }

      // Extended Description
      if (isNonEmptyString(item.extendedDescription)) {
        const extP = createEl("p", "dialog-extended-desc", item.extendedDescription);
        bodyEl.appendChild(extP);
      }

      // Jam Result / Badge Banner
      if (isNonEmptyString(item.badge)) {
        const badgeBox = createEl("div", "dialog-notice-box");
        badgeBox.innerHTML = `<strong>Result:</strong> ${item.badge}`;
        if (isNonEmptyString(item.badgeUrl)) {
          const jamLink = createEl(
            "a",
            "btn btn-secondary btn-sm",
            item.badgeActionLabel || "View Jam Page"
          );
          jamLink.href = item.badgeUrl;
          jamLink.target = "_blank";
          jamLink.rel = "noopener noreferrer";
          jamLink.style.marginLeft = "1rem";
          badgeBox.appendChild(jamLink);
        }
        bodyEl.appendChild(badgeBox);
      }

      // Third-party Assets Notice
      if (isNonEmptyString(item.thirdPartyAssetsNotice)) {
        const noticeBox = createEl("div", "dialog-notice-box");
        noticeBox.innerHTML = `<strong>Asset Disclosure:</strong> ${item.thirdPartyAssetsNotice}`;
        bodyEl.appendChild(noticeBox);
      }

      // Specifications Grid
      const specsDl = createEl("dl", "dialog-specs-grid");
      const specsEntries = [
        { label: "Title", value: item.title },
        { label: "Developer", value: "Matías Agustín Delega (LOGMAT)" },
        { label: "Status", value: item.status },
        { label: "Platform", value: item.platform },
        { label: "Engine", value: item.engine || (Array.isArray(item.tools) ? item.tools.join(", ") : "") },
        { label: "Role", value: item.role || "Developer & Sound Producer" },
        { label: "Jam Event", value: item.jam }
      ];

      specsEntries.forEach((entry) => {
        if (!isNonEmptyString(entry.value)) return;
        const wrap = createEl("div", "dialog-spec-item");
        wrap.append(
          createEl("dt", "", entry.label),
          createEl("dd", "", entry.value)
        );
        specsDl.appendChild(wrap);
      });
      bodyEl.appendChild(specsDl);

      // Controls Table
      if (Array.isArray(item.controls) && item.controls.length > 0) {
        const ctrlSection = createEl("div", "dialog-section-block");
        ctrlSection.appendChild(
          createEl("h3", "dialog-section-heading", "Input & Controls")
        );

        const table = createEl("table", "dialog-controls-table");
        table.innerHTML = `
          <thead>
            <tr>
              <th scope="col">Key / Input</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            ${item.controls
              .map(
                (c) =>
                  `<tr><td><code>${c.key}</code></td><td>${c.action}</td></tr>`
              )
              .join("")}
          </tbody>
        `;
        ctrlSection.appendChild(table);
        bodyEl.appendChild(ctrlSection);
      }

      // Screenshots Gallery
      const screenshots = Array.isArray(item.media?.screenshots)
        ? item.media.screenshots.filter((s) => isValidRelativeAsset(s?.src))
        : [];

      if (screenshots.length > 0) {
        const gallerySection = createEl("div", "dialog-section-block");
        gallerySection.appendChild(
          createEl("h3", "dialog-section-heading", "Verified Screenshots")
        );

        const grid = createEl("div", "dialog-screenshots-grid");
        screenshots.forEach((shot) => {
          const fig = createEl("figure", "dialog-screenshot-figure");
          const img = document.createElement("img");
          img.src = shot.src.trim();
          img.alt = isNonEmptyString(shot.alt)
            ? shot.alt.trim()
            : `${item.title} gameplay capture`;
          img.width = 1280;
          img.height = 720;
          img.loading = "lazy";
          fig.appendChild(img);

          if (isNonEmptyString(shot.caption)) {
            fig.appendChild(createEl("figcaption", "", shot.caption));
          }
          grid.appendChild(fig);
        });

        gallerySection.appendChild(grid);
        bodyEl.appendChild(gallerySection);
      }

      // Verified Links
      const links = [];
      if (isNonEmptyString(item.play?.googlePlayUrl)) {
        links.push({
          label: "Get it on Google Play",
          url: item.play.googlePlayUrl
        });
      }
      if (isNonEmptyString(item.play?.itchPageUrl)) {
        links.push({
          label: "Play on itch.io",
          url: item.play.itchPageUrl
        });
      }
      if (isNonEmptyString(item.badgeUrl)) {
        links.push({
          label: item.badgeActionLabel || "Jam Results",
          url: item.badgeUrl
        });
      }

      if (links.length > 0) {
        const linksSection = createEl("div", "dialog-section-block");
        linksSection.appendChild(
          createEl("h3", "dialog-section-heading", "Verified Links")
        );
        const btnGroup = createEl("div", "hero-actions");
        links.forEach((l, idx) => {
          const a = createEl(
            "a",
            idx === 0 ? "btn btn-primary" : "btn btn-secondary",
            l.label
          );
          a.href = l.url;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          btnGroup.appendChild(a);
        });
        linksSection.appendChild(btnGroup);
        bodyEl.appendChild(linksSection);
      }
    }

    sheetDialog.showModal();
  }

  function setupSheetDialog() {
    if (!sheetDialog) return;

    if (!("closedBy" in HTMLDialogElement.prototype)) {
      sheetDialog.addEventListener("click", (event) => {
        if (event.target !== sheetDialog) return;
        const rect = sheetDialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        sheetDialog.close();
      });
    }

    sheetDialog.addEventListener("close", () => {
      const bodyEl = document.getElementById("dialog-project-body");
      if (bodyEl) {
        bodyEl.querySelectorAll("video").forEach((v) => v.pause());
        bodyEl.querySelectorAll("iframe").forEach((f) => f.remove());
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. Music Section (Streaming Console & Tabs)
     ------------------------------------------------------------------------ */

  function renderMusic() {
    const musicData = content.music;
    if (!musicData) return;

    const labelEl = document.getElementById("music-label");
    const headingEl = document.getElementById("music-heading");
    const introEl = document.getElementById("music-intro");

    if (labelEl && isNonEmptyString(musicData.sectionLabel)) {
      labelEl.textContent = musicData.sectionLabel;
    }
    if (headingEl && isNonEmptyString(musicData.heading)) {
      headingEl.textContent = musicData.heading;
    }
    if (introEl && isNonEmptyString(musicData.intro)) {
      introEl.textContent = musicData.intro;
    }

    // Music Tabs: Spotify / SoundCloud switcher
    const tabSpotify = document.getElementById("tab-spotify");
    const tabSoundcloud = document.getElementById("tab-soundcloud");
    const panelSpotify = document.getElementById("panel-spotify");
    const panelSoundcloud = document.getElementById("panel-soundcloud");
    const extLink = document.getElementById("active-player-external-link");

    const spotifyProfile =
      musicData.players?.spotify?.profileUrl ||
      "https://open.spotify.com/artist/5Zq2V6HMOv0bzVRYX0ett6";
    const soundcloudProfile =
      musicData.players?.soundcloud?.profileUrl ||
      "https://soundcloud.com/mat-rigozzi/tracks";

    function selectTab(target) {
      if (target === "spotify") {
        if (tabSpotify) {
          tabSpotify.classList.add("is-active");
          tabSpotify.setAttribute("aria-selected", "true");
        }
        if (tabSoundcloud) {
          tabSoundcloud.classList.remove("is-active");
          tabSoundcloud.setAttribute("aria-selected", "false");
        }
        if (panelSpotify) {
          panelSpotify.classList.add("is-active");
          panelSpotify.hidden = false;
        }
        if (panelSoundcloud) {
          panelSoundcloud.classList.remove("is-active");
          panelSoundcloud.hidden = true;
        }
        if (extLink) {
          extLink.href = spotifyProfile;
          extLink.innerHTML = `<span>Open in Spotify</span> <span aria-hidden="true">↗</span>`;
          extLink.setAttribute("aria-label", "Open LOGMAT on Spotify in a new tab");
        }
      } else if (target === "soundcloud") {
        if (tabSoundcloud) {
          tabSoundcloud.classList.add("is-active");
          tabSoundcloud.setAttribute("aria-selected", "true");
        }
        if (tabSpotify) {
          tabSpotify.classList.remove("is-active");
          tabSpotify.setAttribute("aria-selected", "false");
        }
        if (panelSoundcloud) {
          panelSoundcloud.classList.add("is-active");
          panelSoundcloud.hidden = false;
        }
        if (panelSpotify) {
          panelSpotify.classList.remove("is-active");
          panelSpotify.hidden = true;
        }
        if (extLink) {
          extLink.href = soundcloudProfile;
          extLink.innerHTML = `<span>Open on SoundCloud</span> <span aria-hidden="true">↗</span>`;
          extLink.setAttribute("aria-label", "Open Mat-R // LOGMAT on SoundCloud in a new tab");
        }
      }
    }

    if (tabSpotify) {
      tabSpotify.addEventListener("click", () => selectTab("spotify"));
    }
    if (tabSoundcloud) {
      tabSoundcloud.addEventListener("click", () => selectTab("soundcloud"));
    }
  }

  /* ------------------------------------------------------------------------
     6. About Section
     ------------------------------------------------------------------------ */

  function renderAbout() {
    const aboutData = content.about;
    if (!aboutData) return;

    const labelEl = document.getElementById("about-label");
    const headingEl = document.getElementById("about-heading");
    const leadEl = document.getElementById("about-lead");
    const paragraphsEl = document.getElementById("about-paragraphs");
    const factsEl = document.getElementById("about-facts");
    const skillsGrid = document.getElementById("about-skills-grid");

    if (labelEl && isNonEmptyString(aboutData.sectionLabel)) {
      labelEl.textContent = aboutData.sectionLabel;
    }
    if (headingEl && isNonEmptyString(aboutData.heading)) {
      headingEl.textContent = aboutData.heading;
    }
    if (leadEl && isNonEmptyString(aboutData.lead)) {
      leadEl.textContent = aboutData.lead;
    }

    if (paragraphsEl && Array.isArray(aboutData.paragraphs)) {
      const validParas = aboutData.paragraphs.filter(isNonEmptyString);
      if (validParas.length > 0) {
        paragraphsEl.replaceChildren();
        validParas.forEach((pText) => {
          paragraphsEl.appendChild(createEl("p", "", pText));
        });
      }
    }

    if (factsEl && Array.isArray(aboutData.facts)) {
      const validFacts = aboutData.facts.filter(
        (f) => isNonEmptyString(f?.label) && isNonEmptyString(f?.value)
      );
      if (validFacts.length > 0) {
        factsEl.replaceChildren();
        validFacts.forEach((fact) => {
          const row = createEl("div", "specs-row");
          row.append(
            createEl("dt", "", fact.label),
            createEl("dd", "", fact.value)
          );
          factsEl.appendChild(row);
        });
      }
    }

    if (skillsGrid && Array.isArray(aboutData.skills)) {
      skillsGrid.replaceChildren();
      aboutData.skills.forEach((group) => {
        if (!isNonEmptyString(group?.category) || !Array.isArray(group?.items)) return;
        const col = createEl("div", "skill-group");
        col.appendChild(createEl("h4", "skill-group-title", group.category));
        const tagRow = createEl("div", "tag-row");
        group.items.filter(isNonEmptyString).forEach((skill) => {
          tagRow.appendChild(createEl("span", "tech-tag", skill));
        });
        col.appendChild(tagRow);
        skillsGrid.appendChild(col);
      });
    }

    // Connect CV link in About specifications if available
    const aboutCvLink = document.querySelector(".about-cv-wrap a");
    if (aboutCvLink && isNonEmptyString(content.contact?.cvPath)) {
      aboutCvLink.href = content.contact.cvPath.trim();
      const labelSpan = aboutCvLink.querySelector("span");
      if (labelSpan && isNonEmptyString(content.contact?.cvLabel)) {
        labelSpan.textContent = content.contact.cvLabel.trim();
      }
    }
  }

  /* ------------------------------------------------------------------------
     7. Contact Section (Verified Channels + Download CV Button)
     ------------------------------------------------------------------------ */

  function renderContact() {
    const contactData = content.contact;
    if (!contactData) return;

    const labelEl = document.getElementById("contact-label");
    const headingEl = document.getElementById("contact-heading");
    const descEl = document.getElementById("contact-description");
    const container = document.getElementById("contact-content");

    if (labelEl && isNonEmptyString(contactData.sectionLabel)) {
      labelEl.textContent = contactData.sectionLabel;
    }
    if (headingEl && isNonEmptyString(contactData.heading)) {
      headingEl.textContent = contactData.heading;
    }
    if (descEl && isNonEmptyString(contactData.description)) {
      descEl.textContent = contactData.description;
    }
    if (!container) return;

    container.replaceChildren();
    const channels = [];

    // Verified Emails
    const rawEmails = Array.isArray(contactData.email)
      ? contactData.email
      : isNonEmptyString(contactData.email)
        ? contactData.email.split(/[\s,;]+/)
        : [];

    rawEmails.filter(isNonEmptyString).forEach((entry) => {
      const cleanEmail = entry.trim().replace(/^mailto:/i, "");
      if (!cleanEmail) return;
      channels.push({
        label: "Email",
        value: cleanEmail,
        href: `mailto:${cleanEmail}`,
        external: false
      });
    });

    // Verified External Profiles
    const validLinks = getValidLinks(contactData.links);
    validLinks.forEach((item) => {
      channels.push({
        label: item.label,
        value: item.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
        href: item.url,
        external: true
      });
    });

    // CV Download Card
    if (isValidRelativeAsset(contactData.cvPath)) {
      channels.push({
        label: "Curriculum Vitae",
        value: isNonEmptyString(contactData.cvLabel)
          ? contactData.cvLabel
          : "Download CV (PDF)",
        href: contactData.cvPath.trim(),
        external: true,
        isCv: true
      });
    }

    if (channels.length > 0) {
      const grid = createEl("div", "contact-grid");
      channels.forEach((ch) => {
        const a = createEl("a", "contact-card");
        a.href = ch.href;
        if (ch.external) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
        if (ch.isCv) {
          a.setAttribute("download", "");
          a.setAttribute("aria-label", "Download Matías Agustín Delega CV in PDF format");
        }
        a.append(
          createEl("span", "contact-card-label", ch.label),
          createEl("span", "contact-card-value", ch.value)
        );
        grid.appendChild(a);
      });
      container.appendChild(grid);
    }
  }

  /* ------------------------------------------------------------------------
     8. Navigation: Accessible Mobile Menu & Active Section Highlighting
     ------------------------------------------------------------------------ */

  function setupNavigation() {
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    const navMenu = document.getElementById("primary-nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMobileMenu() {
      if (!toggleBtn || !navMenu) return;
      toggleBtn.setAttribute("aria-expanded", "false");
      navMenu.classList.remove("is-open");
    }

    if (toggleBtn && navMenu) {
      toggleBtn.addEventListener("click", () => {
        const expanded = toggleBtn.getAttribute("aria-expanded") === "true";
        toggleBtn.setAttribute("aria-expanded", String(!expanded));
        navMenu.classList.toggle("is-open", !expanded);
      });

      navLinks.forEach((link) => {
        link.addEventListener("click", () => closeMobileMenu());
      });

      document.addEventListener("keydown", (event) => {
        if (
          event.key === "Escape" &&
          toggleBtn.getAttribute("aria-expanded") === "true"
        ) {
          closeMobileMenu();
          toggleBtn.focus();
        }
      });

      document.addEventListener("click", (event) => {
        if (
          toggleBtn.getAttribute("aria-expanded") === "true" &&
          !navMenu.contains(event.target) &&
          !toggleBtn.contains(event.target)
        ) {
          closeMobileMenu();
        }
      });
    }

    // Scrollspy via IntersectionObserver
    const sections = document.querySelectorAll("main > section[id]");
    if ("IntersectionObserver" in window && sections.length > 0) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach((link) => {
              const match = link.getAttribute("data-nav") === id;
              if (match) {
                link.setAttribute("aria-current", "true");
              } else {
                link.removeAttribute("aria-current");
              }
            });
          });
        },
        { rootMargin: "-35% 0px -55% 0px" }
      );

      sections.forEach((sec) => observer.observe(sec));
    }
  }

  /* ------------------------------------------------------------------------
     Initialize
     ------------------------------------------------------------------------ */

  renderHero();
  renderGames();
  renderMusic();
  renderAbout();
  renderContact();
  setupPlayerDialog();
  setupSheetDialog();
  setupNavigation();
})();
