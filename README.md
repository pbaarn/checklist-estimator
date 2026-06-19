# Trello Power-Up Starter Boilerplate

A modern, fast, and feature-complete Trello Power-Up starter kit built with vanilla HTML/CSS/JS and powered by **Vite** for a seamless local development experience.

This Power-Up registers custom notes on Trello cards, displays status badges on both the card front and card details view (card back), and provides a custom board settings page.

## File Structure

- `index.html`: The background connector iframe that Trello loads silently. It initializes the Power-Up.
- `client.js`: Registers Power-Up capabilities (`card-buttons`, `card-badges`, `card-detail-badges`, `show-settings`).
- `popup.html`: The UI popup loaded when a user clicks the "Custom Notes" button.
- `settings.html`: The settings panel opened when configured through board settings.
- `styles.css`: Rich styling system featuring premium dark/light HSL palettes, glassmorphism, custom typography, inputs, and interactive hover transitions.
- `icon.svg`: Neon-teal custom lightning bolt icon.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- A Trello Account
- [ngrok](https://ngrok.com/) or another HTTPS tunneling tool (Trello requires HTTPS for all iframe source URLs)

## Getting Started

### 1. Install & Run Locally

Install the dev dependencies and start Vite:

```bash
npm install
npm run dev
```

By default, Vite will start hosting the files locally (typically at `http://localhost:5173`).

### 2. Set Up HTTPS Tunnel

Since Trello runs over HTTPS, it cannot load resources over raw HTTP. You must set up a secure HTTPS tunnel to proxy your local server.

Run `ngrok` pointing to your Vite port (e.g. `5173`):

```bash
ngrok http 5173
```

Copy the secure forwarding URL (e.g., `https://xxxx-xxxx.ngrok-free.app`).

### 3. Register your Power-Up in Trello

1. Go to the [Trello Power-Up Admin Portal](https://trello.com/power-ups/admin).
2. Select your Workspace and click **New Power-Up**.
3. Fill in the details:
   - **Name**: My Custom Power-Up
   - **Iframe Connector URL**: Use your ngrok URL pointing to `index.html` (e.g. `https://xxxx-xxxx.ngrok-free.app/index.html`).
4. In the **Capabilities** section:
   - Enable **Card Back Section** or **Card Buttons**
   - Enable **Card Badges**
   - Enable **Show Settings**
5. Save the configuration.

### 4. Enable on your Board

1. Open a board in your Workspace.
2. Click **Power-Ups** -> **Add Power-Ups**.
3. Under **Custom**, find your new Power-Up and click **Add**.
4. Open any card to see your new "Custom Notes" button!

## API References & Customization

The Power-Up utilizes the standard Trello Power-Up Client library:
- Learn more about the Capabilities API at: [Trello Power-Up Capabilities Reference](https://developer.atlassian.com/cloud/trello/power-ups/capabilities/)
- Learn about Client Data Storage at: [Trello Power-Up Data Storage Reference](https://developer.atlassian.com/cloud/trello/power-ups/client-library/data-storage/)
