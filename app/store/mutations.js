import Vue from 'vue'
import * as types from './mutation-types'

export default {
  [types.SET_TOKEN] (state, { token }) {
    Vue.set(state, 'token', token)
  }
}
