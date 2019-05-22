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
    let chapterState = store.state.chapters

    if (!chapterState.furthestStep || !chapterState.currentStep) {
      await store.dispatch('chapters/loadStepState')
    }

    if (to.matched.some(record => record.meta.requiresStepCheck)) {
      let chapterIndex = chapterState.currentStep[0]
      let pageIndex = chapterState.currentStep[1]
      let routeChapterIndex = to.params.chapterIndex
      let routePageIndex = to.params.pageIndex

      let toStep = [routeChapterIndex, routePageIndex]

      console.log(`toStep: [${toStep}]`)

      let valid = await store.dispatch('chapters/isValidStep', toStep)

      if (valid) {
        store.commit('chapters/updateCurrentStep', toStep)
        return next()
      } else {
        console.log('invalid!')
        return next(`/step/${chapterIndex}/${pageIndex}/`)
      }
    }

    return next()
  })

  return Router
}
