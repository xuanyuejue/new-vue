const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
export default {
  namespaced: true,
  state: {
    deploy_path: {
      development: {
        base: 'https://www.unclepang.com/api/Blue'
      },
      production: {
        base: 'https://www.unclepang.com/api/Blue'
      }
    }
  },
  getters: {
    httpUrl (state) {
      return state.deploy_path[env].base
    }
  }
}
