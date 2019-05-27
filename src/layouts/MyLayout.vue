<template>
  <q-layout view="hHh LpR fff">
    <q-header class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" icon="menu">
          <div class="menu-btn-label">Code Teacher&#8482;</div>
        </q-btn>
        <q-toolbar-title class="text-center">
          NSLC Biotechnology 2019
        </q-toolbar-title>

        <q-btn flat @click="startOver()" label="Start Over"></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :width="300"
      :breakpoint="700"
      elevated
      show-if-above
    >
      <div class="q-pa-sm">
        <q-expansion-item
          v-for="(chapter, chpIndex) in getChapters"
          :key="chpIndex"
          group="chapters"
          :label="chapter.title"
          expand-separator
          :ref="`${chapterRefBase}${chpIndex}`"
          :default-opened="chpIndex === Number(currentChapterIndex)"
        >
          <q-btn
            v-for="(page, pgIndex) in chapter.pages"
            :key="pgIndex"
            :color="getColor(chpIndex, pgIndex)"
            :outline="matchingPage(chpIndex, pgIndex)"
            :flat="!matchingPage(chpIndex, pgIndex)"
            class="full-width btn-left-pad"
            align="left"
            :disable="shouldDisable(chpIndex, pgIndex)"
            :label="page.title"
            :to="`/step/${chpIndex}/${pgIndex}`"
            no-caps
          />
        </q-expansion-item>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      drawer: false,
      chapterRefBase: 'chapterButton-'
    }
  },
  computed: {
    ...mapGetters('chapters', [
      'getChapters',
      'currentChapterIndex',
      'currentPageIndex',
      'furthestChapterIndex',
      'furthestPageIndex'
    ])
  },
  methods: {
    ...mapActions('chapters', [
      'resetSteps',
      'resetQuizzes'
    ]),
    startOver: async function () {
      await this.resetSteps()
      await this.resetQuizzes()
      this.$router.push('/step/0/0')
    },
    shouldDisable (chpIndex, pgIndex) {
      return chpIndex > this.furthestChapterIndex ||
            (chpIndex === this.furthestChapterIndex && pgIndex > this.furthestPageIndex)
    },
    matchingPage (chpIndex, pgIndex) {
      let currentChapterIndex = Number(this.currentChapterIndex)
      let currentPageIndex = Number(this.currentPageIndex)
      return chpIndex === currentChapterIndex && pgIndex === currentPageIndex
    },
    getColor (chpIndex, pgIndex) {
      if (this.shouldDisable(chpIndex, pgIndex)) {
        return 'grey'
      } else {
        if (this.matchingPage(chpIndex, pgIndex)) {
          return 'accent'
        } else {
          return 'primary'
        }
      }
    }
  },
  watch: {
    currentChapterIndex: function (newIndex, oldIndex) {
      this.$refs[`${this.chapterRefBase}${oldIndex}`][0].hide()
      this.$refs[`${this.chapterRefBase}${newIndex}`][0].show()
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-left-pad {
  padding-left: 40px;
}

.menu-btn-label {
  margin-top: 3px;
  margin-left: 10px;
}
</style>
