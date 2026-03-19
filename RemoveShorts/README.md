# Remove Shorts — Safari Extension

A lightweight Safari extension that removes YouTube Shorts from your browsing experience.

## What It Does

- **Hides Shorts shelves** on the YouTube homepage and subscriptions feed
- **Removes the Shorts link** from the sidebar navigation
- **Hides Shorts tabs** on channel pages
- **Filters Shorts from search results**
- **Redirects /shorts/ URLs** to the regular video player
- **Toggle on/off** via the extension popup — no need to uninstall

---

## Installation (macOS)

Safari requires extensions to be bundled in an Xcode project. Here's how:

### Option A: Convert with Xcode (Recommended)

1. **Open Terminal** and run:
   ```bash
   xcrun safari-web-extension-converter /path/to/RemoveShorts
   ```
   Replace `/path/to/RemoveShorts` with the actual path to this folder.

2. Xcode will open with a generated project. Click **Run** (▶) to build.

3. Open **Safari → Settings → Extensions** and enable **Remove Shorts**.

4. Visit YouTube and confirm that Shorts are gone!

### Option B: Load as Unsigned (Development)

1. In Safari, enable the **Develop** menu:
   **Safari → Settings → Advanced → Show features for web developers**

2. Enable **Develop → Allow Unsigned Extensions** (you'll need to re-enable this each launch).

3. Run the `xcrun safari-web-extension-converter` command from Option A, build in Xcode, and the unsigned extension will appear in Safari's extension settings.

---

## Requirements

- **macOS 12+** (Monterey or later)
- **Safari 15.4+**
- **Xcode 14+** (free from the Mac App Store)

---

## Files

| File            | Purpose                                           |
|-----------------|---------------------------------------------------|
| `manifest.json` | Extension metadata & permissions (Manifest V3)    |
| `content.css`   | CSS rules that hide Shorts elements               |
| `content.js`    | JS to redirect /shorts/ URLs & remove DOM nodes   |
| `popup.html`    | Toggle UI when you click the extension icon        |
| `images/`       | Extension icons (48, 96, 128 px)                  |

---

## Toggling

Click the extension icon in Safari's toolbar to toggle Shorts blocking on or off. Your preference is saved automatically.
