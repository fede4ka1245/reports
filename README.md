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

## CORS central bank issues
### production
to avoid issues in production, app uses nginx proxy (see /nginx.conf)
```
  location /api/server-cbr {
      proxy_pass https://www.cbr.ru/scripts/XML_daily.asp;
  }
```
### development
there is no proxy in development, but you can use any browser extension
(like [this](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc?hl=en))
which disables CORS blocking in your browser. In production requests are made
directly to https://www.cbr.ru/scripts/XML_daily.asp


