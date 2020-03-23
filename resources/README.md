These are Cordova resources. You can replace icon.png and splash.png and run
`ionic cordova resources` to generate custom icons and splash screens for your
app. See `ionic cordova resources --help` for details.

Cordova reference documentation:

- Icons: https://cordova.apache.org/docs/en/latest/config_ref/images.html
- Splash Screens: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/

Step by step to resolve problem of plugin "proposal-numeric separator"

1. Delete package-lock.json
2. Include "resolutions": { "@babel/preset-env": "^7.8.7" } to package.json
3. npm install npm-force-resolutions --save-dev
4. npm install
5. npx npm-force-resolutions
6. npm install again
7. ionic build