Setup (on build machine):

1) Prerequisites:
   - Node.js (16+ or 18+)
   - npm
   - On Windows: install 'wine' if cross-building; signing requires certificate.
   - On macOS: use mac to build signed mac installer.

2) Install dependencies:
   cd electron
   npm install

3) Build (Windows):
   npm run dist:win
   Output in electron/dist/

   Build (mac):
   npm run dist:mac
   Output in electron/dist/

Notes:
- For auto-updater (electron-updater) to work, upload the built artifacts and the generated latest.yml to your release URL (see package.json build.publish).
- Code signing: to avoid warnings you should sign builds (Windows .pfx, mac Developer ID). Without signing users see warnings.
