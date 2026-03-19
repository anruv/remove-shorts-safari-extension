# 🚫 Remove YouTube Shorts for Safari

A lightweight Safari Web Extension that removes YouTube Shorts from your browsing experience on macOS.

> Take back your YouTube feed. No more endless short-form scroll traps.

---

## ✨ Features

- **Hides Shorts shelves** on the YouTube homepage and subscriptions feed
- **Removes the Shorts link** from the sidebar navigation
- **Hides Shorts tabs** on channel pages
- **Filters Shorts from search results** and notifications
- **Redirects `/shorts/` URLs** to the regular video player automatically
- **One-click toggle** — enable or disable blocking from the toolbar popup
- **Persistent preference** — your setting is saved across sessions
- **Zero data collection** — no analytics, no tracking, no network requests

---

## 📸 Screenshots

| Homepage (Before) | Homepage (After) |
|---|---|
| Shorts shelf visible | Clean feed, no Shorts |

| Popup Toggle |
|---|
| Simple on/off switch in the Safari toolbar |

> *Replace these placeholders with actual screenshots of the extension in action.*

---

## 🖥️ Requirements

| Requirement | Minimum Version |
|---|---|
| macOS | 12 Monterey or later |
| Safari | 15.4+ |
| Xcode | 14+ (free from Mac App Store) |

---

## 🚀 Installation

### Step 1 — Clone the Repository

```bash
git clone https://github.com/yourusername/remove-shorts-safari.git
cd remove-shorts-safari
```

### Step 2 — Install Xcode

If you don't have Xcode installed, download it for free from the [Mac App Store](https://apps.apple.com/us/app/xcode/id497799835). Open it once after installing to accept the license and install additional components.

### Step 3 — Set Xcode Command Line Tools

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

### Step 4 — Convert to Safari Extension

```bash
xcrun safari-web-extension-converter /path/to/remove-shorts-safari/RemoveShorts --macos-only
```

Replace `/path/to/remove-shorts-safari` with the actual path where you cloned the repo.

This will generate an Xcode project and open it automatically.

### Step 5 — Build in Xcode

1. In Xcode, make sure the **target** is set to **macOS** (not iOS)
2. Set the **destination** to **My Mac**
3. Click **Run** (▶) or press `⌘R`
4. Wait for "Build Succeeded"

### Step 6 — Enable in Safari

1. Open **Safari → Settings** (`⌘ ,`)
2. Go to the **Advanced** tab
3. Check **"Show features for web developers"**
4. In the menu bar, click **Develop → Allow Unsigned Extensions**
5. Enter your Mac password
6. Go to **Safari → Settings → Extensions**
7. Check the box next to **Remove Shorts** to enable it
8. Visit [youtube.com](https://youtube.com) — Shorts are gone!

> ⚠️ **Note:** The "Allow Unsigned Extensions" setting resets every time you quit Safari. You'll need to re-enable it each launch unless you sign the extension with an [Apple Developer account](https://developer.apple.com/programs/) ($99/year).

---

## 🔧 How It Works

The extension uses a combination of CSS and JavaScript to remove Shorts from YouTube:

| Layer | File | What It Does |
|---|---|---|
| **CSS Hiding** | `content.css` | Targets YouTube's Shorts-specific DOM elements and hides them with `display: none !important` |
| **JS Removal** | `content.js` | Observes DOM mutations (YouTube is a Single Page App) and removes Shorts elements dynamically as they load |
| **URL Redirect** | `content.js` | Intercepts `/shorts/` URLs and redirects them to the standard `/watch?v=` player |
| **Toggle** | `popup.html` | Provides a toolbar popup with a toggle switch, saving preference via `browser.storage` |

### Targeted YouTube Elements

- `ytd-rich-shelf-renderer[is-shorts]` — Homepage Shorts shelf
- `ytd-reel-shelf-renderer` — Reel/Shorts carousel
- `ytd-guide-entry-renderer a[title="Shorts"]` — Sidebar Shorts link
- `yt-tab-shape[tab-title="Shorts"]` — Channel page Shorts tab
- `ytd-video-renderer:has(a[href*="/shorts/"])` — Search result Shorts
- `ytd-notification-renderer:has(a[href*="/shorts/"])` — Notification Shorts
- And more — see `content.css` for the full list

---

## 📁 Project Structure

```
RemoveShorts/
├── manifest.json       # Extension manifest (Manifest V3)
├── content.css         # CSS rules to hide Shorts elements
├── content.js          # JS for dynamic removal & URL redirect
├── popup.html          # Toolbar popup with toggle switch
├── images/
│   ├── icon-48.png     # Extension icon (48×48)
│   ├── icon-96.png     # Extension icon (96×96)
│   └── icon-128.png    # Extension icon (128×128)
├── README.md
├── LICENSE
└── .gitignore
```

---

## 🤝 Contributing

Contributions are welcome! If YouTube updates their DOM structure and Shorts start leaking through, please open an issue or submit a PR.

1. Fork the repository
2. Create your feature branch: `git checkout -b fix/new-shorts-selector`
3. Commit your changes: `git commit -m "Add selector for new Shorts element"`
4. Push to the branch: `git push origin fix/new-shorts-selector`
5. Open a Pull Request

### Reporting Broken Selectors

YouTube frequently updates their frontend. If you notice Shorts appearing again:

1. Right-click the Shorts element in Safari → **Inspect Element**
2. Find the tag name and attributes of the container
3. Open an issue with the tag info, or submit a PR adding the new selector to `content.css`

---

## 📝 Changelog

### v1.0.0
- Initial release
- Hides Shorts from homepage, search, subscriptions, sidebar, channel tabs, and notifications
- Redirects `/shorts/` URLs to regular player
- Toggle on/off via toolbar popup

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## ⭐ Support

If this extension helped you reclaim your YouTube feed, consider giving the repo a star!

---

<p align="center">
  <b>Made with focus, for focus.</b>
</p>
