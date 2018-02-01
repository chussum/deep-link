import chai from 'chai';
import jsdom from 'jsdom-global';
import DeepLink from '../dist/deep-link.min';

chai.expect();

const expect = chai.expect;
let deepLink;

describe('Given an instance of DeepLink library', () => {
  let cleanup;
  before(() => {
    cleanup = jsdom('<!doctype html><html><body><a id="test" href="#">TEST LINK</a></body></html>', {
      url: "https://example.org/",
      referrer: "https://example.com/",
      contentType: "text/html",
      userAgent: "node.js",
      includeNodeLocations: true
    });
    deepLink = new DeepLink({
      appStore: 'https://itunes.apple.com/kr/app/id123456789',
      playStore: 'https://play.google.com/store/apps/details?id=com.example.myApp',
    });
  });
  describe('when I need the register function', () => {
    it('should return the function', () => {
      expect(deepLink.register).to.be.a('function');
      deepLink.register(document.getElementById('test'), {
        appScheme: 'myApp://example/51', // Required
        webUrl: 'http://www.naver.com', // Optional
      });
    });
  });
  describe('when I need the openApp function', () => {
    it('should return the function', () => {
      expect(deepLink.openApp).to.be.a('function');
      deepLink.openApp({
        appScheme: 'myApp://example/51',
        webUrl: 'http://www.naver.com',
      });
    });
  });
  after(() => {
    // May be good practice in case something we end up using something like setInterval that tries to keep jsdom alive.
    window.close();
    cleanup(); // Removes all the keys (eg. 'document', 'window') set by jsdom-global.
  });
});
