---
name: create-trello-powerup
description: "Guides the development, configuration, and local hosting of custom Trello Power-Ups using modern frontend technologies."
homepage: https://developer.atlassian.com/cloud/trello/power-ups/
metadata:
  {
    "openclaw": {
      "emoji": "🔌",
      "requires": {
        "bins": ["npm", "npx"]
      }
    }
  }
---

# Creating Trello Power-Ups Skill

Trello Power-Ups are custom web applications that load inside IFrames within Trello to extend its functionality.

## Core Architecture

1. **Connector (index.html + client.js)**:
   - Always loaded in a hidden iframe by Trello.
   - Initialized via `window.TrelloPowerUp.initialize({...})`.
   - Handles events and maps capabilities (buttons, badges, detail sections) to actions or specific UI urls.

2. **UI Pages (Popups, Modals, Card Sections)**:
   - Regular HTML pages loaded in visible Trello iframes.
   - Initialized via `var t = window.TrelloPowerUp.iframe();`.
   - Use the `t` handler to communicate back to Trello, close popups, open modals, or store data.

## Initializing a Connector

```javascript
window.TrelloPowerUp.initialize({
  'card-buttons': function(t, options) {
    return [{
      icon: 'https://example.com/icon.svg',
      text: 'My Power-Up Action',
      callback: function(t) {
        return t.popup({
          title: 'My Custom Action',
          url: './popup.html'
        });
      }
    }];
  },
  'card-badges': function(t, options) {
    return t.get('card', 'shared', 'my-data-key')
      .then(function(val) {
        return [{
          text: val ? 'Data: ' + val : 'No Data'
        }];
      });
  }
});
```

## Initializing inside a UI Page (e.g. popup.html)

```html
<script src="https://p.trellocdn.com/power-up.min.js"></script>
<script>
  var t = window.TrelloPowerUp.iframe();
  
  // Example: Resize the iframe to fit content automatically
  t.render(function() {
    t.sizeTo('#content').done();
  });
  
  // Example: Save data and close popup
  function saveData(val) {
    t.set('card', 'shared', 'my-data-key', val)
      .then(function() {
        t.closePopup();
      });
  }
</script>
```

## Storing Data

Trello allows saving data using scoping rules:
- **Scope**: `'board'`, `'organization'`, `'card'`, or `'member'`.
- **Visibility**: `'shared'` (visible to anyone using the board) or `'private'` (only visible to the current user).

```javascript
// Set value
t.set(scope, visibility, key, value);

// Get value
t.get(scope, visibility, key, defaultValue);
```

## Dev Setup Checkpoints
1. Use HTTPS local server (e.g. `npx vite --host` combined with `ngrok http 5173`).
2. Configure Power-Up settings in the [Trello Admin Portal](https://trello.com/power-ups/admin).
3. Set your Power-Up's iframe connector URL to the HTTPS URL (e.g., `https://xxxx.ngrok-free.app/index.html`).
4. Enable the Power-Up on your test Trello board.
