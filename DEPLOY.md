# How to create a Build

## Android

```
npm install npm-force-resolutions --save-dev
npm install
npx npm-force-resolutions
npm install
ionic build
```

```
ionic cordova build --release android
```

### Generate key if not present

```
keytool -genkey -v -keystore my-release-key.keystore -alias corona_mission -keyalg RSA -keysize 2048 -validity 10000
```

### Sign and zip apk

```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk corona_mission
~/Library/Android/sdk/build-tools/29.0.3/zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk platforms/android/app/build/outputs/apk/release/corona-mission_1.0_testing.apk
```
