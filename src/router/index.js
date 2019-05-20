import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresStepCheck)) {
      var chapterIndex = store.state.chapters.currentStep[0]
      var pageIndex = store.state.chapters.currentStep[1]
      var routeChapterIndex = to.params.chapterIndex
      var routePageIndex = to.params.pageIndex

      var toStep = [routeChapterIndex, routePageIndex]
      var valid = await store.dispatch('chapters/isValidStep', toStep)

      if (valid) {
        store.commit('chapters/setStep', toStep)
        next()
      } else {
        next(`/step/${chapterIndex}/${pageIndex}/`)
      }
    } else {
      next()
    }
  })

  return Router
}
