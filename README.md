# deep-link.js

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

🌈 Redirecting native iOS/Android App from your Website using app scheme.

## Usage
### 1. Include deep-link.js on your site.

#### Using CDN
```
<script src="https://cdn.jsdelivr.net/npm/@iamdew/deep-link@1.0.1/dist/deep-link.min.js"></script>
```

#### Using Bower
> bower install --save deep-link
```
<script src="./bower_components/deep-link/dist/deep-link.min.js"></script>
```

#### Using NPM
> npm install --save @iamdew/deep-link
```
import DeepLink from '@iamdew/deep-link';
```

### 2. Initialize deep-link.js related by your app infomation.
```javascript
var deepLink = new DeepLink({
  appStore: 'https://itunes.apple.com/kr/app/id123456789',
  playStore: 'https://play.google.com/store/apps/details?id=com.example.myApp',
});
```

#### 2-1. Register click event
```javascript
deepLink.register(document.getElementById('test'), {
  appScheme: 'myApp://example/51', // Required (Optional that if openOnlyStore is true)
  webUrl: 'http://www.naver.com', // Optional
  openOnlyStore: true, // Optional (Default: false)
  alsoUseWebUrlOnMobile: false, // Optional (Default: true)
  openStoreWhenNoInstalledTheApp: false, // Optional (Default: true)
});
```

#### 2-2. Manual Open the Application
```javascript
deepLink.openApp({
  appScheme: 'myApp://example/51', // Required
  webUrl: 'http://www.naver.com', // Optional
  alsoUseWebUrlOnMobile: false, // Optional (Default: true)
  openStoreWhenNoInstalledTheApp: false, // Optional (Default: true)
});
```

#### 2-3. Just Open the Store
```javascript
deepLink.openStore();
```

## Issues
Feel free to submit issues and enhancement requests.

## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/flosdor/deep-link

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that we can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

## License

[MIT LICENSE](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@iamdew/deep-link.svg
[npm-url]: https://npmjs.org/package/@iamdew/deep-link
[travis-image]: https://img.shields.io/travis/flosdor/deep-link/master.svg
[travis-url]: https://travis-ci.org/flosdor/deep-link
[coveralls-image]: https://coveralls.io/repos/github/flosdor/deep-link/badge.svg
[coveralls-url]: https://coveralls.io/github/flosdor/deep-link
[downloads-image]: https://img.shields.io/npm/dm/@iamdew/deep-link.svg
[downloads-url]: https://npmjs.org/package/@iamdew/deep-link
