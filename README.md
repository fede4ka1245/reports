# reports

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Start/Build android application
Make sure that android studio is installed
#### 1. Build js project
```
npm run build
```
#### 2. Add android platform
```
npx cap add android
```
#### 3. Update native project
```
npx cap sync
```
#### 4. Set icon and splash screen
```
npx cordova-res android --skip-config --copy
```
#### 5. Open native project
```
npx cap open android
```
#### 6. Set read/create files permissions
set permissions in android/app/src/main/AndroidManifest.xml
in Android Studio it can be here: app/manifests/AndroidManifest.xml
```
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```
####
#### 7. Start and build
* To start android application create an android simulator, then tap "play" button toolbar
* To build tap build in toolbar and select necessary build type

See more information here: [https://developer.android.com/studio/run](https://developer.android.com/studio/run)
#### 


