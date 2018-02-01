// Event Register Function
const addEvent = (element, eventName, fn) => {
  if (element.addEventListener) {
    element.addEventListener(eventName, fn, false)
  } else if (element.attachEvent) {
    element.attachEvent('on' + eventName, fn)
  } else {
    element['on' + eventName] = fn
  }
}

export default class DeepLink {
  // constructor
  constructor (options) {
    this.options = options

    // binding function.
    this.register = (el, options) => {
      if (typeof options.appScheme === 'undefined') {
        throw Error('appScheme is a required param value.')
      }
      addEvent(el, 'click', (e) => {
        e && e.preventDefault()
        this.openApp(options)
      })
    }

    // open the app.
    this.openApp = (options) => {
      if (typeof options.appScheme === 'undefined') {
        throw Error('appScheme is a required param value.')
      }

      const ua = navigator.userAgent.toLowerCase()
      const isIPhone = /iphone|ipad|ipod/.test(ua)
      const isAndroid = ~ua.indexOf('android')
      if (isIPhone || isAndroid) {
        let interval
        let timer
        const clearTimers = () => {
          clearInterval(interval)
          clearTimeout(timer)
        }
        const checkAppInterval = () => {
          if (document.webkitHidden || document.hidden) {
            clearTimers()
          }
        }
        interval = setInterval(checkAppInterval, 200)
        timer = setTimeout(() => this.openStore, 1000)
        options.appScheme && (document.location.href = options.appScheme)
      } else {
        options.webUrl && (document.location.href = options.webUrl)
      }
    }

    // open the store.
    this.openStore = () => {
      const appStoreLink = isIPhone ? this.options.appStore : this.options.playStore
      appStoreLink && (document.location.href = appStoreLink)
    }
  }
}
