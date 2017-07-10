import decode from 'jwt-decode'

export default {
  user (state) {
    try {
      return decode(state.token)
    } catch (e) {
      return {}
    }
  }
}
