# Trello Power-Up Hosting & Installation Guide

Trello Power-Ups are static frontend applications, meaning they can be hosted for free on platforms like **GitHub Pages** or **Netlify**.

---

## Option A: Host on GitHub Pages (Free & Automatic)

This is the best method if you want to keep your project in a GitHub repository and deploy updates automatically.

### 1. Push Your Code to GitHub
1. Create a new repository on GitHub (e.g. `trello-checklist-estimator`).
2. Initialize git in your local project folder and push it:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### 2. Configure GitHub Pages Deployment
The easiest way is to use a GitHub Actions workflow to build and deploy your Vite site:
1. Create a folder structure: `.github/workflows/`
2. Create a file inside named `deploy.yml` with the following content:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm ci
         - run: npm run build
         - uses: actions/configure-pages@v4
         - uses: actions/upload-pages-artifact@v3
           with:
             path: ./dist
         - id: deployment
           uses: actions/deploy-pages@v4
   ```
3. Push this file to GitHub. Go to your repository's **Settings** -> **Pages** and ensure the source is set to **GitHub Actions**.
4. Once the action finishes, your Power-Up will be live at `https://<your-username>.github.io/<your-repo-name>/index.html`.

---

## Option B: Host on Netlify (Easiest - No Commands Needed)

This is the fastest method if you just want to drag and drop your built files to get a live URL.

1. Run the build command locally:
   ```bash
   npm run build
   ```
   *This generates a `dist/` folder containing the compiled code.*
2. Go to [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop your **`dist`** folder onto the page.
4. Netlify will deploy it instantly and provide a secure HTTPS URL (e.g., `https://random-site-name.netlify.app/index.html`).

---

## Register the Power-Up in Trello
Once you have your live URL (from GitHub Pages or Netlify):
1. Go to the [Trello Power-Up Admin Portal](https://trello.com/power-ups/admin).
2. Select your Workspace and click **New Power-Up**.
3. Set the **Iframe Connector URL** to your hosted URL (e.g., `https://your-username.github.io/your-repo-name/index.html` or `https://site-name.netlify.app/index.html`).
4. In **Capabilities**, turn **ON**:
   - **Card Back Section**
   - **Card Badges**
   - **Card Detail Badges**
   - **Show Settings**
5. Save, go to your Trello board, and add your custom Power-Up under **Power-Ups -> Custom**.
