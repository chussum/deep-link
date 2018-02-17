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

// Find Frame Function
const loadFrame = (id, appScheme) => {
  let iFrame = document.getElementById(id)
  if (iFrame) {
    document.body.removeChild(iFrame)
  }
  if (appScheme) {
    iFrame = document.createElement('iframe')
    iFrame.id = 'for-android-deeplink'
    iFrame.style.width = 0
    iFrame.style.height = 0
    iFrame.style.visibility = 'hidden'
    iFrame.onLoad = () => {
      iFrame.src = appScheme
    }
    document.body.appendChild(iFrame)
  }
}

// Redirect Function
const redirectTo = (url) => {
  url && (document.location.href = url)
}

// Validation
const validate = (options) => {
  if (typeof options.appScheme === 'undefined') {
    throw Error('appScheme is a required param value.')
  }
}

export default class DeepLink {
  configs = {}

  // constructor
  constructor (configs) {
    this.configs = configs
  }

  // binding function.
  register = (el, options) => {
    validate(options)
    addEvent(el, 'click', (e) => {
      e && e.preventDefault()
      if (options.openOnlyStore === true) {
        this.openStore()
      } else {
        this.openApp(options)
      }
    })
  }

  // open the app.
  openApp = (params) => {
    validate(params)

    const options = {
      openStoreWhenNoInstalledTheApp: true,
      alsoUseWebUrlOnMobile: true,
      ...params
    }

    const ua = navigator.userAgent.toLowerCase()
    const isIPhone = /iphone|ipad|ipod/.test(ua)
    const isAndroid = !!~ua.indexOf('android')
    const isMobile = isIPhone || isAndroid

    // on Desktop
    if (isMobile === false) {
      redirectTo(options.webUrl)
      return
    }

    // on Mobile
    if (options.openStoreWhenNoInstalledTheApp === true) {
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
      timer = setTimeout(() => this.openStore(), 1000)
    }

    if (isAndroid === true) {
      loadFrame('for-android-deeplink', options.appScheme)
    } else {
      redirectTo(options.appScheme)
    }

    if (options.alsoUseWebUrlOnMobile === false) {
      return
    }

    if (options.openStoreWhenNoInstalledTheApp === true) {
      setTimeout(() => redirectTo(options.webUrl), 2200)
    } else {
      redirectTo(options.webUrl)
    }
  }

  // open the store.
  openStore = () => {
    const ua = navigator.userAgent.toLowerCase()
    const isIPhone = /iphone|ipad|ipod/.test(ua)
    const appStoreLink = isIPhone ? this.configs.appStore : this.configs.playStore
    redirectTo(appStoreLink)
  }
}
