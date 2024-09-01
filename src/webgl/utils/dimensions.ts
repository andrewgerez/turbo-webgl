const getWidth = () => {
  if (window || document) {
    return (
      window?.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    )
  }
}

const getHeight = () => {
  if (window || document) {
    return (
      window?.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    )
  }
}

const get = (property: string) => {
  if (property === 'window') {
    return {
      width: getWidth(),
      height: getHeight(),
    }
  }

  if (property === 'screen') {
    return {
      width: window ? window.screen.width : 0,
      height: window ? window.screen.height : 0,
    }
  }

  return null
}

const dimensionsListener = (handler: any) => {
  return (target: any) => {
    const dimensionsValue = {
      window: get('window'),
      screen: get('screen'),
    }

    handler(dimensionsValue, target)
  }
}

const Dimensions = {
  get,
  addEventListener: function addEventListener(listener: any) {
    if (window) {
      window.addEventListener('resize', dimensionsListener(listener), false)
    }
  },
  removeEventListener: function addEventListener(listener: any) {
    if (window) {
      window.removeEventListener('resize', dimensionsListener(listener), false)
    }
  },
}

export default Dimensions
