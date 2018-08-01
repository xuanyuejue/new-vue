let cache = {
  fetch: (item, prefix) => {
    let result
    try {
      result = window.localStorage.getItem((prefix ? prefix + '_' : '') + item)
      result = result ? JSON.parse(result) : null
    } catch (err) {
      result = null
    }
    return result
  },
  store: (item, prefix, data) => {
    window.localStorage.setItem((prefix ? prefix + '_' : '') + item, JSON.stringify(data))
  }
}

export default cache
